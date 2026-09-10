import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { createProject } from "../services/projectApi";

const PROJECT_TYPES = [
  "Highway Infrastructure",
  "Railway Infrastructure",
  "Industrial Infrastructure",
  "Urban Infrastructure",
  "Other",
];

const INITIAL_FORM = {
  name: "",
  type: "",
  department: "",
  state: "",
  district: "",
  requiredArea: "",
  targetDate: "",
};

export default function ProjectCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.type ||
      !form.department ||
      !form.state ||
      !form.district ||
      !form.requiredArea ||
      !form.targetDate
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await createProject({
        name: form.name.trim(),
        type: form.type,
        department: form.department.trim(),
        state: form.state.trim(),
        district: form.district.trim(),
        requiredArea: Number(form.requiredArea),
        targetDate: form.targetDate,
      });

      if (!response?.success) {
        throw new Error(
          response?.error?.message || "Failed to create project"
        );
      }

      const project = response.data;

      const projectId =
        project?.id ||
        project?.projectId ||
        project?.project?.id ||
        project?.project?.projectId;

      if (!projectId) {
        throw new Error("Project created, but project ID was not returned.");
      }

      navigate(`/projects/${projectId}`);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.message ||
          "Unable to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/projects"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Project Registry
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Create New Project
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Register a new land acquisition project.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Project Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the basic project details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

            {/* Project Name */}
            <FormField
              label="Project Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />

            {/* Project Type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Project Type <span className="text-red-500">*</span>
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                <option value="">Select project type</option>

                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <FormField
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Enter department"
              required
            />

            {/* State */}
            <FormField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />

            {/* District */}
            <FormField
              label="District"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="Enter district"
              required
            />

            {/* Required Area */}
            <FormField
              label="Total Required Area (Ha)"
              name="requiredArea"
              type="number"
              min="0"
              step="0.01"
              value={form.requiredArea}
              onChange={handleChange}
              placeholder="e.g. 125.50"
              required
            />

            {/* Target Date */}
            <FormField
              label="Target Completion Date"
              name="targetDate"
              type="date"
              value={form.targetDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
            <Link
              to="/projects"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  step,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        required={required}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      />
    </div>
  );
}