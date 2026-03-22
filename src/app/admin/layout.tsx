'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

interface AdminUser {
  id: number;
  email: string;
  name: string;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/invoices', label: 'Invoices', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/session');
        const data = await response.json();

        if (!data.authenticated) {
          router.push('/admin/login');
          return;
        }

        setUser(data.user);
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Show login page without layout
  if (isLoginPage) {
    return children;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-earth-950 flex items-center justify-center">
        <div className="text-gold-400 text-lg">Loading...</div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-earth-950">
      {/* Mobile header */}
      <div className="lg:hidden bg-earth-900 border-b border-earth-700/50 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-playfair text-xl text-gold-400">
          Lucky Strips Admin
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-earth-300 hover:text-gold-400 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-earth-900 border-r border-earth-700/50
            transform lg:transform-none transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            pt-16 lg:pt-0
          `}
        >
          <div className="p-6 border-b border-earth-700/50 hidden lg:block">
            <Link href="/admin" className="block">
              <h1 className="font-playfair text-xl text-gold-400">Lucky Strips</h1>
              <p className="text-earth-500 text-sm">Admin Dashboard</p>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-gold-600/20 text-gold-400 border border-gold-600/30'
                      : 'text-earth-400 hover:bg-earth-800 hover:text-earth-200'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-earth-700/50">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 bg-gold-600/30 rounded-full flex items-center justify-center">
                <span className="text-gold-400 text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-earth-200 truncate">{user.name}</p>
                <p className="text-xs text-earth-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-earth-400 hover:bg-earth-800 hover:text-red-400 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
