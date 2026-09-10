import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Plus,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getProjects } from "../services/projectApi";

const STATUS_OPTIONS = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_SCRUTINY",
  "APPROVED",
  "NOTIFICATION",
  "AWARD",
  "COMPENSATION",
  "POSSESSION",
  "R&R",
  "CLOSED",
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects({
        page,
        limit: 20,
        search,
        status,
      });

      if (!response?.success) {
        throw new Error(
          response?.error?.message || "Failed to load projects"
        );
      }

      setProjects(response.data?.projects || []);

      setPagination(
        response.data?.pagination || {
          page,
          limit: 20,
          total: 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.message ||
          "Unable to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(1);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    loadProjects(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleApplyFilters = () => {
    loadProjects(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");

    setTimeout(() => {
      loadProjects(1);
    }, 0);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages || loading) return;

    loadProjects(page);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Project Registry
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Land Acquisition Projects
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor and manage registered land acquisition projects.
            </p>
          </div>

          <Link
            to="/projects/new"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">

            <form
              onSubmit={handleSearch}
              className="flex min-w-0 flex-1 gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search project name or code..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Search
              </button>
            </form>

            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={status}
                onChange={handleStatusChange}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
              >
                <option value="">All Statuses</option>

                {STATUS_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {formatStatus(item)}
                  </option>
                ))}
              </select>

              <button
                onClick={handleApplyFilters}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Apply
              </button>

              <button
                onClick={handleClearFilters}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />

              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800">
                  Unable to load projects
                </p>

                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>

              <button
                onClick={() => loadProjects(pagination.page)}
                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Project
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Progress
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Required Area
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Target Date
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-16">
                      <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading projects...
                      </div>
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-16 text-center">
                      <p className="font-medium text-slate-700">
                        No projects found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <ProjectRow
                      key={project.id || project.projectId}
                      project={project}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && projects.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
                {pagination.total
                  ? ` • ${pagination.total} projects`
                  : ""}
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project }) {
  const projectId = project.id || project.projectId;

  const progress =
    project.acquisitionPercentage ??
    project.progress ??
    0;

  return (
    <tr className="transition hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-900">
            {project.name || "Unnamed Project"}
          </p>

          <p className="mt-1 font-mono text-xs text-slate-500">
            {project.projectCode || project.code || projectId || "—"}
          </p>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {project.type || "—"}
      </td>

      <td className="px-5 py-4">
        <p className="text-sm text-slate-700">
          {project.district || "—"}
        </p>

        <p className="text-xs text-slate-500">
          {project.state || "—"}
        </p>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={project.status} />
      </td>

      <td className="px-5 py-4">
        <div className="w-32">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-slate-500">Progress</span>
            <span className="font-semibold text-slate-700">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-800 transition-all"
              style={{
                width: `${Math.min(Math.max(Number(progress), 0), 100)}%`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {project.requiredArea ?? "—"}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {formatDate(project.targetDate)}
      </td>

      <td className="px-5 py-4 text-right">
        <Link
          to={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          <Eye className="h-4 w-4" />
          View
        </Link>
      </td>
    </tr>
  );
}

function StatusBadge({ status }) {
  const styles = {
    DRAFT: "bg-slate-100 text-slate-700",
    SUBMITTED: "bg-blue-50 text-blue-700",
    UNDER_SCRUTINY: "bg-amber-50 text-amber-700",
    APPROVED: "bg-emerald-50 text-emerald-700",
    NOTIFICATION: "bg-indigo-50 text-indigo-700",
    AWARD: "bg-purple-50 text-purple-700",
    COMPENSATION: "bg-orange-50 text-orange-700",
    POSSESSION: "bg-cyan-50 text-cyan-700",
    "R&R": "bg-pink-50 text-pink-700",
    CLOSED: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(status) {
  if (!status) return "Unknown";

  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}