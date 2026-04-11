import { supabase } from "../supabaseClient";
import { useState } from "react";

export default function EndSession() {
  const [loading, setLoading] = useState(false);

  const handleEndSession = async () => {
    try {
      setLoading(true);

      // Get Supabase token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      // Call your backend
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/saas/sessions/end`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        alert("Could not end session.");
        return;
      }

      // Stop the local STT worker
      await fetch("http://127.0.0.1:8765/stop-worker", {
        method: "POST",
      });

      alert("Session ended and STT worker stopped.");
    } catch (err) {
      console.error(err);
      alert("Could not end session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">End Session</h1>
      <p className="text-gray-600">
        This will end the current live session and disconnect operators.
      </p>

      <button
        onClick={handleEndSession}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-3 rounded-lg mt-4 disabled:opacity-50"
      >
        {loading ? "Ending..." : "End Session"}
      </button>
    </div>
  );
}
