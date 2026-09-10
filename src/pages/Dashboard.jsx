import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  IndianRupee,
  LandPlot,
  Loader2,
  Users,
} from "lucide-react";

import { getDashboardAnalytics } from "../services/analyticsApi";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardAnalytics();

      if (!response?.success) {
        throw new Error(
          response?.error?.message || "Failed to load dashboard"
        );
      }

      setDashboard(response.data);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.message ||
          "Unable to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />

            <div>
              <h2 className="font-semibold text-red-800">
                Unable to load dashboard
              </h2>

              <p className="mt-1 text-sm text-red-700">{error}</p>

              <button
                onClick={loadDashboard}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const kpis = dashboard?.kpis || {};
  const risk = dashboard?.risk || {};

  const stats = [
    {
      title: "Total Projects",
      value: kpis.projects ?? 0,
      icon: Building2,
    },
    {
      title: "Land Proposed",
      value: `${kpis.landProposed ?? 0} Ha`,
      icon: LandPlot,
    },
    {
      title: "Land Acquired",
      value: `${kpis.landAcquired ?? 0} Ha`,
      icon: CheckCircle2,
    },
    {
      title: "Acquisition",
      value: `${kpis.acquisitionPercentage ?? 0}%`,
      icon: LandPlot,
    },
    {
      title: "Compensation Assessed",
      value: formatCurrency(kpis.compensationAssessed),
      icon: IndianRupee,
    },
    {
      title: "Compensation Disbursed",
      value: formatCurrency(kpis.compensationDisbursed),
      icon: IndianRupee,
    },
    {
      title: "Affected Families",
      value: kpis.affectedFamilies ?? 0,
      icon: Users,
    },
    {
      title: "R&R Progress",
      value: `${kpis.rnrPercentage ?? 0}%`,
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            National Monitoring
          </p>

          <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Real-time overview of land acquisition and project progress.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              className="w-fit rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-100 p-3">
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Section */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <RiskCard
            title="Critical Projects"
            value={risk.criticalProjects ?? 0}
            description="Projects requiring immediate attention"
          />

          <RiskCard
            title="High Risk Projects"
            value={risk.highRiskProjects ?? 0}
            description="Projects requiring monitoring"
          />

          <RiskCard
            title="Delayed Milestones"
            value={risk.delayedMilestones ?? 0}
            description="Milestones currently behind schedule"
          />
        </div>

        {/* Data sections */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

          <DataPanel
            title="State-wise Acquisition"
            data={dashboard?.stateWiseAcquisition}
            labelKey="state"
          />

          <DataPanel
            title="Project Progress"
            data={dashboard?.projectProgress}
            labelKey="projectName"
          />

          <DataPanel
            title="Compensation"
            data={dashboard?.compensation}
            labelKey="label"
          />

          <DataPanel
            title="R&R Progress"
            data={dashboard?.rnr}
            labelKey="label"
          />
        </div>

        {/* Delayed Projects */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Delayed Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Projects requiring attention due to delayed milestones.
            </p>
          </div>

          {dashboard?.delayedProjects?.length ? (
            <div className="divide-y divide-slate-100">
              {dashboard.delayedProjects.map((project, index) => (
                <div
                  key={project.projectId || index}
                  className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {project.projectName || "Unnamed Project"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {project.projectCode || project.projectId || "—"}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    Delayed
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center text-sm text-slate-500">
              No delayed projects.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RiskCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{title}</p>

        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function DataPanel({ title, data, labelKey }) {
  const items = Array.isArray(data) ? data : [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">{title}</h2>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          No data available.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {items.slice(0, 6).map((item, index) => (
            <div
              key={item.id || item.projectId || item.state || index}
              className="flex items-center justify-between gap-4 px-5 py-3"
            >
              <span className="truncate text-sm text-slate-700">
                {item[labelKey] || item.name || "—"}
              </span>

              <span className="shrink-0 text-sm font-semibold text-slate-900">
                {item.percentage ??
                  item.acquisitionPercentage ??
                  item.progress ??
                  item.value ??
                  "—"}
                {typeof (
                  item.percentage ??
                  item.acquisitionPercentage ??
                  item.progress
                ) === "number"
                  ? "%"
                  : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === "") {
    return "₹0";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "₹0";
  }

  // API monetary values are handled as INR amounts here.
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericValue);
}