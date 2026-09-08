import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import nlasLogo from "../../../assets/nlas-logo.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Branding */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-[#eef3f9] p-1">
            <img
              src={nlasLogo}
              alt="NLAS Government Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Government of India
            </p>

            <p className="text-sm font-bold tracking-tight text-[#102f52]">
              NLAS
            </p>

            <p className="hidden text-[9px] text-slate-500 sm:block">
              National Land Acquisition & Management System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          <a
            href="#monitoring"
            className="text-xs font-medium text-slate-600 transition hover:text-[#12345b]"
          >
            National Monitoring
          </a>

          <a
            href="#projects"
            className="text-xs font-medium text-slate-600 transition hover:text-[#12345b]"
          >
            Projects
          </a>

          <a
            href="#transparency"
            className="text-xs font-medium text-slate-600 transition hover:text-[#12345b]"
          >
            Transparency
          </a>

          <a
            href="#services"
            className="text-xs font-medium text-slate-600 transition hover:text-[#12345b]"
          >
            Services
          </a>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-6">

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <Search size={17} />
            </button>

            {/* Portal Login */}
            <Link
              to="/login"
              className="rounded-md bg-[#12345b] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d2948]"
            >
              Portal Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">

            <a
              href="#monitoring"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              National Monitoring
            </a>

            <a
              href="#projects"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Projects
            </a>

            <a
              href="#transparency"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Transparency
            </a>

            <a
              href="#services"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Services
            </a>

            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-[#12345b] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0d2948]"
            >
              Portal Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}