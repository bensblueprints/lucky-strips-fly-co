'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Mail, Phone } from 'lucide-react';

interface Customer {
  id: number;
  email: string;
  name: string;
  phone: string;
  created_at: string;
  booking_count: number;
  total_spent: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers || []);
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-earth-400">Loading customers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-earth-100">Customers</h1>
          <p className="text-earth-400 mt-1">Manage your customer database</p>
        </div>
        <a
          href="/admin/customers/new"
          className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-earth-950 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Customer</span>
        </a>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-12 pr-4 py-3 bg-earth-900/50 border border-earth-700/50 rounded-xl text-earth-100 placeholder-earth-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <a
              key={customer.id}
              href={`/admin/customers/${customer.id}`}
              className="bg-earth-900/50 border border-earth-700/50 rounded-xl p-5 hover:border-gold-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-400 text-lg font-medium">
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-earth-100 font-medium truncate">{customer.name}</h3>
                  <div className="flex items-center gap-2 text-earth-400 text-sm mt-1">
                    <Mail size={14} />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-earth-400 text-sm mt-1">
                      <Phone size={14} />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-earth-700/50 flex justify-between text-sm">
                <div>
                  <p className="text-earth-500">Bookings</p>
                  <p className="text-earth-200 font-medium">{customer.booking_count}</p>
                </div>
                <div className="text-right">
                  <p className="text-earth-500">Total Spent</p>
                  <p className="text-gold-400 font-medium">
                    ${parseFloat(customer.total_spent || '0').toFixed(2)}
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-earth-500">
            {search ? 'No customers match your search.' : 'No customers yet.'}
          </div>
        )}
      </div>
    </div>
  );
}
