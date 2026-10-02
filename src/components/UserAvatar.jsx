import { useEffect, useRef, useState } from "react";
import { uploadProfilePicture } from "../services/api";
import { Camera, LogOut, User, X } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function UserAvatar() {
  const { user, logout } = useAuth();
  const avatarLetter = user?.username?.trim()?.charAt(0)?.toUpperCase() || "U";
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profile_image || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  function handleAvatarClick() {
    setIsOpen((prev) => !prev);
  }

  function handleChangePhoto() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    try {
      setUploading(true);

      const data = await uploadProfilePicture(file);

      setProfileImage(data.profile_image);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function handleRemovePhoto() {
    setProfileImage(null);
    localStorage.removeItem("profile_image");
  }

  function handleLogout() {
    setIsOpen(false);
    logout();
  }

  const displayName = user?.username || "User";
  const email = user?.email || "";

  useEffect(() => {
    setProfileImage(user?.profile_image || null);
  }, [user]);

  return (
    <div className="">
      {/* Avatar button */}
      {/* Avatar button */}
      <button
        type="button"
        onClick={handleAvatarClick}
        className="
    absolute right-4 top-4 z-99
    h-10 w-10
    overflow-hidden
    rounded-full

    border border-white/20
    bg-white/6
    backdrop-blur-xl
    shadow-[0_4px_20px_rgba(0,0,0,0.2)]

    transition-all duration-200
    hover:scale-105
    hover:border-white/30
    hover:bg-white/12
    hover:shadow-[0_6px_25px_rgba(180,151,207,0.25)]

    focus:outline-none
    focus:ring-2
    focus:ring-[#b497cf]/40
  "
      >
        {profileImage ? (
          <img
            src={
              profileImage.startsWith("http")
                ? profileImage
                : `${API_URL}${profileImage}`
            }
            alt="Profile"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
            onError={() => setProfileImage(null)}
          />
        ) : (
          <div
            className="
        flex h-full w-full
        items-center justify-center
        bg-white/6
        text-sm font-semibold
        text-white
        backdrop-blur-xl
      "
          >
            {avatarLetter}
          </div>
        )}
      </button>

      {/* Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="
        fixed inset-0 z-40
        bg-black/10
        backdrop-blur-[2px]
      "
            onClick={() => setIsOpen(false)}
          />

          {/* Glass Popup */}
          <div
            className="
        absolute right-4 top-15 z-50
        w-72
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-black/40
        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        backdrop-blur-2xl
        transition-all duration-300
      "
          >
            {/* User Information */}
            <div
              className="
          flex items-center gap-3
          border-b border-white/10
          bg-white/3
          p-4
        "
            >
              {/* Profile Image */}
              <div
                className="
            h-10 w-10
            shrink-0
            overflow-hidden
            rounded-full
            border border-white/15
            bg-white/8
            shadow-inner
          "
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="
                flex h-full w-full
                items-center justify-center
                text-white/60
              "
                  >
                    <User size={20} />
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {displayName}
                </p>

                <p className="mt-0.5 truncate text-xs text-white/40">{email}</p>
              </div>
            </div>

            {/* Profile Picture Options */}
            <div className="space-y-1 p-2">
              {/* Change Profile Picture */}
              <button
                type="button"
                onClick={handleChangePhoto}
                disabled={uploading}
                className="
            flex w-full items-center gap-3
            rounded-xl
            border border-transparent
            px-3 py-2.5
            text-sm text-white/70
            transition-all duration-200
            hover:border-white/10
            hover:bg-white/[0.07]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
              >
                <div
                  className="
              flex h-8 w-8
              shrink-0
              items-center justify-center
              rounded-lg
              border border-white/10
              bg-white/6
              text-white/70
            "
                >
                  {uploading ? (
                    <div
                      className="
                  h-4 w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/20
                  border-t-white
                "
                    />
                  ) : (
                    <Camera size={17} />
                  )}
                </div>

                <span>
                  {uploading ? "Uploading..." : "Change profile picture"}
                </span>
              </button>

              {/* Remove Profile Picture */}
              {profileImage && !uploading && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="
              flex w-full items-center gap-3
              rounded-xl
              border border-transparent
              px-3 py-2.5
              text-sm text-white/70
              transition-all duration-200
              hover:border-white/10
              hover:bg-white/[0.07]
              hover:text-white
            "
                >
                  <div
                    className="
                flex h-8 w-8
                shrink-0
                items-center justify-center
                rounded-lg
                border border-white/10
                bg-white/6
                text-white/70
              "
                  >
                    <User size={17} />
                  </div>

                  <span>Remove profile picture</span>
                </button>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="
            flex w-full items-center gap-3
            rounded-xl
            border border-transparent
            px-3 py-2.5
            text-sm text-red-400
            transition-all duration-200
            hover:border-red-400/10
            hover:bg-red-500/10
            hover:text-red-300
          "
              >
                <div
                  className="
              flex h-8 w-8
              shrink-0
              items-center justify-center
              rounded-lg
              border border-red-400/10
              bg-red-500/6
            "
                >
                  <LogOut size={17} />
                </div>

                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
