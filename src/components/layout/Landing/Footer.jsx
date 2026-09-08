import {
  ArrowUpRight,
  ExternalLink,
  Landmark,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Transparency", href: "#transparency" },
  { label: "Services", href: "#services" },
];

const publicLinks = [
  { label: "Project Registry", href: "/projects" },
  { label: "Land Parcel Search", href: "#transparency" },
  { label: "Public Notices", href: "#updates" },
  { label: "Citizen Services", href: "#services" },
];

const officialLinks = [
  {
    label: "Department of Land Resources",
    href: "https://dolr.gov.in/",
  },
  {
    label: "Ministry of Rural Development",
    href: "https://rural.gov.in/",
  },
  {
    label: "Government of India",
    href: "https://www.india.gov.in/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b1728] text-white">
      {/* Tricolour line */}

      <div className="flex h-1 w-full">
        <div className="w-1/3 bg-[#e86f24]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#16834b]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer */}

        <div className="grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}

          <div>
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Landmark size={21} />
              </div>

              <div>
                <p className="text-base font-bold tracking-wide">
                  NLAS
                </p>

                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                  National Land Acquisition
                  <br />
                  & Management System
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              A unified digital platform concept for transparent monitoring,
              statutory workflows, compensation and rehabilitation &amp;
              resettlement related land acquisition processes.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
              <ShieldCheck size={14} />
              Digital Governance Platform
            </div>
          </div>

          {/* Quick Links */}

          <FooterColumn title="Quick Links">
            {quickLinks.map((link) => (
              <FooterLink
                key={link.label}
                label={link.label}
                href={link.href}
                internal
              />
            ))}
          </FooterColumn>

          {/* Public Access */}

          <FooterColumn title="Public Access">
            {publicLinks.map((link) => (
              <FooterLink
                key={link.label}
                label={link.label}
                href={link.href}
                internal
              />
            ))}
          </FooterColumn>

          {/* Contact / Official */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Official Information
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

                <p className="text-sm leading-6 text-slate-400">
                  Government of India
                  <br />
                  New Delhi, India
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

                <p className="text-sm text-slate-400">
                  Official contact details will be published here.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {officialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-white"
                >
                  {link.label}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Officer Portal Strip */}

        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Authorised Officer Access
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Restricted workflows are available only through authenticated
                role-based access.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#102f50] transition hover:bg-slate-100"
            >
              Portal Login
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} National Land Acquisition &amp;
            Management System
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button
              type="button"
              className="transition hover:text-slate-300"
            >
              Privacy
            </button>

            <button
              type="button"
              className="transition hover:text-slate-300"
            >
              Accessibility
            </button>

            <button
              type="button"
              className="transition hover:text-slate-300"
            >
              Terms of Use
            </button>
          </div>
        </div>

        {/* Demo Disclaimer */}

        <div className="border-t border-white/10 py-5">
          <p className="text-center text-[11px] leading-5 text-slate-600">
            NLAS frontend demonstration. Government ownership, hosting,
            certifications, integrations and operational status should only be
            represented after formal implementation and verification.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <div className="mt-5 space-y-3">{children}</div>
    </div>
  );
}

function FooterLink({ label, href, internal = false }) {
  const className =
    "inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white";

  if (internal) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}