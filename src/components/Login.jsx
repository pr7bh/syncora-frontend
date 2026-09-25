import { useState } from "react";

import { loginUser, loginWithGoogle } from "../services/api";
import { saveToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

import AeroShards from "./AeroShards";
import SpecularButton from "./SpecularButton";

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
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Syncora
            </h1>

            <p className="mt-2 text-sm text-white/70">AI Meeting Assistant</p>
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
                    transition
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
                    transition
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
                tintOpacity={0}
                blur={0}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="w-full"
                >{loading ? "Signing in..." : "Sign in"}</SpecularButton>
                
                  
               

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-transparent px-3 text-sm text-white/50">
                      OR
                    </span>
                  </div>
                </div>

                {/* Google Login */}
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setError("Google sign in failed");
                    }}
                    theme="filled_black"
                    size="large"
                    width="350"
                  />
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
