import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  LandPlot,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getProjectById } from "../services/projectApi";
import { getWorkflow } from "../services/workflowApi";
import WorkflowTimeline from "../components/layout/Projects/WorkflowTimeline";
import GISMap from "../components/layout/Projects/GISMap";
import ParcelDrawer from "../components/layout/Projects/ParcelDrawer";
export default function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [workflow, setWorkflow] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");

      const [projectResponse, workflowResponse] = await Promise.all([
        getProjectById(id),
        getWorkflow(id),
      ]);

      if (!projectResponse?.success) {
        throw new Error(
          projectResponse?.error?.message || "Failed to load project"
        );
      }

      if (!workflowResponse?.success) {
        throw new Error(
          workflowResponse?.error?.message || "Failed to load workflow"
        );
      }

      setProject(projectResponse.data);
      setWorkflow(workflowResponse.data);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.message ||
          "Unable to load project"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleWorkflowUpdate = async () => {
    await loadProject();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-700" />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-500" />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Unable to load project
          </h2>

          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <button
            type="button"
            onClick={loadProject}
            className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Project not found.</p>
      </div>
    );
  }

  const projectId = project.id || project.projectId;

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "gis",
      label: "GIS",
    },
    {
      id: "compensation",
      label: "Compensation",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-600">
                  {project.projectCode || project.code || projectId}
                </span>

                <StatusBadge status={project.status} />
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {project.name || project.projectName}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {project.type || "Land Acquisition Project"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniInfo
                icon={MapPin}
                label="State"
                value={project.state || "—"}
              />

              <MiniInfo
                icon={Building2}
                label="District"
                value={project.district || "—"}
              />

              <MiniInfo
                icon={Users}
                label="Families"
                value={project.affectedFamilies ?? "—"}
              />

              <MiniInfo
                icon={CalendarDays}
                label="Target"
                value={formatDate(project.targetDate)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            icon={LandPlot}
            title="Required Area"
            value={`${project.requiredArea ?? 0} Ha`}
          />

          <StatCard
            icon={CheckCircle2}
            title="Acquired Area"
            value={`${project.acquiredArea ?? 0} Ha`}
          />

          <StatCard
            icon={LandPlot}
            title="Acquisition"
            value={`${project.acquisitionPercentage ?? 0}%`}
          />

          <StatCard
            icon={Users}
            title="Affected Families"
            value={project.affectedFamilies ?? 0}
          />

          <StatCard
            icon={AlertTriangle}
            title="Open Objections"
            value={project.openObjections ?? 0}
          />
        </section>

        {/* ================= TABS ================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex overflow-x-auto border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-5 py-3.5 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ================= OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="p-5">
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Project Summary */}
                <div className="xl:col-span-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-slate-600" />

                      <h2 className="font-bold text-slate-900">
                        Project Summary
                      </h2>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <DetailItem
                        label="Project Name"
                        value={project.name || project.projectName || "—"}
                      />

                      <DetailItem
                        label="Project Code"
                        value={project.projectCode || project.code || "—"}
                      />

                      <DetailItem
                        label="Department"
                        value={project.department || "—"}
                      />

                      <DetailItem
                        label="Project Type"
                        value={project.type || "—"}
                      />

                      <DetailItem
                        label="State"
                        value={project.state || "—"}
                      />

                      <DetailItem
                        label="District"
                        value={project.district || "—"}
                      />

                      <DetailItem
                        label="Required Area"
                        value={`${project.requiredArea ?? 0} Ha`}
                      />

                      <DetailItem
                        label="Target Completion"
                        value={formatDate(project.targetDate)}
                      />
                    </div>
                  </div>
                </div>

                {/* Current Milestone */}
                <div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Current Milestone
                    </p>

                    <div className="mt-3">
                      <StatusBadge
                        status={workflow?.currentStatus || project.status}
                      />
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      The project is currently in the{" "}
                      <span className="font-semibold text-slate-900">
                        {formatStatus(
                          workflow?.currentStatus || project.status
                        )}
                      </span>{" "}
                      stage of the acquisition lifecycle.
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= WORKFLOW ================= */}
              <div className="mt-6">
                <WorkflowTimeline
                  projectId={projectId}
                  workflow={workflow}
                  onTransitionSuccess={handleWorkflowUpdate}
                />
              </div>
            </div>
          )}

          {/* ================= GIS ================= */}
          {activeTab === "gis" && (
            <div className="p-5">
              <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <LandPlot className="mx-auto h-12 w-12 text-slate-400" />

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    GIS Parcel Map
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    GIS integration will load parcel geometry for this
                    project using the backend GIS API.
                  </p>

                  <p className="mt-3 font-mono text-xs text-slate-400">
                    Project ID: {projectId}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= COMPENSATION ================= */}
          {activeTab === "compensation" && (
            <div className="p-5">
              <div className="grid min-h-[420px] place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <IndianRupee className="mx-auto h-12 w-12 text-slate-400" />

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    Compensation Module
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Compensation summary, parcel-wise records and payment
                    actions will be connected here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
          <Icon className="h-4.5 w-4.5 text-slate-600" />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">{title}</p>

      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function MiniInfo({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-slate-400" />

        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>

      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    DRAFT: "bg-slate-100 text-slate-700",
    SUBMITTED: "bg-blue-50 text-blue-700",
    UNDER_SCRUTINY: "bg-amber-50 text-amber-700",
    APPROVED: "bg-emerald-50 text-emerald-700",
    NOTIFICATION: "bg-purple-50 text-purple-700",
    AWARD: "bg-indigo-50 text-indigo-700",
    COMPENSATION: "bg-orange-50 text-orange-700",
    POSSESSION: "bg-cyan-50 text-cyan-700",
    "R&R": "bg-pink-50 text-pink-700",
    CLOSED: "bg-emerald-100 text-emerald-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(status) {
  if (!status) return "Unknown";

  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    
  });
}