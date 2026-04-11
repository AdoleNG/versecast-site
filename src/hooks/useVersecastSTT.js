import { useEffect, useRef, useState } from "react";

export function useVersecastSTT({ token, sessionId }) {
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const workletNodeRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [partial, setPartial] = useState("");
  const [finalText, setFinalText] = useState("");

  useEffect(() => {
    return () => stop();
  }, []);

  async function start() {
    if (!token || !sessionId) {
      console.error("Missing token or sessionId");
      return;
    }

    // 1. Open WebSocket
    const wsUrl = `wss://api.versecast.ca/stt/stream?token=${token}&session_id=${sessionId}`;
    const ws = new WebSocket(wsUrl);
    ws.binaryType = "arraybuffer";

    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ type: "start" }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "partial") {
          setPartial(data.text);
        } else if (data.type === "final") {
          setFinalText(data.text);
          setPartial("");
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    // 2. Setup AudioContext + Worklet
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    const audioContext = new AudioContext({ sampleRate: 48000 });
    audioContextRef.current = audioContext;

    await audioContext.audioWorklet.addModule("/audio-worklet-processor.js");

    const source = audioContext.createMediaStreamSource(stream);
    const workletNode = new AudioWorkletNode(audioContext, "versecast-processor");

    workletNode.port.onmessage = (event) => {
      const pcmBuffer = event.data;
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(pcmBuffer);
      }
    };

    workletNodeRef.current = workletNode;

    source.connect(workletNode);
    workletNode.connect(audioContext.destination);
  }

  function stop() {
    try {
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ type: "stop" }));
        wsRef.current.close();
      }
    } catch {}

    try {
      if (workletNodeRef.current) {
        workletNodeRef.current.disconnect();
      }
    } catch {}

    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } catch {}

    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    } catch {}

    setConnected(false);
  }

  return {
    start,
    stop,
    connected,
    partial,
    finalText,
  };
}
