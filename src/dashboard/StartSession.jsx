import { supabase } from "../supabaseClient";

export default function StartSession() {
  const base = import.meta.env.VITE_KJV_URL;

  const handleStart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // 1. Get Supabase token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        alert("No Supabase token found.");
        return;
      }

      // 2. Create session in backend
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/sessions/start`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        alert("Failed to start session: " + body);
        return;
      }

      const json = await res.json();
      const sessionId = json.id;

      // ⭐ 3. REMOVE LOCAL WORKER — no more http://127.0.0.1:8765/start-worker
      // Cloud STT runs directly inside the Control Panel now.

      // ⭐ 4. Open Control Panel + Presenter using real session ID
      // Pass token to Control Panel so STT can authenticate
      window.open(
        `${base}/control/${sessionId}?token=${token}`,
        "_blank",
        "noopener,noreferrer"
      );

      window.open(
        `${base}/presenter/${sessionId}`,
        "_blank",
        "noopener,noreferrer"
      );

      alert("Session started.");
    } catch (err) {
      console.error(err);
      alert("Could not start session.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Start Session
      </h1>

      <p className="text-gray-600 text-lg leading-relaxed">
        Starting a session will open the Control Panel.  
        Use the <strong>Open Presenter</strong> button inside the Control Panel to launch the Presenter.
      </p>

      <button
        type="button"
        onClick={handleStart}
        className="
          bg-[#0078ff] 
          hover:bg-[#005fcc] 
          transition 
          text-white 
          px-8 
          py-4 
          rounded-lg 
          text-lg 
          font-semibold 
          shadow-md
        "
      >
        Start Session
      </button>
    </div>
  );
}
