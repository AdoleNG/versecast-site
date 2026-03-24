export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900">
        Welcome to Your Dashboard
      </h1>

      <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
        Manage your sessions, operators, and church settings from one place.
        Everything you need to run VerseCast smoothly is right here.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Start Session Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-[#0078ff] mb-2">
            Start a Session
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Launch the Control Panel and begin presenting scripture.
          </p>
          <a
            href="/dashboard/sessions/start-session"
            className="text-[#0078ff] font-semibold hover:underline"
          >
            Go to Start Session →
          </a>
        </div>

        {/* Session History Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Session History
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Review past sessions and see what was displayed.
          </p>
          <a
            href="/dashboard/sessions/history"
            className="text-[#0078ff] font-semibold hover:underline"
          >
            View History →
          </a>
        </div>

        {/* Operators Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Operators
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Invite and manage operators who can control VerseCast.
          </p>
          <a
            href="/dashboard/operators/invite"
            className="text-[#0078ff] font-semibold hover:underline"
          >
            Manage Operators →
          </a>
        </div>
      </div>
    </div>
  );
}
