import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { transitionWorkflow } from "../../../services/workflowApi";
const WORKFLOW_STATUSES = [
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

export default function WorkflowTimeline({
  projectId,
  workflow,
  onTransitionSuccess,
}) {
  const [transitioning, setTransitioning] = useState(false);
  const [error, setError] = useState("");

  const currentStatus = workflow?.currentStatus || "DRAFT";

  const currentIndex = WORKFLOW_STATUSES.indexOf(currentStatus);

  const nextStatus =
    currentIndex >= 0 &&
    currentIndex < WORKFLOW_STATUSES.length - 1
      ? WORKFLOW_STATUSES[currentIndex + 1]
      : null;

  const steps = workflow?.steps || [];

  const handleNextAction = async () => {
    if (!nextStatus || transitioning) return;

    try {
      setTransitioning(true);
      setError("");

      const response = await transitionWorkflow({
        projectId,
        nextStatus,
        comment: `Workflow moved from ${currentStatus} to ${nextStatus}`,
      });

      if (!response?.success) {
        throw new Error(
          response?.error?.message || "Workflow transition failed"
        );
      }

      if (onTransitionSuccess) {
        await onTransitionSuccess();
      }
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.message ||
          "Unable to update workflow"
      );
    } finally {
      setTransitioning(false);
    }
  };

  const getStepState = (status, index) => {
    const backendStep = steps.find(
      (step) => step.status === status
    );

    if (backendStep?.completed === true) {
      return "completed";
    }

    if (status === currentStatus) {
      return "current";
    }

    if (index < currentIndex) {
      return "completed";
    }

    return "upcoming";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Project Workflow
            </p>

            <h3 className="mt-1 text-lg font-bold text-slate-900">
              Acquisition Lifecycle
            </h3>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Current Status
            </p>

            <p className="mt-0.5 text-sm font-bold text-slate-900">
              {formatStatus(currentStatus)}
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Timeline */}
      <div className="px-5 py-6">
        <div className="relative">
          <div className="absolute bottom-5 left-[15px] top-5 w-px bg-slate-200" />

          <div className="space-y-6">
            {WORKFLOW_STATUSES.map((status, index) => (
              <WorkflowStep
                key={status}
                status={status}
                index={index}
                state={getStepState(status, index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
        {nextStatus ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Next Action
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Move project to{" "}
                <span className="text-slate-700">
                  {formatStatus(nextStatus)}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextAction}
              disabled={transitioning}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {transitioning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  Next Action
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Workflow Completed
              </p>

              <p className="text-xs text-slate-500">
                This project has reached the final lifecycle stage.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkflowStep({ status, index, state }) {
  const isCompleted = state === "completed";
  const isCurrent = state === "current";

  return (
    <div className="relative flex items-start gap-4">
      {/* Icon */}
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
        {isCompleted ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
        ) : isCurrent ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 ring-4 ring-slate-100">
            <Clock3 className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white">
            <Circle className="h-3.5 w-3.5 text-slate-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h4
            className={`text-sm font-semibold ${
              isCurrent
                ? "text-slate-900"
                : isCompleted
                ? "text-slate-700"
                : "text-slate-400"
            }`}
          >
            {formatStatus(status)}
          </h4>

          {isCurrent && (
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Current
            </span>
          )}

          {isCompleted && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Completed
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-slate-500">
          {getStatusDescription(status)}
        </p>
      </div>
    </div>
  );
}

function formatStatus(status) {
  if (!status) return "Unknown";

  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0) + word.slice(1).toLowerCase()
    )
    .join(" ");
}

function getStatusDescription(status) {
  const descriptions = {
    DRAFT: "Project is being prepared for submission.",
    SUBMITTED: "Project has been submitted for official review.",
    UNDER_SCRUTINY:
      "Project is under statutory and administrative scrutiny.",
    APPROVED: "Project has received the required approval.",
    NOTIFICATION:
      "Statutory notification stage is in progress.",
    AWARD: "Award determination is being processed.",
    COMPENSATION:
      "Compensation assessment and payment are in progress.",
    POSSESSION:
      "Land possession activities are in progress.",
    "R&R":
      "Rehabilitation and resettlement activities are in progress.",
    CLOSED:
      "All workflow activities have been completed.",
  };

  return descriptions[status] || "Workflow stage is being processed.";
}