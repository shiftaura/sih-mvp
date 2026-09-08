import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Gavel,
  MapPinned,
  RefreshCw,
} from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Requisition",
    description:
      "Project requirement and land requisition are initiated with the required project information.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Cadastral Sync",
    description:
      "Land parcels and cadastral information are mapped to establish parcel-level visibility.",
    icon: MapPinned,
  },
  {
    number: "03",
    title: "Statutory Scrutiny",
    description:
      "Notifications, objections and statutory checks are monitored through the acquisition workflow.",
    icon: Gavel,
  },
  {
    number: "04",
    title: "Compensation & R&R",
    description:
      "Compensation assessment, payment progress and rehabilitation and resettlement are tracked.",
    icon: RefreshCw,
  },
  {
    number: "05",
    title: "Final Handover",
    description:
      "Possession and final project closure are monitored before the acquisition lifecycle is completed.",
    icon: CheckCircle2,
  },
];

export default function AcquisitionLifecycle() {
  return (
    <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
            <RefreshCw size={15} />
            Acquisition Lifecycle
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
            One Workflow. Every Stage. Fully Monitored.
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            NLAS provides a unified view of the land acquisition lifecycle,
            from initial requisition through compensation, rehabilitation,
            resettlement and final handover.
          </p>
        </div>

        {/* Lifecycle */}

        <div className="relative mt-14">

          {/* Connecting Line */}

          <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-slate-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage) => {
              const Icon = stage.icon;

              return (
                <div
                  key={stage.number}
                  className="group relative text-center"
                >
                  {/* Icon */}

                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition duration-200 group-hover:border-[#174b73] group-hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-[#174b73] transition group-hover:bg-[#174b73] group-hover:text-white">
                      <Icon size={21} />
                    </div>
                  </div>

                  {/* Number */}

                  <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#c25a16]">
                    Stage {stage.number}
                  </div>

                  {/* Title */}

                  <h3 className="mt-2 text-base font-bold text-[#10243e]">
                    {stage.title}
                  </h3>

                  {/* Description */}

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Information */}

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.5fr_1fr]">

          {/* Main Card */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#174b73] shadow-sm">
                <MapPinned size={20} />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#10243e]">
                  Parcel-level monitoring throughout the lifecycle
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Each acquisition stage can be associated with project,
                  parcel, compensation and rehabilitation information,
                  providing a connected view of progress and pending actions.
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Model */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Workflow Model
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <WorkflowBadge text="Track" />
              <ArrowRight size={15} className="text-slate-300" />

              <WorkflowBadge text="Verify" />
              <ArrowRight size={15} className="text-slate-300" />

              <WorkflowBadge text="Act" />
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Current project stage, milestones and next actions will be
              supplied dynamically by the backend for monitored projects.
            </p>
          </div>
        </div>

        {/* Data Note */}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-xs leading-5 text-slate-400">
            The lifecycle shown here represents the frontend workflow model.
            Actual project status, completed stages, pending milestones and
            next actions will come from the NLAS backend.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkflowBadge({ text }) {
  return (
    <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
      {text}
    </span>
  );
}