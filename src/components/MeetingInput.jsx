import SpecularButton from "./SpecularButton";

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
        border border-white/15
        bg-white/10
        p-5
        shadow-2xl
        backdrop-blur-xl
        transition-all duration-300

        dark:border-white/15
        dark:bg-white/5
      "
    >
      {/* Upload Video */}
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
        onChange={(e) => setFile(e.target.files[0])}
        className="
          block
          w-full
          rounded-lg
          border border-white/15
          bg-white/10
          p-2
          text-sm
          text-gray-700
          outline-none
          transition-all duration-300

          file:mr-4
          file:rounded-md
          file:border-0
          file:bg-white/20
          file:px-3
          file:py-1.5
          file:text-sm
          file:font-medium
          file:text-gray-800

          hover:border-purple-300/50

          dark:border-white/15
          dark:bg-black/20
          dark:text-gray-300
          dark:file:bg-white/10
          dark:file:text-gray-200
          dark:hover:border-purple-400/40
        "
      />

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/15" />

        <span
          className="
            text-sm
            font-medium
            text-gray-400
            dark:text-gray-500
          "
        >
          OR
        </span>

        <div className="h-px flex-1 bg-white/15" />
      </div>

      {/* YouTube */}
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
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="
          w-full
          rounded-lg
          border border-white/15
          bg-white/10
          px-4
          py-3
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none
          backdrop-blur-sm
          transition-all duration-300

          focus:border-purple-400
          focus:ring-2
          focus:ring-purple-500/30

          dark:border-white/15
          dark:bg-black/20
          dark:text-gray-100
          dark:placeholder:text-white/30
          dark:focus:border-purple-400
          dark:focus:ring-purple-500/30
        "
      />

      {/* Analyze Button */}
      <div className="mt-6">
        <SpecularButton
          type="button"
          disabled={loading}
          size="lg"
          radius={18}
          tint="#ffffff"
          tintOpacity={0}
          blur={0}
          textColor="#f5f5f5"
          lineColor="#ffffff"
          baseColor="#000000"
          intensity={1}
          shineSize={10}
          shineFade={40}
          thickness={1}
          speed={0.35}
          followMouse
          proximity={250}
          autoAnimate={false}
          className="w-full"
          onClick={analyzeMeeting}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />
              Analyzing...
            </span>
          ) : (
            "Analyze Video"
          )}
        </SpecularButton>
      </div>
    </div>
  );
}

export default MeetingInput;