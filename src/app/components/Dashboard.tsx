import { useNavigate } from 'react-router';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  List,
  Mic,
  Users,
  Star,
  ChevronRight,
  Minus,
} from 'lucide-react';

const topCustomers = [
  {
    id: 'C004',
    name: 'Emily Rodriguez',
    accountType: 'Premier Banking',
    segment: 'VIP',
    openComplaints: 1,
    sentiment: 'Angry',
    sentimentTrend: 'down',
    avatar: 'ER',
    avatarColor: 'bg-rose-600',
  },
  {
    id: 'C001',
    name: 'John Anderson',
    accountType: 'Premier Banking',
    segment: 'VIP',
    openComplaints: 1,
    sentiment: 'Frustrated',
    sentimentTrend: 'down',
    avatar: 'JA',
    avatarColor: 'bg-indigo-600',
  },
  {
    id: 'C003',
    name: 'Michael Chen',
    accountType: 'Business Account',
    segment: 'VIP',
    openComplaints: 1,
    sentiment: 'Neutral',
    sentimentTrend: 'stable',
    avatar: 'MC',
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'C005',
    name: 'David Kim',
    accountType: 'Savings Account',
    segment: 'Standard',
    openComplaints: 1,
    sentiment: 'Frustrated',
    sentimentTrend: 'down',
    avatar: 'DK',
    avatarColor: 'bg-violet-600',
  },
];

const sentimentConfig: Record<string, { color: string; bg: string }> = {
  Satisfied: { color: 'text-green-700', bg: 'bg-green-100' },
  Neutral: { color: 'text-gray-700', bg: 'bg-gray-100' },
  Frustrated: { color: 'text-orange-700', bg: 'bg-orange-100' },
  Angry: { color: 'text-red-700', bg: 'bg-red-100' },
};

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Complaints', value: '1,247', icon: FileText, color: 'bg-blue-500' },
    { label: 'Resolved Today', value: '43', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Escalated Issues', value: '18', icon: AlertTriangle, color: 'bg-orange-500' },
    { label: 'Pending Review', value: '26', icon: Clock, color: 'bg-yellow-500' },
    { label: 'My Customers', value: '8', icon: Users, color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Neevaran" className="w-11 h-11 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Neevaran</h1>
              <p className="text-gray-600">Welcome back, Relationship Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Today's Date</p>
              <p className="text-sm text-gray-600">June 4, 2026</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Customer Sentiment */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800">Sentiment Score</h3>
                <p className="text-gray-500 text-xs">Overall satisfaction</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-gray-800">7.8</span>
                <span className="text-gray-400 text-sm">/10</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">+0.3 from last week</p>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => navigate('/complaint/customer')}
                className="flex items-center gap-3 p-3 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 transition group"
              >
                <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-200 transition">
                  <Mic className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 text-sm">Record Complaint</p>
                  <p className="text-xs text-gray-500">Voice or text</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/customers')}
                className="flex items-center gap-3 p-3 border-2 border-amber-200 rounded-lg hover:bg-amber-50 transition group"
              >
                <div className="bg-amber-100 p-2 rounded-lg group-hover:bg-amber-200 transition">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 text-sm">My Customers</p>
                  <p className="text-xs text-gray-500">View portfolio</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/complaints')}
                className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition group"
              >
                <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition">
                  <List className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 text-sm">All Complaints</p>
                  <p className="text-xs text-gray-500">Browse records</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* My Customers — Needs Attention */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">Customers Needing Attention</h3>
              <p className="text-xs text-gray-500">Customers with open complaints or declining sentiment</p>
            </div>
            <button
              onClick={() => navigate('/customers')}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {topCustomers.map((customer) => {
              const sc = sentimentConfig[customer.sentiment] ?? sentimentConfig['Neutral'];
              return (
                <div key={customer.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition">
                  <div
                    className={`${customer.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  >
                    {customer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800">{customer.name}</p>
                      {customer.segment === 'VIP' && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                          <Star className="w-3 h-3" />
                          VIP
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{customer.accountType}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                      {customer.sentiment}
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      {customer.sentimentTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-500" />}
                      {customer.sentimentTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                      {customer.sentimentTrend === 'stable' && <Minus className="w-3.5 h-3.5 text-gray-400" />}
                    </div>
                    {customer.openComplaints > 0 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        {customer.openComplaints} open
                      </span>
                    )}
                    <button
                      onClick={() => navigate('/complaint/customer')}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center gap-1"
                    >
                      <Mic className="w-3 h-3" />
                      Record
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Complaint CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Ready to capture a new complaint?</h3>
            <p className="text-indigo-100 text-sm">AI will analyse, classify, and suggest solutions automatically.</p>
          </div>
          <button
            onClick={() => navigate('/complaint/customer')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            New Complaint
          </button>
        </div>
      </div>
    </div>
  );
}
