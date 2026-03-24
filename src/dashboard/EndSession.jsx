export default function EndSession() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">End Session</h1>
      <p className="text-gray-600">
        This will end the current live session and disconnect operators.
      </p>

      <button className="bg-red-600 text-white px-6 py-3 rounded-lg mt-4">
        End Session
      </button>
    </div>
  );
}
