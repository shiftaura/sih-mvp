import { useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Map,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [showKhasraSearch, setShowKhasraSearch] = useState(false);

  const [formData, setFormData] = useState({
    state: "",
    district: "",
    village: "",
    khasraNumber: "",
  });

  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSearchResult(null);
  };

  const handleKhasraSearch = (e) => {
    e.preventDefault();

    if (
      !formData.state ||
      !formData.district ||
      !formData.village ||
      !formData.khasraNumber
    ) {
      setError("Please fill all fields before searching.");
      return;
    }

    setError("");

    // Temporary frontend demo data.
    // Later replace this with the actual NLAS backend API response.

    setSearchResult({
      parcelId: "KHS-48291",
      khasraNo: formData.khasraNumber,
      village: formData.village,
      district: formData.district,
      state: formData.state,
      area: "1.42 Ha",
      status: "Under Acquisition",
      project: "National Infrastructure Project",
    });
  };

  const closeModal = () => {
    setShowKhasraSearch(false);
    setError("");
    setSearchResult(null);
  };

  return (
    <>
      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#f8fafc]">
        {/* Background decoration */}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl" />

          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />
        </div>

        {/* Main container */}

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div>
            {/* Platform badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <ShieldCheck
                size={16}
                className="text-[#0f3b67]"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                National Digital Land Governance Platform
              </span>
            </div>

            {/* Main heading */}

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-[#10243e] sm:text-5xl lg:text-6xl">
              Transparent Land Acquisition.

              <span className="mt-2 block text-[#c25a16]">
                Faster Project Delivery.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              India&apos;s unified digital platform for monitoring land
              acquisition, compensation, rehabilitation and resettlement
              across public infrastructure projects under the RFCTLARR
              framework.
            </p>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Explore Projects */}

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#102f50] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173f69]"
              >
                Explore Projects

                <ArrowRight size={17} />
              </Link>

              {/* Portal Login */}

              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Portal Login

                <ExternalLink size={16} />
              </Link>

              {/* Citizen Khasra Search */}

              <button
                type="button"
                onClick={() => setShowKhasraSearch(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#cf6b22]/40 bg-orange-50 px-5 py-3 text-sm font-semibold text-[#9f4711] transition hover:bg-orange-100"
              >
                <Search size={17} />

                Citizen Khasra Search
              </button>
            </div>

            {/* =================================================
                TRUST / META CARDS
            ================================================= */}

            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              {/* Card 1 */}

              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Statutory
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Acquisition Workflow
                </p>
              </div>

              {/* Card 2 */}

              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Compensation
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Digital Monitoring
                </p>
              </div>

              {/* Card 3 */}

              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Geospatial
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Parcel Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — GIS COMMAND VISUAL
          ===================================================== */}

          <div className="relative">
            {/* Main GIS Card */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
              {/* Card Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    National Monitoring
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[#10243e]">
                    Sovereign GIS Command Visualization
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#15466f]">
                  <Map size={20} />
                </div>
              </div>

              {/* =================================================
                  MAP VISUAL
              ================================================= */}

              <div className="relative min-h-[420px] overflow-hidden bg-[#edf3f7] p-5">
                {/* Map Grid */}

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#c9d5df 1px, transparent 1px), linear-gradient(90deg, #c9d5df 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />

                {/* India-style abstract map */}

                <div className="relative flex h-[300px] items-center justify-center">
                  <div className="relative h-64 w-52 rotate-[-4deg] rounded-[42%_50%_55%_45%] border-2 border-[#7692a8] bg-gradient-to-br from-[#d9e6ed] to-[#c4d5df] shadow-inner">
                    {/* Location 1 */}

                    <div className="absolute left-[40%] top-[18%] h-3 w-3 rounded-full bg-[#c25a16] shadow-[0_0_0_7px_rgba(194,90,22,0.16)]" />

                    {/* Location 2 */}

                    <div className="absolute left-[58%] top-[38%] h-2.5 w-2.5 rounded-full bg-[#174b73] shadow-[0_0_0_6px_rgba(23,75,115,0.14)]" />

                    {/* Location 3 */}

                    <div className="absolute bottom-[28%] left-[32%] h-2.5 w-2.5 rounded-full bg-[#1f7a53] shadow-[0_0_0_6px_rgba(31,122,83,0.14)]" />

                    {/* Location 4 */}

                    <div className="absolute bottom-[12%] right-[22%] h-2.5 w-2.5 rounded-full bg-[#c25a16] shadow-[0_0_0_6px_rgba(194,90,22,0.14)]" />
                  </div>
                </div>

                {/* 
                    MAP INFORMATION CARDS
                 */}

                <div className="relative grid gap-3 sm:grid-cols-3">
                  {/* Monitoring */}

                  <div className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm backdrop-blur">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Monitoring
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      Multi-State
                    </p>
                  </div>

                  {/* Data Layer */}

                  <div className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm backdrop-blur">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Data Layer
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      Parcel Level
                    </p>
                  </div>

                  {/* Updates */}

                  <div className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm backdrop-blur">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Updates
                    </p>

                    <p className="mt-1 text-sm font-bold text-green-700">
                      Live Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 
                FLOATING CARD
             */}

            <div className="absolute -bottom-5 -left-4 hidden w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                  <ShieldCheck
                    size={20}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Public Transparency
                  </p>

                  <p className="text-sm font-bold text-slate-800">
                    Parcel-level visibility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
          CITIZEN KHASRA SEARCH MODAL
    */}

      {showKhasraSearch && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 
                MODAL HEADER
             */}

            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
                  Citizen Service
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#10243e]">
                  Search Land Parcel
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search using administrative location and Khasra / Survey
                  number.
                </p>
              </div>

              {/* Close */}

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            {/* 
                SEARCH FORM
            */}

            <form
              onSubmit={handleKhasraSearch}
              className="p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* State */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    State
                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select State
                    </option>

                    <option value="Uttar Pradesh">
                      Uttar Pradesh
                    </option>

                    <option value="Delhi">
                      Delhi
                    </option>

                    <option value="Rajasthan">
                      Rajasthan
                    </option>

                    <option value="Haryana">
                      Haryana
                    </option>

                    <option value="Madhya Pradesh">
                      Madhya Pradesh
                    </option>
                  </select>
                </div>

                {/* District */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    District
                  </label>

                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter district"
                    className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Village */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Village
                  </label>

                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    placeholder="Enter village"
                    className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Khasra */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Khasra / Survey Number
                  </label>

                  <input
                    type="text"
                    name="khasraNumber"
                    value={formData.khasraNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 182/4"
                    className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Search button */}

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#102f50] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#173f69]"
              >
                <Search size={17} />

                Search Land Record
              </button>
            </form>

            {/* 
                SEARCH RESULT
             */}

            {searchResult && (
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-6">
                {/* Result heading */}

                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      Record Found
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      Parcel {searchResult.parcelId}
                    </h3>
                  </div>

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    {searchResult.status}
                  </span>
                </div>

                {/* Result grid */}

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultItem
                    label="Khasra Number"
                    value={searchResult.khasraNo}
                  />

                  <ResultItem
                    label="Area"
                    value={searchResult.area}
                  />

                  <ResultItem
                    label="Village"
                    value={searchResult.village}
                  />

                  <ResultItem
                    label="District"
                    value={searchResult.district}
                  />

                  <ResultItem
                    label="State"
                    value={searchResult.state}
                  />

                  <ResultItem
                    label="Linked Project"
                    value={searchResult.project}
                  />
                </div>

                {/* Demo note */}

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Demo frontend result. Final parcel details will be fetched
                  from the authorized NLAS backend API after API integration.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* 
   RESULT ITEM COMPONENT
 */

function ResultItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}