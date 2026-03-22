'use client';

import { useEffect, useState } from 'react';
import { Plus, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Invoice {
  id: number;
  booking_id: number;
  customer_name: string;
  customer_email: string;
  trip_type: string;
  amount: string;
  due_date: string;
  sent_at: string | null;
  paid_at: string | null;
  status: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/admin/invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.invoices || []);
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendInvoice = async (id: number) => {
    try {
      await fetch(`/api/admin/invoices/${id}/send`, {
        method: 'POST',
      });
      fetchInvoices();
    } catch (error) {
      console.error('Failed to send invoice:', error);
    }
  };

  const markAsPaid = async (id: number) => {
    try {
      await fetch(`/api/admin/invoices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paid', paid_at: new Date().toISOString() }),
      });
      fetchInvoices();
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="text-green-400" size={18} />;
      case 'sent':
        return <Clock className="text-yellow-400" size={18} />;
      case 'overdue':
        return <AlertCircle className="text-red-400" size={18} />;
      default:
        return <Clock className="text-earth-400" size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-earth-400">Loading invoices...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-earth-100">Invoices</h1>
          <p className="text-earth-400 mt-1">Manage balance invoices for bookings</p>
        </div>
        <a
          href="/admin/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-earth-950 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>New Invoice</span>
        </a>
      </div>

      <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-earth-700/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Invoice #</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Trip</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-earth-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-700/50">
              {invoices.length > 0 ? (
                invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-earth-800/30">
                    <td className="px-6 py-4 text-earth-200 font-mono">
                      INV-{String(invoice.id).padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-earth-100 font-medium">{invoice.customer_name}</p>
                        <p className="text-earth-500 text-sm">{invoice.customer_email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-earth-200">{invoice.trip_type}</td>
                    <td className="px-6 py-4 text-earth-100 font-medium">
                      ${parseFloat(invoice.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-earth-200">
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(invoice.status)}
                        <span className={`
                          text-sm font-medium capitalize
                          ${invoice.status === 'paid'
                            ? 'text-green-400'
                            : invoice.status === 'sent'
                            ? 'text-yellow-400'
                            : invoice.status === 'overdue'
                            ? 'text-red-400'
                            : 'text-earth-400'
                          }
                        `}>
                          {invoice.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {invoice.status === 'draft' && (
                          <button
                            onClick={() => sendInvoice(invoice.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm"
                          >
                            <Send size={14} />
                            Send
                          </button>
                        )}
                        {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                          <button
                            onClick={() => markAsPaid(invoice.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm"
                          >
                            <CheckCircle size={14} />
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-earth-500">
                    No invoices yet. Create an invoice when a booking needs a balance payment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
