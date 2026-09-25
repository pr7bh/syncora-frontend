function MeetingInput({
  file,
  setFile,
  youtubeUrl,
  setYoutubeUrl,
  loading,
  analyzeMeeting,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-white
        p-2
        shadow-sm
        transition-colors duration-300

        dark:border-gray-800
        dark:bg-gray-900
      "
    >

      <h2
        className="
          mb-3
          text-lg
          font-semibold
          text-gray-900
          dark:text-gray-100
        "
      >
        Upload Video
      </h2>

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="
          block
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          p-2
          text-sm
          text-gray-700

          file:mr-4
          file:rounded-md
          file:border-0
          file:bg-gray-100
          file:px-3
          file:py-1.5
          file:text-sm
          file:font-medium

          hover:border-gray-400

          dark:border-gray-700
          dark:bg-gray-950
          dark:text-gray-300
          dark:file:bg-gray-800
          dark:file:text-gray-200
          dark:hover:border-gray-600

          transition-colors duration-300
        "
      />

      <div className="my-6 flex items-center gap-4">

        <div
          className="
            h-px
            flex-1
            bg-gray-200
            dark:bg-gray-800
          "
        />

        <span
          className="
            text-sm
            text-gray-400
            dark:text-gray-500
          "
        >
          OR
        </span>

        <div
          className="
            h-px
            flex-1
            bg-gray-200
            dark:bg-gray-800
          "
        />

      </div>

      <h2
        className="
          mb-3
          text-lg
          font-semibold
          text-gray-900
          dark:text-gray-100
        "
      >
        YouTube URL
      </h2>

      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={youtubeUrl}
        onChange={(e) =>
          setYoutubeUrl(e.target.value)
        }
        className="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-3
          py-2
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none

          focus:border-gray-500
          focus:ring-1
          focus:ring-gray-300

          dark:border-gray-700
          dark:bg-gray-950
          dark:text-gray-100
          dark:placeholder:text-gray-600
          dark:focus:border-gray-500
          dark:focus:ring-gray-700

          transition-colors duration-300
        "
      />

      <button
        onClick={analyzeMeeting}
        disabled={loading}
        className="
          mt-6
          w-full
          rounded-lg
          bg-black
          px-4
          py-3
          text-sm
          font-medium
          text-white

          hover:bg-gray-800
          disabled:cursor-not-allowed
          disabled:opacity-50

          dark:bg-white
          dark:text-black
          dark:hover:bg-gray-200

          transition-colors duration-300
        "
      >
        {loading
          ? "Analyzing..."
          : "Analyze Video"}
      </button>

    </div>
  );
}

export default MeetingInput;