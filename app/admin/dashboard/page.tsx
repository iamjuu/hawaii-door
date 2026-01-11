import { getDashboardStats } from "@/lib/admin/stats";
import Link from "next/link";
import CurrentDate from "@/components/admin/CurrentDate";
import OrdersLineChart from "@/components/admin/OrdersLineChart";
import UsersPieChart from "@/components/admin/UsersPieChart";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const formatCurrency = (amount: number) => {
  const value = amount / 100;
  if (value >= 1000000) {
    return `₹${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${value.toFixed(2)}`;
};

const MetricCard = ({
  title,
  value,
  percentage,
  trend,
  bgColor,
}: {
  title: string;
  value: string;
  percentage: string;
  trend: "up" | "down";
  bgColor: string;
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${bgColor} p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</p>
          <span className={`text-sm font-semibold ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {percentage}
          </span>
        </div>
        <div className={`p-3 rounded-xl ${trend === "up" ? "bg-green-500/20" : "bg-red-500/20"}`}>
          {trend === "up" ? (
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          )}
        </div>
      </div>
      <h3 className="text-sm font-medium text-white">{title}</h3>
    </div>
  );
};

const ChartCard = ({
  title,
  value,
  subtitle,
  children,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-zinc-800/70 hover:shadow-xl border border-zinc-700/50">
      <div className="relative">
        <h3 className="mb-2 text-sm font-medium text-white uppercase tracking-wide">{title}</h3>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        {subtitle && <p className="mb-4 text-xs text-white/70">{subtitle}</p>}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default async function DashboardPage() {
  const stats = await getDashboardStats();
console.log(stats,'data gotted');
  // Calculate Annual Income (total revenue)
  const annualIncome = stats.revenue.total;
  
  // Calculate Month Income (current month)
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthIncome = stats.revenueData
    .filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, day) => sum + day.revenue, 0);
  
  // Calculate previous month for comparison
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonthIncome = stats.revenueData
    .filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() === prevMonth && date.getFullYear() === prevMonthYear;
    })
    .reduce((sum, day) => sum + day.revenue, 0);
  
  const monthGrowth = prevMonthIncome > 0
    ? (((monthIncome - prevMonthIncome) / prevMonthIncome) * 100).toFixed(1)
    : "0.0";
  const monthTrend: "up" | "down" = prevMonthIncome > 0 && monthIncome >= prevMonthIncome ? "up" : "down";

  // Calculate Daily Income (today)
  const today = new Date().toISOString().split("T")[0];
  const todayData = stats.revenueData.find((item) => item.date === today);
  const dailyIncome = todayData ? todayData.revenue : 0;
  
  // Calculate yesterday for comparison
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split("T")[0];
  const yesterdayData = stats.revenueData.find((item) => item.date === yesterdayDate);
  const yesterdayIncome = yesterdayData ? yesterdayData.revenue : 0;
  
  const dailyGrowth = yesterdayIncome > 0
    ? (((dailyIncome - yesterdayIncome) / yesterdayIncome) * 100).toFixed(1)
    : "0.0";
  const dailyTrend: "up" | "down" = yesterdayIncome > 0 && dailyIncome >= yesterdayIncome ? "up" : "down";

  // Calculate growth percentages (comparing last 7 days vs previous 7 days for annual)
  const last7DaysRevenue = stats.revenueData.slice(-7).reduce((sum, day) => sum + day.revenue, 0);
  const prev7DaysRevenue = stats.revenueData.slice(-14, -7).reduce((sum, day) => sum + day.revenue, 0);
  const annualGrowth = prev7DaysRevenue > 0 
    ? (((last7DaysRevenue - prev7DaysRevenue) / prev7DaysRevenue) * 100).toFixed(1)
    : "0.0";

  // Calculate total expenses (placeholder - you can add actual expense tracking later)
  const totalExpenses = 0;
  const expenseGrowth = "0.0";

  return (
    <div className="min-h-screen bg-zinc-900 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-400">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
          </div>
          <CurrentDate />
        </div>

        {/* Main Metric Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Annual Income"
            value={formatCurrency(annualIncome)}
            percentage={`+${annualGrowth}%`}
            trend="up"
            bgColor="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90"
          />
          <MetricCard
            title="Month Income"
            value={formatCurrency(monthIncome)}
            percentage={`${monthTrend === "up" ? "+" : "-"}${monthGrowth}%`}
            trend={monthTrend}
            bgColor="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90"
          />
          <MetricCard
            title="Daily Income"
            value={formatCurrency(dailyIncome)}
            percentage={`${dailyTrend === "up" ? "+" : "-"}${dailyGrowth}%`}
            trend={dailyTrend}
            bgColor="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90"
          />
          <MetricCard
            title="Expense current"
            value={formatCurrency(totalExpenses)}
            percentage={`+${expenseGrowth}%`}
            trend="up"
            bgColor="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90"
          />
        </section>


      {/* Additional Statistics - Unified Card */}
      <section className="w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800/90 via-zinc-800/70 to-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 shadow-2xl">
          {/* Header */}
          <div className="px-8 py-6 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-transparent">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Platform Statistics
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Overview of key platform metrics</p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-700/50">
            {/* Total Products */}
            <div className="group p-8 hover:bg-zinc-800/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                    <span className="text-xs font-semibold text-orange-400">Active</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-2">Total Products</h3>
                <p className="text-4xl font-bold text-white mb-1">{stats.products.total}</p>
                <p className="text-xs text-zinc-500">Available in store</p>
              </div>
            </div>

            {/* Total Orders */}
            <div className="group p-8 hover:bg-zinc-800/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <span className="text-xs font-semibold text-blue-400">{stats.orders.paid} Paid</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-2">Total Orders</h3>
                <p className="text-4xl font-bold text-white mb-1">{stats.orders.total}</p>
                <p className="text-xs text-zinc-500">{stats.orders.pending} pending, {stats.orders.cancelled} cancelled</p>
              </div>
            </div>
          </div>

     
        </div>
      </section>

        {/* Statistics Cards with Charts */}
        <section className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
          <ChartCard
            title="Total Users"
            value={stats.users.total}
            subtitle={`${stats.users.verified} verified, ${stats.users.total - stats.users.verified} unverified`}
          >
            <UsersPieChart 
              total={stats.users.total}
              verified={stats.users.verified}
            />
          </ChartCard>
        </section>

        {/* Total Orders Line Chart */}
        <section className="grid gap-6 lg:grid-cols-1">
          <ChartCard
            title="Total Orders"
            value={stats.orders.total}
            subtitle={`${stats.orders.paid} paid, ${stats.orders.pending} pending, ${stats.orders.cancelled} cancelled - Last 30 days trend`}
          >
            <OrdersLineChart data={stats.ordersData} />
          </ChartCard>
        </section>

   

        {/* Recent Orders */}
        <section className="grid gap-6 lg:grid-cols-1">
          <div className="rounded-2xl bg-zinc-800/50 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
                <p className="mt-1 text-sm text-zinc-400">Latest customer orders</p>
              </div>
              <Link href="/admin/dashboard/orders" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                View All →
              </Link>
            </div>
            {stats.recentOrders.length === 0 ? (
              <div className="py-8 text-center text-zinc-500">No orders yet</div>
            ) : (
              <div className="space-y-3">
                {stats.recentOrders.slice(0, 5).map((order: { _id: string; amount: number; status: string; createdAt: string }) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between rounded-lg bg-zinc-900/50 p-4 border border-zinc-700/30 hover:bg-zinc-900/70 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-mono text-xs text-zinc-400">#{String(order._id).slice(-8)}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{formatCurrency(order.amount)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "paid"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : order.status === "pending"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-zinc-500" suppressHydrationWarning>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

