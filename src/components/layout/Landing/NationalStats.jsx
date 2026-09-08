import {
  Activity,
  BarChart3,
  Building2,
  FileCheck2,
  IndianRupee,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Active Projects",
    value: "—",
    description: "Projects under active monitoring",
    icon: Building2,
  },
  {
    label: "Land Acquired",
    value: "—",
    description: "Total land acquired across projects",
    icon: BarChart3,
  },
  {
    label: "Compensation Disbursed",
    value: "—",
    description: "Compensation recorded in the system",
    icon: IndianRupee,
  },
  {
    label: "Affected Families",
    value: "—",
    description: "Families covered under R&R monitoring",
    icon: Users,
  },
  {
    label: "Statutory Compliance",
    value: "—",
    description: "Compliance status across monitored projects",
    icon: FileCheck2,
  },
];

export default function NationalStats() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        {/* Section Heading */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
              <Activity size={15} />
              National Monitoring Overview
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#10243e] sm:text-3xl">
              Land Acquisition at a Glance
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              A unified view of projects, land acquisition, compensation and
              rehabilitation activity monitored through the NLAS platform.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
            <p className="text-xs font-medium text-slate-500">
              Platform Status
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-sm font-semibold text-slate-700">
                Monitoring Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                {/* Icon */}

                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#174b73] transition group-hover:bg-blue-50">
                    <Icon size={21} />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    NLAS
                  </span>
                </div>

                {/* Value */}

                <div className="mt-5">
                  <p className="text-3xl font-bold tracking-tight text-[#10243e]">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data note */}

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
          <FileCheck2
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <p className="text-xs leading-5 text-slate-500">
            National statistics will be populated from the NLAS backend once
            the production API is connected. No production figures are
            hardcoded in the public portal.
          </p>
        </div>
      </div>
    </section>
  );
}