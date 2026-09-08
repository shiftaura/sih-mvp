import { useState } from "react";
import {
  ArrowRight,
  FileSearch,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function KhasraSearch() {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    village: "",
    khasraNumber: "",
  });

  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSearched(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.state ||
      !formData.district ||
      !formData.village ||
      !formData.khasraNumber
    ) {
      setError("Please fill all the fields to search the land record.");
      return;
    }

    setError("");
    setSearched(true);

    // BACKEND INTEGRATION LATER
    // API will receive:
    // state
    // district
    // village
    // khasraNumber
  };

  return (
    <section
      id="khasra-search"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Content */}

          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
              <Search size={15} />

              Citizen Services
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
              Search Your Land Parcel
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Citizens can search publicly available land acquisition records
              using the location details and Khasra or Survey Number.
            </p>

            {/* Info Points */}

            <div className="mt-8 space-y-5">
              <Feature
                icon={MapPin}
                title="Location-Based Search"
                description="Search records using state, district and village details."
              />

              <Feature
                icon={FileSearch}
                title="Parcel-Level Information"
                description="Locate land acquisition records using Khasra or Survey Number."
              />

              <Feature
                icon={ShieldCheck}
                title="Public Transparency"
                description="Only information approved for public access will be displayed."
              />
            </div>
          </div>

          {/* Search Card */}

          <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 shadow-sm sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c25a16]">
                Land Record Lookup
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#10243e]">
                Citizen Khasra Search
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the available administrative and parcel details below.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* State */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    State
                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select State</option>
                    <option value="Uttar Pradesh">
                      Uttar Pradesh
                    </option>
                    <option value="Delhi">
                      Delhi
                    </option>
                    <option value="Haryana">
                      Haryana
                    </option>
                    <option value="Rajasthan">
                      Rajasthan
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
                    onChange={handleChange}
                    placeholder="Enter district"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
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
                    onChange={handleChange}
                    placeholder="Enter village"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Khasra Number */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Khasra / Survey Number
                  </label>

                  <input
                    type="text"
                    name="khasraNumber"
                    value={formData.khasraNumber}
                    onChange={handleChange}
                    placeholder="e.g. 182/4"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#174b73] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Search Button */}

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102f50] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#173f69]"
              >
                <Search size={17} />

                Search Land Record

                <ArrowRight size={16} />
              </button>
            </form>

            {/* Temporary Result State */}

            {searched && (
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#174b73]">
                    <FileSearch size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-[#10243e]">
                      Search request ready
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      The entered details are ready to be sent to the NLAS
                      backend for parcel verification and record retrieval.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-5 text-xs leading-5 text-slate-400">
              Final search results will be retrieved from the authorised backend
              database and public land record integrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#174b73]">
        <Icon size={20} />
      </div>

      <div>
        <h4 className="text-sm font-bold text-[#10243e]">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
} 