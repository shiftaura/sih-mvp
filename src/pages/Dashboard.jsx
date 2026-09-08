import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  LandPlot,
  Menu,
  MoreHorizontal,
  Search,
  ShieldAlert,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const acquisitionData = [
  { state: "UP", acquired: 78 },
  { state: "MH", acquired: 72 },
  { state: "RJ", acquired: 65 },
  { state: "MP", acquired: 59 },
  { state: "GJ", acquired: 52 },
  { state: "KA", acquired: 46 },
];

const progressData = [
  { month: "Jan", progress: 42 },
  { month: "Feb", progress: 48 },
  { month: "Mar", progress: 55 },
  { month: "Apr", progress: 61 },
  { month: "May", progress: 68 },
  { month: "Jun", progress: 74 },
];

const compensationData = [
  { name: "Assessed", value: 46 },
  { name: "Approved", value: 29 },
  { name: "Disbursed", value: 20 },
  { name: "Pending", value: 17 },
];

const rnrData = [
  { name: "Rehabilitation", completed: 68, pending: 32 },
  { name: "Resettlement", completed: 54, pending: 46 },
];

const stats = [
  {
    title: "Total Projects",
    value: "248",
    change: "+12",
    description: "from last month",
    icon: FileText,
  },
  {
    title: "Land Proposed",
    value: "18,426",
    suffix: " Ha",
    change: "+8.4%",
    description: "national total",
    icon: LandPlot,
  },
  {
    title: "Land Acquired",
    value: "12,847",
    suffix: " Ha",
    change: "+6.8%",
    description: "69.7% of proposed",
    icon: CheckCircle2,
  },
  {
    title: "Acquisition",
    value: "69.7%",
    change: "+3.2%",
    description: "overall progress",
    icon: TrendingUp,
  },
  {
    title: "Compensation Assessed",
    value: "₹8,426",
    suffix: " Cr",
    change: "+5.6%",
    description: "total assessed",
    icon: Activity,
  },
  {
    title: "Compensation Disbursed",
    value: "₹6,184",
    suffix: " Cr",
    change: "+7.1%",
    description: "73.4% disbursed",
    icon: ArrowUpRight,
  },
  {
    title: "Affected Families",
    value: "84,216",
    change: "+2,841",
    description: "registered families",
    icon: Users,
  },
  {
    title: "R&R Progress",
    value: "61.8%",
    change: "+4.6%",
    description: "overall completion",
    icon: ShieldAlert,
  },
];

const risks = [
  {
    title: "NH-48 Delhi–Jaipur Corridor",
    code: "NLAS/HR/NH48/2026",
    type: "Critical",
    progress: 38,
    issue: "Compensation disbursement delayed",
    location: "Haryana • Gurugram",
  },
  {
    title: "Eastern Freight Corridor",
    code: "NLAS/UP/EFC/2026",
    type: "High Risk",
    progress: 52,
    issue: "23 objections pending resolution",
    location: "Uttar Pradesh • Aligarh",
  },
  {
    title: "Delhi–Dehradun Expressway",
    code: "NLAS/UK/DDE/2026",
    type: "Delayed",
    progress: 64,
    issue: "Statutory scrutiny exceeding target",
    location: "Uttarakhand • Dehradun",
  },
];

const alerts = [
  {
    title: "Compensation payment pending",
    message: "Payment approval required for 14 parcels.",
    time: "12 min ago",
    severity: "High",
  },
  {
    title: "Workflow action required",
    message: "Project NLAS/UP/EFC/2026 is awaiting scrutiny.",
    time: "38 min ago",
    severity: "Medium",
  },
  {
    title: "New objection received",
    message: "Objection raised against parcel KHS-48291.",
    time: "1 hr ago",
    severity: "Low",
  },
  {
    title: "Project milestone completed",
    message: "Notification stage completed for NH-48 project.",
    time: "2 hrs ago",
    severity: "Success",
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Icon size={20} strokeWidth={1.8} />
        </div>

        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp size={13} />
          {stat.change}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {stat.title}
        </p>

        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stat.value}
          </span>

          {stat.suffix && (
            <span className="text-sm font-semibold text-slate-500">
              {stat.suffix}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-slate-500">{stat.description}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>

      {action && (
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900">
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function SeverityBadge({ type }) {
  const styles = {
    Critical: "bg-red-50 text-red-700 border-red-200",
    "High Risk": "bg-orange-50 text-orange-700 border-orange-200",
    Delayed: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        styles[type] || "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      {type}
    </span>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
            <Menu size={21} />
          </button>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              National Land Acquisition & Management System
            </p>

            <h1 className="text-lg font-bold text-slate-900">
              National Monitoring Dashboard
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex h-9 w-64 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <Search size={15} className="text-slate-400" />
            <span className="text-xs text-slate-400">
              Search projects, codes...
            </span>
          </div>

          <button className="relative rounded-lg border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50">
            <Bell size={18} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
              CO
            </div>

            <div className="hidden xl:block">
              <p className="text-xs font-semibold text-slate-800">
                Central Officer
              </p>
              <p className="text-[10px] text-slate-500">CENTRAL_OFFICER</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DashboardSidebar() {
  const navigation = [
    { label: "Dashboard", icon: Activity, active: true },
    { label: "Projects", icon: FileText },
    { label: "Land Parcels", icon: LandPlot },
    { label: "Compensation", icon: ArrowUpRight },
    { label: "R&R Management", icon: Users },
    { label: "Documents", icon: FileText },
    { label: "Objections", icon: XCircle },
    { label: "Alerts", icon: Bell },
  ];

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-[#0b1f3a] text-white lg:block">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-[#0b1f3a]">
          NL
        </div>

        <div className="ml-3">
          <p className="text-sm font-bold">NLAS</p>
          <p className="text-[9px] uppercase tracking-wider text-slate-300">
            Government Portal
          </p>
        </div>
      </div>

      <nav className="p-3">
        <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Main Navigation
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${
                  item.active
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-3 mt-6 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-semibold text-emerald-300">
            SYSTEM OPERATIONAL
          </span>
        </div>

        <p className="mt-2 text-[10px] leading-4 text-slate-400">
          National monitoring services are currently available.
        </p>
      </div>
    </aside>
  );
}

function RiskSection() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <SectionHeader
        title="Priority Projects"
        subtitle="Projects requiring officer attention"
        action="View all"
      />

      <div className="space-y-3">
        {risks.map((project) => (
          <div
            key={project.code}
            className="rounded-lg border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {project.title}
                  </h3>

                  <SeverityBadge type={project.type} />
                </div>

                <p className="mt-1 font-mono text-[10px] text-slate-400">
                  {project.code}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  {project.issue}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  {project.location}
                </p>
              </div>

              <div className="min-w-[120px]">
                <div className="mb-1 flex justify-between text-[10px]">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-bold text-slate-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsSection() {
  const severityIcon = {
    High: <ShieldAlert size={15} className="text-red-600" />,
    Medium: <AlertTriangle size={15} className="text-orange-600" />,
    Low: <Clock3 size={15} className="text-blue-600" />,
    Success: <CheckCircle2 size={15} className="text-emerald-600" />,
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <SectionHeader
        title="Recent Alerts"
        subtitle="Latest system notifications"
        action="View alerts"
      />

      <div className="divide-y divide-slate-100">
        {alerts.map((alert) => (
          <button
            key={alert.title}
            className="flex w-full gap-3 py-3 text-left first:pt-0 last:pb-0"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
              {severityIcon[alert.severity]}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-slate-800">
                  {alert.title}
                </p>

                <span className="shrink-0 text-[9px] text-slate-400">
                  {alert.time}
                </span>
              </div>

              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                {alert.message}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardHeader />

          <main className="mx-auto max-w-[1600px] p-4 md:p-6">
            {/* Page intro */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Central Monitoring • FY 2026–27
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  National Overview
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Monitor land acquisition, compensation, rehabilitation and
                  resettlement progress across active projects.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-600">
                  Last synced: 2 min ago
                </span>

                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50">
                  Export Report
                </button>
              </div>
            </div>

            {/* Stats */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.title} stat={stat} />
              ))}
            </section>

            {/* Main charts */}
            <section className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
              {/* State Acquisition */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <SectionHeader
                  title="State-wise Acquisition"
                  subtitle="Land acquisition progress by state"
                  action="Detailed view"
                />

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={acquisitionData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                      />

                      <XAxis
                        dataKey="state"
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #e2e8f0",
                          fontSize: 11,
                        }}
                        formatter={(value) => [`${value}%`, "Acquired"]}
                      />

                      <Bar
                        dataKey="acquired"
                        radius={[5, 5, 0, 0]}
                        fill="#193b67"
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Project Progress */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <SectionHeader
                  title="Project Progress"
                  subtitle="National acquisition progress trend"
                  action="View projects"
                />

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={progressData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="progressFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#193b67"
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="100%"
                            stopColor="#193b67"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                      />

                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #e2e8f0",
                          fontSize: 11,
                        }}
                        formatter={(value) => [`${value}%`, "Progress"]}
                      />

                      <Area
                        type="monotone"
                        dataKey="progress"
                        stroke="#193b67"
                        strokeWidth={2}
                        fill="url(#progressFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Compensation + R&R */}
            <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <SectionHeader
                  title="Compensation Status"
                  subtitle="National compensation pipeline"
                  action="View compensation"
                />

                <div className="flex flex-col items-center gap-5 sm:flex-row">
                  <div className="h-52 w-full sm:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={compensationData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                        >
                          {compensationData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                ["#193b67", "#4b6584", "#6b8aa8", "#cbd5e1"][
                                  index
                                ]
                              }
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          contentStyle={{
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            fontSize: 11,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="w-full space-y-3 sm:w-1/2">
                    {compensationData.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor: [
                                "#193b67",
                                "#4b6584",
                                "#6b8aa8",
                                "#cbd5e1",
                              ][index],
                            }}
                          />

                          <span className="text-xs text-slate-600">
                            {item.name}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-slate-800">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <SectionHeader
                  title="R&R Progress"
                  subtitle="Rehabilitation and resettlement status"
                  action="View R&R"
                />

                <div className="space-y-7 pt-4">
                  {rnrData.map((item) => (
                    <div key={item.name}>
                      <div className="mb-2 flex justify-between">
                        <span className="text-xs font-semibold text-slate-700">
                          {item.name}
                        </span>

                        <span className="text-xs font-bold text-slate-800">
                          {item.completed}% completed
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#193b67]"
                          style={{ width: `${item.completed}%` }}
                        />
                      </div>

                      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                        <span>Completed: {item.completed}%</span>
                        <span>Pending: {item.pending}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Priority + Alerts */}
            <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
              <RiskSection />
              <AlertsSection />
            </section>

            {/* Footer status */}
            <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-4 text-[10px] text-slate-400 sm:flex-row sm:items-center">
              <span>
                NLAS • National Land Acquisition & Management System
              </span>

              <div className="flex items-center gap-4">
                <span>Secure Government Environment</span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Services Operational
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}