import { useState } from "react";
import {
  ArrowRight,
  FileCheck2,
  FileText,
  IndianRupee,
  MapPin,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

const transparencyFeatures = [
  {
    icon: MapPin,
    title: "Real-Time Stage Tracking",
    description:
      "Track the current statutory and acquisition stage of a project or land parcel through a unified public interface.",
    action: "Track Project",
    href: "/projects",
  },
  {
    icon: FileText,
    title: "Official Gazette Archive",
    description:
      "Access publicly available statutory notifications and acquisition records associated with notified projects.",
    action: "View Records",
    href: "/projects",
  },
  {
    icon: IndianRupee,
    title: "Compensation Ledger",
    description:
      "View eligible compensation status and payment-related information exposed through the public transparency layer.",
    action: "Check Status",
    href: "/projects",
  },
  {
    icon: FileCheck2,
    title: "Section 15 Objections",
    description:
      "Understand objection status and related statutory proceedings for eligible acquisition records.",
    action: "View Objections",
    href: "/projects",
  },
];

const TransparencySection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) {
      setError("Please enter a project code, parcel ID, or Khasra number.");
      setShowResult(false);
      return;
    }

    setError("");
    setShowResult(true);
  };

  const closeResult = () => {
    setShowResult(false);
    setSearchValue("");
    setError("");
  };

  return (
    <section
      id="transparency"
      className="border-y border-slate-200 bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            Public Transparency
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Transparent by Design
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Public-facing information is organised around projects, parcels,
            statutory records, compensation and objections for easier
            monitoring and access.
          </p>
        </div>

        {/* Public Search */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Search className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-950">
                    Public Project / Parcel Search
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Search using a project code, parcel ID or Khasra number.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSearch} className="p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                      if (error) setError("");
                      if (showResult) setShowResult(false);
                    }}
                    placeholder="Project code / Parcel ID / Khasra number"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#17233c] px-6 text-sm font-semibold text-white transition hover:bg-[#101a2d] active:scale-[0.99]"
                >
                  Search
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {error && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Public search results will be supplied by the NLAS backend and
                will only expose information permitted for public access.
              </p>
            </form>

            {/* Demo Search Result */}
            {showResult && (
              <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Search Result
                    </p>

                    <h4 className="mt-1 font-semibold text-slate-950">
                      Public record preview
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={closeResult}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
                    aria-label="Close search result"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <ResultItem label="Search Reference" value={searchValue} />
                  <ResultItem label="Record Status" value="Backend Pending" />
                  <ResultItem
                    label="Data Source"
                    value="NLAS Public Registry"
                  />
                </div>

                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-xs leading-5 text-amber-800">
                    This is a frontend demonstration state. Final parcel and
                    project information will be fetched from the backend API.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {transparencyFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-200">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-base font-semibold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

                <a
                  href={feature.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
                >
                  {feature.action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Information */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Citizen-first access to acquisition information
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Public information remains separate from restricted officer
              workflows and administrative controls.
            </p>
          </div>

          <a
            href="/projects"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Explore Registry
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ResultItem = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
};

export default TransparencySection;