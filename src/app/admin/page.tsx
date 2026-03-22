'use client';

import { useEffect, useState } from 'react';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalBookings: number;
  totalCustomers: number;
  revenue: number;
  pendingInvoices: number;
  recentBookings: Array<{
    id: number;
    customer_name: string;
    trip_type: string;
    trip_date: string;
    status: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Bookings',
      value: stats?.totalBookings ?? 0,
      icon: Calendar,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      label: 'Total Customers',
      value: stats?.totalCustomers ?? 0,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      label: 'Total Revenue',
      value: `$${(stats?.revenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-gold-400',
      bgColor: 'bg-gold-400/10',
    },
    {
      label: 'Pending Invoices',
      value: stats?.pendingInvoices ?? 0,
      icon: TrendingUp,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-earth-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-earth-100">Dashboard</h1>
        <p className="text-earth-400 mt-1">Welcome back! Here&apos;s your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-earth-900/50 border border-earth-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <div>
                  <p className="text-earth-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-semibold text-earth-100">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-earth-700/50">
          <h2 className="text-lg font-semibold text-earth-100">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-earth-700/50">
          {stats?.recentBookings && stats.recentBookings.length > 0 ? (
            stats.recentBookings.map((booking) => (
              <div key={booking.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-earth-100 font-medium">{booking.customer_name}</p>
                  <p className="text-earth-400 text-sm">{booking.trip_type}</p>
                </div>
                <div className="text-right">
                  <p className="text-earth-200">{new Date(booking.trip_date).toLocaleDateString()}</p>
                  <span className={`
                    inline-block px-2 py-1 rounded text-xs font-medium
                    ${booking.status === 'confirmed'
                      ? 'bg-green-400/10 text-green-400'
                      : booking.status === 'pending'
                      ? 'bg-yellow-400/10 text-yellow-400'
                      : 'bg-earth-600/30 text-earth-400'
                    }
                  `}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-earth-500">
              No bookings yet. When customers book trips, they&apos;ll appear here.
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-earth-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 bg-earth-800/50 hover:bg-earth-700/50 rounded-lg transition-colors"
          >
            <Calendar className="text-gold-400" size={20} />
            <span className="text-earth-200">View Calendar</span>
          </a>
          <a
            href="/admin/customers"
            className="flex items-center gap-3 px-4 py-3 bg-earth-800/50 hover:bg-earth-700/50 rounded-lg transition-colors"
          >
            <Users className="text-gold-400" size={20} />
            <span className="text-earth-200">Manage Customers</span>
          </a>
          <a
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 bg-earth-800/50 hover:bg-earth-700/50 rounded-lg transition-colors"
          >
            <DollarSign className="text-gold-400" size={20} />
            <span className="text-earth-200">Payment Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
}
