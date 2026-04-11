import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      try {
        // ===============================
        // DEBUG LOGS (VERY IMPORTANT)
        // ===============================
        console.log("FULL URL:", window.location.href);
        console.log("SEARCH:", window.location.search);
        console.log("HASH:", window.location.hash);

        // ===============================
        // PARSE HASH (MAGIC LINK)
        // ===============================
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        console.log("access_token exists:", !!access_token);
        console.log("refresh_token exists:", !!refresh_token);

        // ===============================
        // HANDLE AUTH FLOW
        // ===============================
        if (access_token && refresh_token) {
          // ✅ MAGIC LINK FLOW
          console.log("Detected Magic Link flow");

          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("Magic link session error:", error);
            navigate("/login");
            return;
          }

          console.log("Magic link session stored successfully");
        } else {
          // ✅ OAUTH FALLBACK
          console.log("No tokens in hash → attempting OAuth exchange");

          const { data, error } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );

          if (error) {
            console.error("OAuth callback error:", error);
            navigate("/login");
            return;
          }

          console.log("OAuth session exchange success:", data);
        }

        // ===============================
        // GET SESSION
        // ===============================
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("Session after callback:", session);

        if (!session) {
          console.error("No session found after auth");
          navigate("/login");
          return;
        }

        // ===============================
        // CHECK ONBOARDING STATUS
        // ===============================
        const token = session.access_token;

        const res = await fetch(
          "https://versecast-backend.onrender.com/saas/onboarding/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Onboarding status code:", res.status);

        if (res.status === 404) {
          console.log("User not onboarded → redirecting to Create Church");
          navigate("/create-church");
          return;
        }

        if (res.ok) {
          console.log("User onboarded → redirecting to Dashboard");
          navigate("/dashboard");
          return;
        }

        console.error("Unexpected onboarding response:", await res.text());
        navigate("/login");
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/login");
      }
    }

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">Signing you in…</p>
    </div>
  );
}