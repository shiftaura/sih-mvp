import {
  ArrowRight,
  Building2,
  CalendarDays,
  MapPin,
  Route,
} from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "PRJ-001",
    title: "National Expressway Corridor",
    type: "Highway Infrastructure",
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    progress: 68,
    status: "UNDER SCRUTINY",
    targetDate: "Dec 2026",
    area: "—",
  },
  {
    id: "PRJ-002",
    title: "Regional Logistics Connectivity Project",
    type: "Transport Infrastructure",
    state: "Maharashtra",
    district: "Nagpur",
    progress: 54,
    status: "COMPENSATION",
    targetDate: "Mar 2027",
    area: "—",
  },
  {
    id: "PRJ-003",
    title: "Strategic Industrial Access Corridor",
    type: "Industrial Infrastructure",
    state: "Rajasthan",
    district: "Jaipur",
    progress: 81,
    status: "POSSESSION",
    targetDate: "Nov 2026",
    area: "—",
  },
];

export default function ProjectShowcase() {
  return (
    <section
      id="projects"
      className="bg-[#f8fafc] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
              <Building2 size={15} />
              Project Registry
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
              Monitored Infrastructure Projects
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Track land acquisition progress across major public
              infrastructure projects through a unified national registry.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#102f50] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#173f69]"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* =====================================================
            PROJECT CARDS
        ===================================================== */}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
            >
              {/* =============================================
                  CARD TOP
              ============================================= */}

              <div className="border-b border-slate-100 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#174b73]">
                    <Route size={21} />
                  </div>

                  <StatusBadge status={project.status} />
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {project.id}
                  </p>

                  <h3 className="mt-2 text-lg font-bold leading-6 text-[#10243e]">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {project.type}
                  </p>
                </div>
              </div>

              {/* =============================================
                  LOCATION / INFO
              ============================================= */}

              <div className="p-6">
                <div className="space-y-3">
                  <InfoRow
                    icon={MapPin}
                    label="Location"
                    value={`${project.district}, ${project.state}`}
                  />

                  <InfoRow
                    icon={CalendarDays}
                    label="Target"
                    value={project.targetDate}
                  />

                  <InfoRow
                    icon={Building2}
                    label="Required Area"
                    value={project.area}
                  />
                </div>

                {/* =============================================
                    PROGRESS
                ============================================= */}

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Acquisition Progress
                    </p>

                    <span className="text-sm font-bold text-[#174b73]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#174b73] transition-all duration-500"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* =============================================
                    CTA
                ============================================= */}

                <Link
                  to={`/projects/${project.id}`}
                  className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-[#174b73] transition group-hover:text-[#c25a16]"
                >
                  View Project Details

                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            DEMO NOTE
        ===================================================== */}

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3">
          <p className="text-xs leading-5 text-slate-500">
            Projects shown in this section are representative frontend records
            for UI development. Final project names, locations, progress,
            status, land area and target dates will come from the NLAS backend
            project registry.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   INFO ROW
============================================================= */

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ status }) {
  const classes = {
    "UNDER SCRUTINY":
      "border-blue-200 bg-blue-50 text-blue-700",

    COMPENSATION:
      "border-orange-200 bg-orange-50 text-orange-700",

    POSSESSION:
      "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
        classes[status] ||
        "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}