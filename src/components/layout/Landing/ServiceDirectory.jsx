import {
  ArrowRight,
  Building2,
  FileSearch,
  Gavel,
  Landmark,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Project Registry",
    description:
      "Browse monitored infrastructure projects and view publicly available acquisition progress.",
    icon: Building2,
    link: "/projects",
  },
  {
    title: "Land Parcel Search",
    description:
      "Search eligible public land records using parcel identifiers and location details.",
    icon: MapPinned,
    link: "#khasra-search",
  },
  {
    title: "Acquisition Records",
    description:
      "Access publicly available acquisition notices, records and project-linked information.",
    icon: FileSearch,
    link: "/projects",
  },
  {
    title: "Compensation Status",
    description:
      "Check publicly accessible compensation and payment-related status where applicable.",
    icon: Landmark,
    link: "/projects",
  },
  {
    title: "Objections & Proceedings",
    description:
      "View information related to statutory objections and acquisition proceedings.",
    icon: Gavel,
    link: "/projects",
  },
  {
    title: "Citizen Information",
    description:
      "Understand the land acquisition lifecycle, public services and available information.",
    icon: Users,
    link: "#transparency",
  },
];

export default function ServiceDirectory() {
  return (
    <section
      id="services"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c25a16]">
            <ShieldCheck size={15} />
            Public Services
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#10243e] sm:text-4xl">
            Access Land Acquisition Services
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            Explore public-facing services and information available through
            the National Land Acquisition System.
          </p>
        </div>

        {/* Services Grid */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#174b73] transition group-hover:bg-[#174b73] group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#c25a16]"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#10243e]">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-[#174b73]">
                  Access Service
                </div>
              </>
            );

            // Internal React route
            if (service.link.startsWith("/")) {
              return (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  {cardContent}
                </Link>
              );
            }

            // Landing page section link
            return (
              <a
                key={service.title}
                href={service.link}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                {cardContent}
              </a>
            );
          })}
        </div>

        {/* Bottom Officer Portal CTA */}

        <div className="mt-12 overflow-hidden rounded-2xl bg-[#102f50]">
          <div className="flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-200">
                <ShieldCheck size={15} />
                Authorised Access
              </div>

              <h3 className="mt-3 text-2xl font-bold text-white">
                Access the Officer Portal
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Authorised officials can sign in to access role-based
                monitoring, workflow management and administrative services.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#102f50] transition hover:bg-slate-100"
            >
              Portal Login
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Backend note */}

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Service availability and public record access will be controlled by
          the NLAS backend based on applicable permissions and published data.
        </p>
      </div>
    </section>
  );
}