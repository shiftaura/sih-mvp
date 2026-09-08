import {
  ArrowRight,
  Bell,
  CalendarDays,
  FileText,
  Megaphone,
} from "lucide-react";

const updates = [
  {
    category: "Statutory Notice",
    date: "Recent Update",
    title: "Acquisition notifications and statutory records",
    description:
      "Published notifications and project-linked statutory information can be accessed through the public registry.",
    icon: FileText,
  },
  {
    category: "Project Update",
    date: "Monitoring",
    title: "National infrastructure project monitoring",
    description:
      "Project progress, acquisition stages and milestone information are presented through the unified monitoring interface.",
    icon: Bell,
  },
  {
    category: "Public Notice",
    date: "Information",
    title: "Citizen access and public transparency services",
    description:
      "Public users can access eligible project, parcel, compensation and objection-related information.",
    icon: Megaphone,
  },
];

export default function LatestUpdates() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
              <Bell size={15} />
              Latest Updates
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
              Notices & Public Updates
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Stay informed about statutory notifications, project monitoring
              updates and public-facing services.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#174b73] transition hover:text-[#10243e]"
          >
            View All Updates
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Update Cards */}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {updates.map((update) => {
            const Icon = update.icon;

            return (
              <article
                key={update.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                {/* Top */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#174b73]">
                    <Icon size={20} />
                  </div>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {update.category}
                  </span>
                </div>

                {/* Date */}

                <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <CalendarDays size={14} />
                  {update.date}
                </div>

                {/* Content */}

                <h3 className="mt-3 text-lg font-bold leading-7 text-[#10243e]">
                  {update.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {update.description}
                </p>

                {/* Action */}

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#174b73] transition group-hover:text-[#c25a16]"
                >
                  Read Update
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </article>
            );
          })}
        </div>

        {/* Backend Data Notice */}

        <div className="mt-8 rounded-xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-xs leading-5 text-slate-400">
            Current entries are representative frontend content for the UI.
            In production, notices and updates will be fetched from the NLAS
            backend with their publication date, category, title, content and
            linked project/record information.
          </p>
        </div>
      </div>
    </section>
  );
}