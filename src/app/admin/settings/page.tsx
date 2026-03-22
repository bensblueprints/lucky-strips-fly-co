'use client';

import { useEffect, useState } from 'react';
import { Save, ExternalLink, CreditCard, Percent, DollarSign } from 'lucide-react';

interface Settings {
  deposit_type: 'percentage' | 'flat';
  deposit_value: string;
  stripe_account_id: string;
  stripe_connected: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    deposit_type: 'percentage',
    deposit_value: '25',
    stripe_account_id: '',
    stripe_connected: 'false',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const connectStripe = async () => {
    // In production, this would redirect to Stripe Connect OAuth
    const response = await fetch('/api/admin/stripe/connect');
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-earth-400">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-earth-100">Settings</h1>
        <p className="text-earth-400 mt-1">Configure your payment and deposit settings</p>
      </div>

      {message && (
        <div className={`
          px-4 py-3 rounded-lg
          ${message.includes('success')
            ? 'bg-green-900/20 border border-green-700/50 text-green-400'
            : 'bg-red-900/20 border border-red-700/50 text-red-400'
          }
        `}>
          {message}
        </div>
      )}

      {/* Stripe Connect */}
      <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="text-gold-400" size={24} />
          <h2 className="text-lg font-semibold text-earth-100">Stripe Connect</h2>
        </div>

        <p className="text-earth-400 text-sm mb-4">
          Connect your Stripe account to accept payments and deposits from customers.
        </p>

        {settings.stripe_connected === 'true' ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-3 bg-green-900/20 border border-green-700/50 rounded-lg">
              <p className="text-green-400 font-medium">Stripe Connected</p>
              <p className="text-green-500/70 text-sm">Account ID: {settings.stripe_account_id}</p>
            </div>
            <button
              onClick={() => window.open('https://dashboard.stripe.com', '_blank')}
              className="flex items-center gap-2 px-4 py-3 bg-earth-800/50 hover:bg-earth-700/50 text-earth-200 rounded-lg transition-colors"
            >
              <ExternalLink size={18} />
              Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={connectStripe}
            className="flex items-center gap-2 px-6 py-3 bg-[#635BFF] hover:bg-[#5851e0] text-white rounded-lg transition-colors"
          >
            <CreditCard size={20} />
            Connect with Stripe
          </button>
        )}
      </div>

      {/* Deposit Settings */}
      <div className="bg-earth-900/50 border border-earth-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-earth-100 mb-4">Deposit Settings</h2>
        <p className="text-earth-400 text-sm mb-6">
          Configure how deposits are calculated for bookings.
        </p>

        <div className="space-y-6">
          {/* Deposit Type */}
          <div>
            <label className="block text-sm font-medium text-earth-300 mb-3">
              Deposit Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSettings({ ...settings, deposit_type: 'percentage' })}
                className={`
                  flex items-center gap-3 px-4 py-4 rounded-lg border-2 transition-all
                  ${settings.deposit_type === 'percentage'
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-earth-700/50 bg-earth-800/30 hover:border-earth-600'
                  }
                `}
              >
                <Percent className={settings.deposit_type === 'percentage' ? 'text-gold-400' : 'text-earth-400'} size={24} />
                <div className="text-left">
                  <p className={`font-medium ${settings.deposit_type === 'percentage' ? 'text-gold-400' : 'text-earth-200'}`}>
                    Percentage
                  </p>
                  <p className="text-earth-500 text-sm">e.g., 25% of total</p>
                </div>
              </button>
              <button
                onClick={() => setSettings({ ...settings, deposit_type: 'flat' })}
                className={`
                  flex items-center gap-3 px-4 py-4 rounded-lg border-2 transition-all
                  ${settings.deposit_type === 'flat'
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-earth-700/50 bg-earth-800/30 hover:border-earth-600'
                  }
                `}
              >
                <DollarSign className={settings.deposit_type === 'flat' ? 'text-gold-400' : 'text-earth-400'} size={24} />
                <div className="text-left">
                  <p className={`font-medium ${settings.deposit_type === 'flat' ? 'text-gold-400' : 'text-earth-200'}`}>
                    Flat Amount
                  </p>
                  <p className="text-earth-500 text-sm">e.g., $100 fixed</p>
                </div>
              </button>
            </div>
          </div>

          {/* Deposit Value */}
          <div>
            <label className="block text-sm font-medium text-earth-300 mb-2">
              {settings.deposit_type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500">
                {settings.deposit_type === 'percentage' ? '%' : '$'}
              </span>
              <input
                type="number"
                value={settings.deposit_value}
                onChange={(e) => setSettings({ ...settings, deposit_value: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-earth-800/50 border border-earth-600/50 rounded-lg text-earth-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                placeholder={settings.deposit_type === 'percentage' ? '25' : '100'}
                min="0"
                max={settings.deposit_type === 'percentage' ? '100' : undefined}
              />
            </div>
            <p className="text-earth-500 text-sm mt-2">
              {settings.deposit_type === 'percentage'
                ? `Customers will pay ${settings.deposit_value || '0'}% of the trip cost as a deposit.`
                : `Customers will pay $${settings.deposit_value || '0'} as a flat deposit.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:bg-gold-700 disabled:cursor-not-allowed text-earth-950 font-semibold rounded-lg transition-colors"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
