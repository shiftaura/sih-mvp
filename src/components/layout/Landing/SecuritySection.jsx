import {
  CheckCircle2,
  Database,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const securityPoints = [
  {
    icon: LockKeyhole,
    title: "Role-Based Access",
    description:
      "Administrative and officer workflows are separated through role-based access controls.",
  },
  {
    icon: KeyRound,
    title: "Secure Authentication",
    description:
      "Officer access is protected through authenticated sessions and controlled portal access.",
  },
  {
    icon: Database,
    title: "Controlled Data Access",
    description:
      "Project, parcel and statutory information is exposed according to applicable access permissions.",
  },
  {
    icon: ShieldCheck,
    title: "Audit Visibility",
    description:
      "Administrative actions can be recorded through the system audit trail for accountable monitoring.",
  },
];

export default function SecuritySection() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
            <ShieldCheck size={15} />
            Security & Governance
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
            Built for Secure Digital Governance
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            NLAS is designed around controlled access, accountable workflows
            and secure handling of land acquisition information.
          </p>
        </div>

        {/* Security Grid */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {securityPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#174b73] shadow-sm">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-base font-bold text-[#10243e]">
                  {point.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Governance Panel */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-[#102f50]">
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            {/* Main */}

            <div className="p-7 sm:p-9">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-200">
                <ShieldCheck size={15} />
                Governance Architecture
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Controlled access. Traceable actions.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                The platform separates public information from restricted
                officer operations while maintaining role-aware workflows and
                auditable administrative activity.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <GovernanceItem text="Role-aware officer interface" />
                <GovernanceItem text="Protected administrative workflows" />
                <GovernanceItem text="Project-level access boundaries" />
                <GovernanceItem text="Audit-ready activity records" />
              </div>
            </div>

            {/* Side Panel */}

            <div className="border-t border-white/10 bg-white/5 p-7 sm:p-9 lg:border-l lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                Security Principle
              </p>

              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                    <LockKeyhole size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Least-Privilege Access
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Access according to role and responsibility
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                  <Database size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Backend-Controlled Data
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Production data is supplied by authorised APIs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-xs leading-5 text-amber-800">
            Security controls, certifications, hosting arrangements and
            government integrations should only be represented as operational
            once they are actually implemented and verified in the deployed
            system.
          </p>
        </div>
      </div>
    </section>
  );
}

function GovernanceItem({ text }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-slate-300">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
      <span>{text}</span>
    </div>
  );
}