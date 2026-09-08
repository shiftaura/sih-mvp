import {
  Accessibility,
  Globe2,
  Landmark,
} from "lucide-react";

export default function GovernmentBar() {
  return (
    <>
      <div className="bg-[#0b1728] text-white">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 text-xs sm:px-6 lg:px-8">

          {/* Government Identity */}

          <div className="flex items-center gap-2">
            <Landmark className="h-3.5 w-3.5 text-slate-300" />

            <span className="font-medium text-slate-200">
              Government of India
            </span>

            <span className="hidden text-slate-500 sm:inline">
              |
            </span>

            <span className="hidden text-slate-400 sm:inline">
              Department of Land Resources
            </span>
          </div>

          {/* Utility Links */}

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="hidden items-center gap-1.5 text-slate-300 transition hover:text-white sm:flex"
            >
              <Accessibility className="h-3.5 w-3.5" />
              Accessibility
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 text-slate-300 transition hover:text-white"
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tricolour Government Identity Line */}

      <div className="flex h-1 w-full">
        <div className="w-1/3 bg-[#e86f24]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#16834b]" />
      </div>
    </>
  );
}