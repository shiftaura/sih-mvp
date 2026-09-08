import {
  Activity,
  ArrowRight,
  Layers3,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

const states = [
  {
    name: "Uttar Pradesh",
    projects: 18,
    progress: 72,
  },
  {
    name: "Maharashtra",
    projects: 14,
    progress: 64,
  },
  {
    name: "Rajasthan",
    projects: 11,
    progress: 58,
  },
  {
    name: "Madhya Pradesh",
    projects: 9,
    progress: 67,
  },
  {
    name: "Haryana",
    projects: 7,
    progress: 81,
  },
];

const mapPoints = [
  {
    id: 1,
    top: "27%",
    left: "39%",
    label: "North Region",
    status: "Active",
  },
  {
    id: 2,
    top: "39%",
    left: "55%",
    label: "Central Region",
    status: "Monitoring",
  },
  {
    id: 3,
    top: "59%",
    left: "42%",
    label: "Western Region",
    status: "Active",
  },
  {
    id: 4,
    top: "69%",
    left: "62%",
    label: "Southern Region",
    status: "Monitoring",
  },
  {
    id: 5,
    top: "45%",
    left: "70%",
    label: "Eastern Region",
    status: "Active",
  },
];

export default function NationalMonitoring() {
  return (
    <section
      id="monitoring"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
              <Activity size={15} />

              National Monitoring
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
              Monitor Acquisition Across India
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              A national monitoring view designed to provide an overview of
              project activity, acquisition progress and parcel-level
              geospatial information.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#174b73] transition hover:border-[#174b73] hover:bg-slate-50"
          >
            View Project Registry

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* =====================================================
            MAIN MONITORING PANEL
        ===================================================== */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fafc] shadow-sm">
          <div className="grid lg:grid-cols-[1.5fr_0.8fr]">
            {/* =================================================
                MAP PANEL
            ================================================= */}

            <div className="relative min-h-[520px] overflow-hidden border-b border-slate-200 bg-[#eaf1f5] lg:border-b-0 lg:border-r">
              {/* Map toolbar */}

              <div className="absolute left-5 right-5 top-5 z-20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-4 py-3 shadow-md backdrop-blur">
                  <Map size={17} className="text-[#174b73]" />

                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      National GIS View
                    </p>

                    <p className="text-[11px] text-slate-400">
                      Representative visualization
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/95 text-slate-600 shadow-md transition hover:bg-white"
                  aria-label="Map layers"
                >
                  <Layers3 size={18} />
                </button>
              </div>

              {/* =================================================
                  ABSTRACT MAP
              ================================================= */}

              <div className="absolute inset-0">
                {/* Grid */}

                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(#c6d3dc 1px, transparent 1px), linear-gradient(90deg, #c6d3dc 1px, transparent 1px)",
                    backgroundSize: "38px 38px",
                  }}
                />

                {/* Roads / routes */}

                <div className="absolute left-[12%] top-[35%] h-px w-[72%] rotate-[13deg] bg-slate-300" />

                <div className="absolute left-[22%] top-[58%] h-px w-[63%] rotate-[-18deg] bg-slate-300" />

                <div className="absolute left-[35%] top-[20%] h-[65%] w-px rotate-[12deg] bg-slate-300" />

                <div className="absolute left-[62%] top-[15%] h-[70%] w-px rotate-[-20deg] bg-slate-300" />

                {/* Abstract India landmass */}

                <div className="absolute left-1/2 top-1/2 h-[360px] w-[280px] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] rounded-[46%_48%_52%_43%] border-2 border-[#8ba1b1] bg-[#d5e1e7] shadow-inner">
                  <div className="absolute left-[17%] top-[21%] h-16 w-20 rounded-[55%_40%_50%_45%] bg-[#c8d8e0]" />

                  <div className="absolute right-[8%] top-[33%] h-20 w-16 rounded-[45%_55%_45%_50%] bg-[#c8d8e0]" />

                  <div className="absolute bottom-[18%] left-[29%] h-24 w-20 rounded-[55%_45%_50%_45%] bg-[#c8d8e0]" />
                </div>

                {/* Map markers */}

                {mapPoints.map((point) => (
                  <div
                    key={point.id}
                    className="absolute z-10"
                    style={{
                      top: point.top,
                      left: point.left,
                    }}
                  >
                    <div className="group relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#c25a16] shadow-lg">
                        <MapPin
                          size={14}
                          className="text-white"
                          fill="currentColor"
                        />
                      </div>

                      {/* Tooltip */}

                      <div className="pointer-events-none absolute bottom-10 left-1/2 hidden w-36 -translate-x-1/2 rounded-lg bg-[#10243e] px-3 py-2 text-white shadow-xl group-hover:block">
                        <p className="text-xs font-semibold">
                          {point.label}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-300">
                          {point.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map legend */}

                <div className="absolute bottom-5 left-5 rounded-xl border border-white/80 bg-white/95 p-4 shadow-md backdrop-blur">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Monitoring Status
                  </p>

                  <div className="space-y-2">
                    <LegendItem
                      label="Active Project"
                      type="orange"
                    />

                    <LegendItem
                      label="Monitoring Region"
                      type="blue"
                    />
                  </div>
                </div>

                {/* Search overlay */}

                <div className="absolute bottom-5 right-5 hidden sm:block">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-4 py-3 text-sm font-semibold text-slate-700 shadow-md backdrop-blur transition hover:bg-white"
                  >
                    <Search size={16} />

                    Search map
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                STATE MONITORING PANEL
            ================================================= */}

            <div className="bg-white p-6 sm:p-7">
              {/* Panel header */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Regional Overview
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#10243e]">
                    State Monitoring
                  </h3>
                </div>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                  aria-label="Filter states"
                >
                  <SlidersHorizontal size={17} />
                </button>
              </div>

              {/* State list */}

              <div className="mt-7 space-y-5">
                {states.map((state) => (
                  <div key={state.name}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {state.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {state.projects} monitored projects
                        </p>
                      </div>

                      <span className="text-sm font-bold text-[#174b73]">
                        {state.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#174b73] transition-all"
                        style={{
                          width: `${state.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}

              <div className="my-7 border-t border-slate-200" />

              {/* Quick stats */}

              <div className="grid grid-cols-2 gap-3">
                <QuickStat
                  label="Regions"
                  value="—"
                />

                <QuickStat
                  label="Projects"
                  value="—"
                />

                <QuickStat
                  label="Parcels"
                  value="—"
                />

                <QuickStat
                  label="Milestones"
                  value="—"
                />
              </div>

              {/* CTA */}

              <Link
                to="/projects"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#102f50] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#173f69]"
              >
                Open Monitoring Registry

                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* 
            DATA NOTE
         */}

        <div className="mt-4 flex items-start gap-2 px-1">
          <Activity
            size={14}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <p className="text-xs leading-5 text-slate-400">
            The map and regional figures shown here are representative
            frontend visualizations for the current UI build. Production
            project, parcel and state-level monitoring data will be supplied
            through the NLAS backend API.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 
   LEGEND ITEM
 */

function LegendItem({ label, type }) {
  const dotClass =
    type === "orange"
      ? "bg-[#c25a16]"
      : "bg-[#174b73]";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${dotClass}`}
      />

      <span className="text-xs font-medium text-slate-600">
        {label}
      </span>
    </div>
  );
}

/* 
   QUICK STAT
 */

function QuickStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-[#10243e]">
        {value}
      </p>
    </div>
  );
}