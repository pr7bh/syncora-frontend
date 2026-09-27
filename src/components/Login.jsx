import { useState } from "react";

import { loginUser, loginWithGoogle } from "../services/api";
import { saveToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

import AeroShards from "./AeroShards";
import SpecularButton from "./SpecularButton";
import ParticleText from "./ParticleText";

export default function Login({ onSwitchToRegister }) {
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      saveToken(data.access_token);
      setToken(data.access_token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(response) {
    setError("");
    setLoading(true);

    try {
      const data = await loginWithGoogle(response.credential);

      saveToken(data.access_token);
      setToken(data.access_token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <AeroShards
          backgroundColor="#120F17"
          shardColor="#896ABD"
          accentColor="#A855F7"
          placement="full"
          flow="stream"
          material="pearl"
          detail="balanced"
          effect="none"
          scale={1}
          spread={1}
          depth={1}
          speed={1}
          spin={1}
          interaction="repel"
          density={1.5}
          shardSize={1.1}
          stretch={1}
          turbulence={1}
          glow={1}
          edgeSoftness={2}
          bloom={0.5}
          grain={0.05}
          chromaticAberration={0.0075}
          transitionDuration={1}
          interactionRadius={1.5}
          interactionStrength={0.5}
          rippleIntensity={1}
          holdToGather
          paused={false}
        />
      </div>

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* ================= LOGIN CONTENT ================= */}
      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center">
            <ParticleText
              text="Syncora"
              particleSize={2.2}
              density={4}
              color="#f8fafc"
              highlightColor="#8b5cf6"
              scatter={190}
              gatherDuration={1600}
              stagger={420}
              pointerRepel={42}
              repelRadius={120}
              idleDrift={0.8}
              trigger="mount"
              fontSize="clamp(3.5rem, 13vw, 9rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
            />
          </div>

          {/* Login Card */}
          
            <div
              className="
              rounded-2xl
              border
              border-white/15
              bg-transparent
              p-2
              shadow-2xl
              backdrop-blur-sm
            "
            >
              
              <form onSubmit={handleLogin} className="mt-6 space-y-5">

  {/* Email */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white/80">
      Email
    </label>

    <input
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      placeholder="you@example.com"
      required
      className="
        w-full
        rounded-lg
        border
        border-white/15
        bg-white/10
        px-4
        py-3
        text-white
        placeholder:text-white/40
        outline-none
        transition-all
        duration-300
        focus:border-purple-400
        focus:ring-2
        focus:ring-purple-500/30
      "
    />
  </div>

  {/* Password */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white/80">
      Password
    </label>

    <input
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      placeholder="••••••••"
      required
      className="
        w-full
        rounded-lg
        border
        border-white/15
        bg-white/10
        px-4
        py-3
        text-white
        placeholder:text-white/40
        outline-none
        transition-all
        duration-300
        focus:border-purple-400
        focus:ring-2
        focus:ring-purple-500/30
      "
    />
  </div>

  {/* Error */}
  {error && (
    <div
      className="
        rounded-lg
        border
        border-red-400/30
        bg-red-500/10
        px-4
        py-3
        text-sm
        text-red-300
      "
    >
      {error}
    </div>
  )}

  {/* Login Button */}
  <SpecularButton
  type="submit"
  disabled={loading}
  size="lg"
  radius={18}
  tint="#ffffff"
  tintOpacity={0.08}
  blur={8}
  textColor="#f5f5f5"
  lineColor="#ffffff"
  baseColor="#ffffff"
  intensity={0.8}
  shineSize={10}
  shineFade={40}
  thickness={1}
  speed={0.35}
  followMouse
  proximity={250}
  autoAnimate={false}
  className="w-full"
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
      Signing in...
    </span>
  ) : (
    "Sign in"
  )}
</SpecularButton>

  {/* Divider */}
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-white/10" />
    </div>

    <div className="relative flex justify-center">
      <span className="bg-[#0d0a12] px-3 text-sm text-white/40">
        OR
      </span>
    </div>
  </div>

 {/* Google Login */}
<div className="relative w-full">

  {/* Specular Google Button */}
  <SpecularButton
    type="button"
    size="lg"
    radius={18}
    tint="#ffffff"
    tintOpacity={0.08}
    blur={8}
    textColor="#f5f5f5"
    lineColor="#ffffff"
    baseColor="#ffffff"
    intensity={0.8}
    shineSize={10}
    shineFade={40}
    thickness={1}
    speed={0.35}
    followMouse
    proximity={250}
    autoAnimate={false}
    className="w-full"
  >
    <div className="flex items-center justify-center gap-3">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
        />
        <path
          fill="#34A853"
          d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.75z"
        />
        <path
          fill="#FBBC05"
          d="M6.54 13.85A5.85 5.85 0 0 1 6.23 12c0-.64.11-1.26.31-1.85V7.62H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.38l3.24-2.53z"
        />
        <path
          fill="#EA4335"
          d="M12 6.12c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.21 14.63 2.25 12 2.25A9.74 9.74 0 0 0 3.3 7.62l3.24 2.53C7.31 7.84 9.46 6.12 12 6.12z"
        />
      </svg>

      Continue with Google
    </div>
  </SpecularButton>

  {/* Invisible Google OAuth button */}
  <div
    className="
      absolute
      inset-0
      z-10
      opacity-0
      cursor-pointer
      overflow-hidden
    "
  >
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        setError("Google sign in failed");
      }}
      theme="filled_black"
      size="large"
      width="350"
      text="continue_with"
    />
  </div>

</div>
</form>

              {/* Register */}
              <div className="mt-6 text-center text-sm">
                <span className="text-white/60">Don't have an account? </span>

                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="
                  font-medium
                  text-purple-300
                  transition
                  hover:text-purple-200
                "
                >
                  Sign up
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
