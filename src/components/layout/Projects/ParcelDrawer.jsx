import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  UserRound,
  Users,
  FileText,
  IndianRupee,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { getParcelById } from "../../../services/parcelApi";

export default function ParcelDrawer({
  parcelId,
  onClose,
}) {
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!parcelId) {
      setParcel(null);
      return;
    }

    const loadParcel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getParcelById(parcelId);

        if (!response?.success) {
          throw new Error(
            response?.error?.message || "Unable to load parcel details."
          );
        }

        setParcel(response.data);
      } catch (err) {
        setError(
          err?.response?.data?.error?.message ||
            err?.message ||
            "Unable to load parcel details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadParcel();
  }, [parcelId]);

  if (!parcelId) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Mobile backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/30 pointer-events-auto"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Selected Parcel
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {parcel?.parcelCode || parcelId}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close parcel drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto animate-spin text-slate-600" size={28} />

              <p className="mt-3 text-sm text-slate-500">
                Loading parcel details...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="w-full rounded-xl border border-red-200 bg-red-50 p-5 text-center">
              <AlertTriangle className="mx-auto text-red-600" size={28} />

              <h3 className="mt-3 font-semibold text-red-900">
                Unable to load parcel
              </h3>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && parcel && (
          <>
            {/* Basic info */}
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem
                  label="Survey / Khasra No."
                  value={parcel.surveyNumber}
                />

                <InfoItem
                  label="Area"
                  value={
                    parcel.area !== undefined && parcel.area !== null
                      ? `${parcel.area}`
                      : "—"
                  }
                />

                <InfoItem
                  label="Village"
                  value={parcel.village}
                />

                <InfoItem
                  label="District"
                  value={parcel.district}
                />
              </div>

              <div className="mt-4">
                <StatusBadge status={parcel.status} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 px-5">
              {[
                ["overview", "Overview"],
                ["compensation", "Compensation"],
                ["rnr", "R&R"],
                ["documents", "Documents"],
                ["objections", "Objections"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value)}
                  className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition ${
                    activeTab === value
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {activeTab === "overview" && (
                <OverviewTab parcel={parcel} />
              )}

              {activeTab === "compensation" && (
                <PlaceholderTab
                  icon={IndianRupee}
                  title="Compensation"
                  text="Compensation records for this parcel will appear here."
                />
              )}

              {activeTab === "rnr" && (
                <PlaceholderTab
                  icon={Users}
                  title="Rehabilitation & Resettlement"
                  text="R&R information for affected families will appear here."
                />
              )}

              {activeTab === "documents" && (
                <PlaceholderTab
                  icon={FileText}
                  title="Documents"
                  text="Parcel-related documents will appear here."
                />
              )}

              {activeTab === "objections" && (
                <PlaceholderTab
                  icon={AlertTriangle}
                  title="Objections"
                  text="Objections associated with this parcel will appear here."
                />
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ----------------------------- */
/* Overview */
/* ----------------------------- */

function OverviewTab({ parcel }) {
  const owners = Array.isArray(parcel.owners)
    ? parcel.owners
    : [];

  const families = Array.isArray(parcel.families)
    ? parcel.families
    : [];

  return (
    <div className="space-y-6">
      {/* Location */}
      <section>
        <SectionTitle
          icon={MapPin}
          title="Parcel Location"
        />

        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
          <DetailRow
            label="Parcel ID"
            value={parcel.id || parcel.parcelId || parcel.parcelCode}
          />

          <DetailRow
            label="Survey / Khasra"
            value={parcel.surveyNumber}
          />

          <DetailRow
            label="Village"
            value={parcel.village}
          />

          <DetailRow
            label="District"
            value={parcel.district}
          />

          <DetailRow
            label="State"
            value={parcel.state}
          />

          <DetailRow
            label="Area"
            value={
              parcel.area !== undefined && parcel.area !== null
                ? `${parcel.area}`
                : "—"
            }
          />
        </div>
      </section>

      {/* Owners */}
      <section>
        <SectionTitle
          icon={UserRound}
          title="Owners"
          count={owners.length}
        />

        <div className="mt-3 space-y-2">
          {owners.length === 0 ? (
            <EmptyMessage text="No owner information available." />
          ) : (
            owners.map((owner, index) => (
              <div
                key={owner.id || owner.ownerId || index}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="font-semibold text-slate-900">
                  {owner.name || owner.ownerName || "Owner"}
                </p>

                {owner.share !== undefined && (
                  <p className="mt-1 text-xs text-slate-500">
                    Share: {owner.share}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Families */}
      <section>
        <SectionTitle
          icon={Users}
          title="Affected Families"
          count={families.length}
        />

        <div className="mt-3 space-y-2">
          {families.length === 0 ? (
            <EmptyMessage text="No affected family information available." />
          ) : (
            families.map((family, index) => (
              <div
                key={family.id || family.familyId || index}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="font-semibold text-slate-900">
                  {family.familyCode ||
                    family.familyId ||
                    "Family"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Displacement:{" "}
                  {family.displacementStatus || "—"}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

/* ----------------------------- */
/* Small components */
/* ----------------------------- */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-900">
        {value || "—"}
      </span>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, count }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={17} className="text-slate-600" />

      <h3 className="text-sm font-bold text-slate-900">
        {title}
      </h3>

      {count !== undefined && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
          {count}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status || "UNKNOWN").toUpperCase();

  const styles = {
    ACQUIRED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    DISPUTED: "bg-red-50 text-red-700 border-red-200",
    VERIFIED: "bg-blue-50 text-blue-700 border-blue-200",
    IN_PROGRESS: "bg-indigo-50 text-indigo-700 border-indigo-200",
    UNKNOWN: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[normalized] || styles.UNKNOWN
      }`}
    >
      {normalized.replaceAll("_", " ")}
    </span>
  );
}

function PlaceholderTab({ icon: Icon, title, text }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <div className="rounded-2xl bg-slate-100 p-4">
        <Icon size={25} className="text-slate-600" />
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 max-w-xs text-sm text-slate-500">
        {text}
      </p>

      <span className="mt-4 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        Module integration pending
      </span>
    </div>
  );
}

function EmptyMessage({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}