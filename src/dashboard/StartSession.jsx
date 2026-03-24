export default function StartSession() {
  const base = import.meta.env.VITE_KJV_URL;

  const handleStart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Opening control...");
    window.open(`${base}/control/demo`, "_blank", "noopener,noreferrer");

    console.log("Opening presenter...");
    window.open(`${base}/presenter/demo`, "_blank", "noopener,noreferrer");

    console.log("Both open calls executed.");
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
