import { getDashboardStats } from "@/lib/admin/stats";
import CurrentDate from "@/components/admin/CurrentDate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const stats = await getDashboardStats();

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

        {/* Platform Statistics */}
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
              {/* Gallery Photos */}
              <div className="group p-8 hover:bg-zinc-800/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#FF6E4A]-500/10 border border-orange-500/20 group-hover:bg-[#FF6E4A]-500/20 transition-colors">
                      <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#FF6E4A]-500/10 border border-orange-500/20">
                      <span className="text-xs font-semibold text-orange-400">Active</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-2">Gallery Photos</h3>
                  <p className="text-4xl font-bold text-white mb-1">{stats.gallery.total}</p>
                  <p className="text-xs text-zinc-500">Available in gallery</p>
                </div>
              </div>

              {/* Doors */}
              <div className="group p-8 hover:bg-zinc-800/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                      <span className="text-xs font-semibold text-blue-400">Active</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-2">Doors</h3>
                  <p className="text-4xl font-bold text-white mb-1">{stats.doors.total}</p>
                  <p className="text-xs text-zinc-500">Available in store</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

