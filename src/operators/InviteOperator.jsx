export default function InviteOperator() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Invite Operator</h1>
      <p className="text-gray-600 mb-4">
        Invite someone to help manage live sessions.
      </p>

      <input
        type="email"
        placeholder="Operator email"
        className="border px-4 py-2 rounded-lg w-80"
      />

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg ml-3">
        Send Invite
      </button>
    </div>
  );
}
