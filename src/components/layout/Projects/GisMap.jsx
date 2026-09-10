import { Map, MapPin } from "lucide-react";

export default function GISMap({
  projectId,
  onParcelSelect,
}) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:40px_40px] bg-[position:0_0,0_20px,20px_-20px,-20px_0px]" />

      {/* Map header */}
      <div className="absolute left-4 top-4 z-10 rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <Map size={18} className="text-slate-700" />

          <div>
            <p className="text-sm font-bold text-slate-900">
              GIS Parcel Map
            </p>

            <p className="text-xs text-slate-500">
              Project: {projectId}
            </p>
          </div>
        </div>
      </div>

      {/* Demo parcel markers */}
      <button
        type="button"
        onClick={() => onParcelSelect?.("demo-parcel-001")}
        className="absolute left-[30%] top-[35%] z-10 rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:scale-110"
        title="Select parcel"
      >
        <MapPin size={18} />
      </button>

      <button
        type="button"
        onClick={() => onParcelSelect?.("demo-parcel-002")}
        className="absolute left-[55%] top-[50%] z-10 rounded-full bg-blue-600 p-2 text-white shadow-lg transition hover:scale-110"
        title="Select parcel"
      >
        <MapPin size={18} />
      </button>

      <button
        type="button"
        onClick={() => onParcelSelect?.("demo-parcel-003")}
        className="absolute left-[70%] top-[30%] z-10 rounded-full bg-emerald-600 p-2 text-white shadow-lg transition hover:scale-110"
        title="Select parcel"
      >
        <MapPin size={18} />
      </button>

      {/* Bottom info */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            GIS Status
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            Parcel intelligence ready
          </p>
        </div>

        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          Demo Map
        </span>
      </div>
    </div>
  );
}