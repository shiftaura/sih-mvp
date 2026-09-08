import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  RefreshCw,
  Volume2,
  KeyRound,
  Lock,
  Fingerprint,
  SlidersHorizontal,
  BadgeCheck,
  LogIn,
  Landmark,
  Building2,
  MapPin,
  Gavel,
  CloudSync,
} from "lucide-react";

import { login } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/nlas-logo.svg";

const roles = [
  {
    id: "central",
    value: "CENTRAL_OFFICER",
    label: "Central Cadre",
    icon: Landmark,
  },
  {
    id: "state",
    value: "STATE_OFFICER",
    label: "State Officer",
    icon: Building2,
  },
  {
    id: "district",
    value: "DISTRICT_OFFICER",
    label: "District Officer",
    icon: Building2,
  },
  {
    id: "field",
    value: "FIELD_OFFICER",
    label: "Field Surveyor",
    icon: MapPin,
  },
];

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [selectedRole, setSelectedRole] =
    useState("CENTRAL_OFFICER");

  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");

  // CAPTCHA backend se aayega
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [simulationState, setSimulationState] =
    useState("normal");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCaptchaRefresh = () => {
    setCaptchaInput("");
    setError("");

    // Backend se naya CAPTCHA yahan fetch hoga
    // Example:
    // const response = await getCaptcha();
    // setCaptcha(response.captcha);
  };

  const handleAudioCaptcha = () => {
    if (!captcha) return;

    const text = captcha.split("").join(" ");

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.8;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }
  };

  const handleSimulation = (state) => {
    setSimulationState(state);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select your administrative cadre.");
      return;
    }

    if (!officerId.trim()) {
      setError("Please enter your Gov Email / Officer ID.");
      return;
    }

    if (!password) {
      setError("Please enter your Security PIN / Password.");
      return;
    }

    if (!captchaInput.trim()) {
      setError("Please enter the CAPTCHA code.");
      return;
    }

    try {
      setLoading(true);

      const data = await login({
        role: selectedRole,
        email: officerId.trim(),
        password,
        captchaCode: captchaInput.trim().toUpperCase(),
      });

      if (data?.token) {
        localStorage.setItem("nlas_token", data.token);
      }

      if (data?.user) {
        localStorage.setItem(
          "nlas_user",
          JSON.stringify(data.user)
        );

        setUser(data.user);
      } else {
        const fallbackUser = {
          name: officerId.trim(),
          email: officerId.trim(),
          role: selectedRole,
        };

        localStorage.setItem(
          "nlas_user",
          JSON.stringify(fallbackUser)
        );

        setUser(fallbackUser);
      }

      navigate("/dashboard");
    } catch (loginError) {
      console.error(loginError);

      setError(
        loginError?.response?.data?.message ||
          "Authentication failed. Please verify your credentials."
      );

      setSimulationState("invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f8f9ff] text-[#0d1c2e]">
      {/* Tricolor Top Line */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-[#ffb694]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#79db8d]" />
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-4">
        {/* HEADER */}
        <header className="flex flex-col items-center pt-1 text-center">
<div className="mb-2 flex h-16 w-16 items-center justify-center rounded-lg border border-[#8fb8f5] bg-[#eff4ff] p-1 shadow-sm">            <img
              src={logo}
              alt="NLAS Official Emblem Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#44474e]">
            Department of Land Resources • Ministry of Rural
            Development
          </span>

          <h1 className="text-[18px] font-semibold leading-6 text-[#0d1c2e]">
            National Land Acquisition &amp; Management System
          </h1>

          <span className="mt-0.5 text-xs font-semibold tracking-wide text-[#4b5f80]">
            Government of India
          </span>
        </header>

        {/* RESTRICTED ACCESS */}
        <div className="flex items-center justify-center gap-1 rounded bg-[#dce9ff] px-3 py-2 text-xs font-semibold uppercase tracking-wide">
          <BadgeCheck className="h-4 w-4 text-[#e16317]" />

          <span>
            Restricted Government Access (NIC / CERT-IN Audited)
          </span>
        </div>

        {/* DEV SIMULATION */}
        <div className="flex flex-col gap-1.5 rounded bg-[#eff4ff] p-1.5 shadow-sm">
          <div className="flex items-center justify-between px-1">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#44474e]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              State Previews:
            </span>

            <span className="font-mono text-[11px] font-medium text-[#74777e]">
              DEV SIM
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => handleSimulation("normal")}
              className={`rounded px-2 py-1 text-[11px] font-semibold transition-colors ${
                simulationState === "normal"
                  ? "bg-[#000b1f] text-white"
                  : "bg-[#e6eeff] text-[#44474e]"
              }`}
            >
              Normal
            </button>

            <button
              type="button"
              onClick={() => handleSimulation("invalid")}
              className={`rounded px-2 py-1 text-[11px] font-semibold transition-colors ${
                simulationState === "invalid"
                  ? "bg-[#000b1f] text-white"
                  : "bg-[#e6eeff] text-[#44474e]"
              }`}
            >
              Auth Alert
            </button>

            <button
              type="button"
              onClick={() => handleSimulation("maintenance")}
              className={`rounded px-2 py-1 text-[11px] font-semibold transition-colors ${
                simulationState === "maintenance"
                  ? "bg-[#000b1f] text-white"
                  : "bg-[#e6eeff] text-[#44474e]"
              }`}
            >
              NIC Gateway
            </button>
          </div>
        </div>

        {/* AUTH ERROR */}
        {simulationState === "invalid" && (
          <div className="flex items-start gap-2 rounded bg-[#ffdad6] p-3 text-[#93000a] shadow-sm">
            <span className="text-lg">⚠</span>

            <div className="flex flex-1 flex-col">
              <span className="text-xs font-semibold">
                Authentication Failed
              </span>

              <span className="mt-0.5 text-xs">
                {error ||
                  "Invalid Officer Security Token (Error NLAS-AUTH-403). Contact district nodal officer."}
              </span>
            </div>
          </div>
        )}

        {/* MAINTENANCE */}
        {simulationState === "maintenance" && (
          <div className="flex flex-col gap-2 rounded bg-[#d5e3fc] p-3 shadow-sm">
            <div className="flex items-start gap-2">
              <CloudSync className="h-5 w-5 shrink-0 text-[#e16317]" />

              <div className="flex flex-1 flex-col">
                <span className="text-xs font-semibold">
                  Scheduled NIC Gateway Sync
                </span>

                <span className="mt-0.5 text-xs text-[#44474e]">
                  Land Records Central Registry sync in progress
                  (02:00 - 02:45 IST). Offline verification
                  available.
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSimulationState("normal")}
                className="flex items-center gap-1 rounded bg-[#000b1f] px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
              >
                <RefreshCw className="h-3 w-3" />
                Retry Gateway
              </button>
            </div>
          </div>
        )}

        {/* LOGIN CARD */}
        <div className="flex flex-col gap-4 rounded bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#006d30]" />

              <span className="text-xs font-semibold text-[#0d1c2e]">
                Officer Portal Sign In
              </span>
            </div>

            <span className="font-mono text-xs font-medium text-[#74777e]">
              v4.2.1-SEC
            </span>
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-[#44474e]">
              SELECT ADMINISTRATIVE CADRE{" "}
              <span className="text-[#e16317]">*</span>
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive =
                  selectedRole === role.value;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() =>
                      setSelectedRole(role.value)
                    }
                    className={`flex items-center gap-1.5 rounded px-2 py-1.5 text-left text-[11px] font-semibold transition-all ${
                      isActive
                        ? "bg-[#000b1f] text-white"
                        : "bg-[#eff4ff] text-[#0d1c2e] hover:bg-[#e6eeff]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />

                    <span className="truncate">
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* OFFICER ID */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="officer-id"
                className="flex items-center justify-between text-xs font-semibold"
              >
                <span>
                  Gov Email / Officer ID{" "}
                  <span className="text-[#e16317]">*</span>
                </span>

                <span className="text-[11px] text-[#74777e]">
                  eGov Auth
                </span>
              </label>

              <div className="relative flex items-center">
                <BadgeCheck className="pointer-events-none absolute left-3 h-4 w-4 text-[#44474e]" />

                <input
                  id="officer-id"
                  name="officerId"
                  type="text"
                  value={officerId}
                  onChange={(event) =>
                    setOfficerId(event.target.value)
                  }
                  placeholder="officer.id@nic.in or GOI-LAND-7821"
                  autoComplete="username"
                  className="h-10 w-full rounded bg-white pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-[#74777e] focus:bg-[#eff4ff]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="officer-pass"
                className="text-xs font-semibold"
              >
                Secure Security Pin / Password{" "}
                <span className="text-[#e16317]">*</span>
              </label>

              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3 h-4 w-4 text-[#44474e]" />

                <input
                  id="officer-pass"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter cryptographic passphrase"
                  autoComplete="current-password"
                  className="h-10 w-full rounded bg-white pl-9 pr-10 text-sm outline-none placeholder:text-[#74777e] focus:bg-[#eff4ff]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-2.5 flex items-center p-1 text-[#44474e] hover:text-[#0d1c2e]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <span className="mt-0.5 text-xs text-[#44474e]">
                Requires 14+ characters, DSC Key, or Jan
                Parichay 2FA hardware token.
              </span>
            </div>

            {/* CAPTCHA */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="captcha-input"
                className="text-xs font-semibold"
              >
                Security Verification CAPTCHA{" "}
                <span className="text-[#e16317]">*</span>
              </label>

              <div className="flex items-center gap-2">
                {/* CAPTCHA DISPLAY */}
                <div className="relative flex h-10 flex-1 items-center justify-between overflow-hidden rounded bg-[#dce9ff] px-3 select-none">
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-around opacity-10">
                    <span className="font-mono text-sm -rotate-12">
                      ///
                    </span>

                    <span className="font-mono text-sm rotate-45">
                      \\\
                    </span>

                    <span className="font-mono text-sm">
                      ===
                    </span>
                  </div>

                  <span className="relative z-10 font-mono text-base font-bold tracking-widest line-through decoration-[#ffb694]">
                    {captcha || "CAPTCHA"}
                  </span>

                  <div className="relative z-10 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleAudioCaptcha}
                      title="Play Audio CAPTCHA"
                      disabled={!captcha}
                      className="rounded p-1 text-[#44474e] hover:bg-[#e6eeff] hover:text-[#0d1c2e] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleCaptchaRefresh}
                      title="Refresh CAPTCHA"
                      className="rounded p-1 text-[#44474e] hover:bg-[#e6eeff] hover:text-[#0d1c2e]"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* CAPTCHA INPUT */}
                <input
                  id="captcha-input"
                  name="captcha"
                  type="text"
                  maxLength={6}
                  value={captchaInput}
                  onChange={(event) =>
                    setCaptchaInput(
                      event.target.value.toUpperCase()
                    )
                  }
                  placeholder="Code"
                  autoComplete="off"
                  className="h-10 w-24 rounded bg-white px-2.5 text-center font-mono text-xs uppercase outline-none placeholder:text-[#74777e] focus:bg-[#eff4ff]"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && simulationState !== "invalid" && (
              <p className="text-xs font-medium text-[#ba1a1a]">
                {error}
              </p>
            )}

            {/* SIGN IN */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded bg-[#0b2240] text-sm font-semibold tracking-wide text-white shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#ffb694] transition-all group-hover:w-2.5" />

                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Sign In to Portal</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#4b5f80] underline underline-offset-2 hover:text-[#0d1c2e]"
                >
                  <KeyRound className="h-3 w-3" />
                  Forgot NIC Credentials?
                </button>

                <span className="text-[11px] text-[#74777e]">
                  •
                </span>

                <button
                  type="button"
                  className="text-[11px] font-semibold text-[#4b5f80] hover:text-[#0d1c2e]"
                >
                  NIC Helpdesk
                </button>
              </div>
            </div>
          </form>

          {/* SSO DIVIDER */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="h-px flex-1 bg-[#dce9ff]" />

            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#74777e]">
              Alternative Sovereign SSO
            </span>

            <div className="h-px flex-1 bg-[#dce9ff]" />
          </div>

          {/* SSO BUTTON */}
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded bg-[#eff4ff] text-xs font-semibold text-[#0d1c2e] shadow-sm transition-colors hover:bg-[#e6eeff]"
          >
            <Fingerprint className="h-4 w-4 text-[#007233]" />

            <span>
              Login with MeriPehchan / Jan Parichay SSO
            </span>
          </button>
        </div>

        {/* SYSTEM STATUS */}
        <div className="grid grid-cols-2 gap-2">
          {/* NIC Gateway */}
          <div className="flex flex-col gap-1 rounded bg-white p-2 shadow-sm">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#74777e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#006d30]" />
              NIC GATEWAY
            </span>

            <span className="font-mono text-xs font-semibold">
              ONLINE (34ms)
            </span>

            <span className="text-xs text-[#44474e]">
              Cloud Node: DL-NIC-04
            </span>
          </div>

          {/* Act Compliance */}
          <div className="flex flex-col gap-1 rounded bg-white p-2 shadow-sm">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#74777e]">
              <Gavel className="h-3 w-3" />
              ACT COMPLIANCE
            </span>

            <span className="font-mono text-xs font-semibold">
              RFCTLARR 2013
            </span>

            <span className="text-xs text-[#44474e]">
              Land Registry v2.6
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="flex flex-col items-center gap-2 pb-5 text-center text-[#44474e]">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-[#006d30]" />
              256-bit SSL Encrypted
            </span>

            <span>•</span>

            <span>ISO 27001 Certified</span>

            <span>•</span>

            <span>NIC Verified</span>
          </div>

          <p className="max-w-xs text-xs text-[#74777e]">
            Designed &amp; Hosted by Ultrons. Tech Team • NIC Cloud • Ministry of Rural Development • Government of India
          
          </p>
        </footer>
      </div>
    </main>
  );
}

export default Login;