import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function DashboardLayout() {
  const [me, setMe] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function loadMe() {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/saas/onboarding/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );

      const json = await res.json();
      setMe(json);
    }

    loadMe();
  }, []);

  if (!me) return <div className="p-10">Loading dashboard…</div>;

  const linkBase =
    "block px-3 py-2 rounded-md text-lg font-medium transition";

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#0078ff] bg-blue-50 font-semibold"
      : "text-gray-700 hover:text-[#0078ff]";

  return (
    <div className="min-h-screen flex bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-200 p-8">
        <h2 className="text-3xl font-extrabold text-[#0078ff] mb-8">
          VerseCast
        </h2>

        <div className="mb-10">
          <p className="font-semibold text-gray-900 text-lg">
            {me.full_name}
          </p>
          <p className="text-gray-500 text-sm">{me.church.name}</p>
        </div>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className={`${linkBase} ${isActive("/dashboard")}`}
          >
            Home
          </Link>

          <Link
            to="/dashboard/sessions/start-session"
            className={`${linkBase} ${isActive(
              "/dashboard/sessions/start-session"
            )}`}
          >
            Start Session
          </Link>

          <Link
            to="/dashboard/sessions/end-session"
            className={`${linkBase} ${isActive(
              "/dashboard/sessions/end-session"
            )}`}
          >
            End Session
          </Link>

          <Link
            to="/dashboard/sessions/history"
            className={`${linkBase} ${isActive(
              "/dashboard/sessions/history"
            )}`}
          >
            Session History
          </Link>

          <Link
            to="/dashboard/operators/invite"
            className={`${linkBase} ${isActive(
              "/dashboard/operators/invite"
            )}`}
          >
            Invite Operator
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="bg-white shadow-lg rounded-xl p-10 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
