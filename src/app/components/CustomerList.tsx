import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Search,
  Mic,
  Phone,
  Mail,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Users,
  Filter,
} from 'lucide-react';

const customers = [
  {
    id: 'C001',
    name: 'John Anderson',
    accountNo: '•••• 4821',
    accountType: 'Premier Banking',
    segment: 'VIP',
    phone: '+65 9123 4567',
    email: 'john.anderson@email.com',
    since: 'Jan 2018',
    totalComplaints: 3,
    openComplaints: 1,
    resolvedComplaints: 2,
    sentiment: 'Frustrated',
    sentimentTrend: 'down',
    lastContact: 'June 4, 2026',
    avatar: 'JA',
    avatarColor: 'bg-indigo-600',
  },
  {
    id: 'C002',
    name: 'Sarah Mitchell',
    accountNo: '•••• 7743',
    accountType: 'Savings Account',
    segment: 'Standard',
    phone: '+65 8234 5678',
    email: 'sarah.mitchell@email.com',
    since: 'Mar 2021',
    totalComplaints: 1,
    openComplaints: 0,
    resolvedComplaints: 1,
    sentiment: 'Satisfied',
    sentimentTrend: 'up',
    lastContact: 'June 4, 2026',
    avatar: 'SM',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'C003',
    name: 'Michael Chen',
    accountNo: '•••• 3390',
    accountType: 'Business Account',
    segment: 'VIP',
    phone: '+65 9345 6789',
    email: 'm.chen@email.com',
    since: 'Sep 2019',
    totalComplaints: 2,
    openComplaints: 1,
    resolvedComplaints: 1,
    sentiment: 'Neutral',
    sentimentTrend: 'stable',
    lastContact: 'June 3, 2026',
    avatar: 'MC',
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'C004',
    name: 'Emily Rodriguez',
    accountNo: '•••• 5512',
    accountType: 'Premier Banking',
    segment: 'VIP',
    phone: '+65 8456 7890',
    email: 'emily.r@email.com',
    since: 'Jun 2016',
    totalComplaints: 4,
    openComplaints: 1,
    resolvedComplaints: 3,
    sentiment: 'Angry',
    sentimentTrend: 'down',
    lastContact: 'June 3, 2026',
    avatar: 'ER',
    avatarColor: 'bg-rose-600',
  },
  {
    id: 'C005',
    name: 'David Kim',
    accountNo: '•••• 8891',
    accountType: 'Savings Account',
    segment: 'Standard',
    phone: '+65 9567 8901',
    email: 'david.kim@email.com',
    since: 'Nov 2022',
    totalComplaints: 2,
    openComplaints: 1,
    resolvedComplaints: 1,
    sentiment: 'Frustrated',
    sentimentTrend: 'down',
    lastContact: 'June 2, 2026',
    avatar: 'DK',
    avatarColor: 'bg-violet-600',
  },
  {
    id: 'C006',
    name: 'Lisa Thompson',
    accountNo: '•••• 2267',
    accountType: 'Fixed Deposit',
    segment: 'Standard',
    phone: '+65 8678 9012',
    email: 'lisa.t@email.com',
    since: 'Feb 2020',
    totalComplaints: 1,
    openComplaints: 0,
    resolvedComplaints: 1,
    sentiment: 'Satisfied',
    sentimentTrend: 'up',
    lastContact: 'June 2, 2026',
    avatar: 'LT',
    avatarColor: 'bg-teal-600',
  },
  {
    id: 'C007',
    name: 'Robert Tan',
    accountNo: '•••• 9954',
    accountType: 'Premier Banking',
    segment: 'VIP',
    phone: '+65 9789 0123',
    email: 'robert.tan@email.com',
    since: 'Apr 2015',
    totalComplaints: 0,
    openComplaints: 0,
    resolvedComplaints: 0,
    sentiment: 'Satisfied',
    sentimentTrend: 'stable',
    lastContact: 'May 28, 2026',
    avatar: 'RT',
    avatarColor: 'bg-amber-600',
  },
  {
    id: 'C008',
    name: 'Priya Sharma',
    accountNo: '•••• 1135',
    accountType: 'Business Account',
    segment: 'VIP',
    phone: '+65 8890 1234',
    email: 'priya.s@email.com',
    since: 'Jul 2020',
    totalComplaints: 1,
    openComplaints: 0,
    resolvedComplaints: 1,
    sentiment: 'Neutral',
    sentimentTrend: 'stable',
    lastContact: 'May 30, 2026',
    avatar: 'PS',
    avatarColor: 'bg-pink-600',
  },
];

const sentimentConfig: Record<string, { color: string; bg: string }> = {
  Satisfied: { color: 'text-green-700', bg: 'bg-green-100' },
  Neutral: { color: 'text-gray-700', bg: 'bg-gray-100' },
  Frustrated: { color: 'text-orange-700', bg: 'bg-orange-100' },
  Angry: { color: 'text-red-700', bg: 'bg-red-100' },
};

export function CustomerList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<'All' | 'VIP' | 'Standard'>('All');

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.accountNo.includes(search);
    const matchSegment = segmentFilter === 'All' || c.segment === segmentFilter;
    return matchSearch && matchSegment;
  });

  const vipCount = customers.filter((c) => c.segment === 'VIP').length;
  const openCount = customers.reduce((acc, c) => acc + c.openComplaints, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Customers</h1>
              <p className="text-sm text-gray-500">Your assigned customer portfolio</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/complaint/customer')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Mic className="w-4 h-4" />
            Record Complaint
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">VIP Customers</p>
              <p className="text-2xl font-bold text-gray-800">{vipCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Open Complaints</p>
              <p className="text-2xl font-bold text-gray-800">{openCount}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or account number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            {(['All', 'VIP', 'Standard'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setSegmentFilter(seg)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  segmentFilter === seg
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Cards */}
        <div className="space-y-4">
          {filtered.map((customer) => {
            const sc = sentimentConfig[customer.sentiment] ?? sentimentConfig['Neutral'];
            return (
              <div
                key={customer.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-5">
                    {/* Avatar */}
                    <div
                      className={`${customer.avatarColor} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                    >
                      {customer.avatar}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-bold text-gray-800 text-lg">{customer.name}</h3>
                        {customer.segment === 'VIP' && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            <Star className="w-3 h-3" />
                            VIP
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                          {customer.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {customer.accountType} · {customer.accountNo} · Customer since {customer.since}
                      </p>

                      {/* Contact Row */}
                      <div className="flex items-center gap-5 flex-wrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {customer.email}
                        </div>
                      </div>
                    </div>

                    {/* Complaint Stats */}
                    <div className="flex items-start gap-6 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{customer.totalComplaints}</p>
                        <p className="text-xs text-gray-500">Total</p>
                      </div>
                      <div className="text-center">
                        {customer.openComplaints > 0 ? (
                          <>
                            <p className="text-2xl font-bold text-orange-600">{customer.openComplaints}</p>
                            <p className="text-xs text-orange-500">Open</p>
                          </>
                        ) : (
                          <>
                            <p className="text-2xl font-bold text-green-600">{customer.openComplaints}</p>
                            <p className="text-xs text-green-500">Open</p>
                          </>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{customer.resolvedComplaints}</p>
                        <p className="text-xs text-gray-500">Resolved</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Last contact: {customer.lastContact}
                    </div>
                    <div className="flex items-center gap-1">
                      {customer.sentimentTrend === 'up' && (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-600">Improving</span>
                        </>
                      )}
                      {customer.sentimentTrend === 'down' && (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-500" />
                          <span className="text-red-600">Declining</span>
                        </>
                      )}
                      {customer.sentimentTrend === 'stable' && (
                        <>
                          <Minus className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">Stable</span>
                        </>
                      )}
                    </div>
                    {customer.openComplaints > 0 && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        {customer.openComplaints} open complaint{customer.openComplaints > 1 ? 's' : ''}
                      </div>
                    )}
                    {customer.openComplaints === 0 && customer.totalComplaints > 0 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        All resolved
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/complaint/customer')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
                    >
                      <Mic className="w-4 h-4" />
                      Record Complaint
                    </button>
                    <button
                      onClick={() => navigate('/complaints')}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-white transition"
                    >
                      View History
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-sm text-center">
              <p className="text-gray-500">No customers match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
