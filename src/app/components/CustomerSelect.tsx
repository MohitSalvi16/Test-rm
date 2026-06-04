import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Search,
  User,
  Star,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle,
  UserPlus,
  X,
} from 'lucide-react';

const customers = [
  { id: 'C001', name: 'John Anderson',   accountNo: '•••• 4821', accountType: 'Premier Banking', segment: 'VIP',      phone: '+65 9123 4567', email: 'john.anderson@email.com',  avatar: 'JA', avatarColor: 'bg-indigo-600' },
  { id: 'C002', name: 'Sarah Mitchell',  accountNo: '•••• 7743', accountType: 'Savings Account', segment: 'Standard', phone: '+65 8234 5678', email: 'sarah.mitchell@email.com',  avatar: 'SM', avatarColor: 'bg-emerald-600' },
  { id: 'C003', name: 'Michael Chen',    accountNo: '•••• 3390', accountType: 'Business Account',segment: 'VIP',      phone: '+65 9345 6789', email: 'm.chen@email.com',           avatar: 'MC', avatarColor: 'bg-blue-600' },
  { id: 'C004', name: 'Emily Rodriguez', accountNo: '•••• 5512', accountType: 'Premier Banking', segment: 'VIP',      phone: '+65 8456 7890', email: 'emily.r@email.com',          avatar: 'ER', avatarColor: 'bg-rose-600' },
  { id: 'C005', name: 'David Kim',       accountNo: '•••• 8891', accountType: 'Savings Account', segment: 'Standard', phone: '+65 9567 8901', email: 'david.kim@email.com',        avatar: 'DK', avatarColor: 'bg-violet-600' },
  { id: 'C006', name: 'Lisa Thompson',   accountNo: '•••• 2267', accountType: 'Fixed Deposit',   segment: 'Standard', phone: '+65 8678 9012', email: 'lisa.t@email.com',           avatar: 'LT', avatarColor: 'bg-teal-600' },
  { id: 'C007', name: 'Robert Tan',      accountNo: '•••• 9954', accountType: 'Premier Banking', segment: 'VIP',      phone: '+65 9789 0123', email: 'robert.tan@email.com',       avatar: 'RT', avatarColor: 'bg-amber-600' },
  { id: 'C008', name: 'Priya Sharma',    accountNo: '•••• 1135', accountType: 'Business Account',segment: 'VIP',      phone: '+65 8890 1234', email: 'priya.s@email.com',          avatar: 'PS', avatarColor: 'bg-pink-600' },
];

type Customer = typeof customers[number];

export function CustomerSelect() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [idQuery, setIdQuery] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mode, setMode] = useState<'existing' | 'new'>('existing');
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const filtered = customers.filter((c) => {
    const q = query.toLowerCase();
    const idQ = idQuery.toLowerCase();
    const matchName = c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    const matchId = idQ ? c.id.toLowerCase().includes(idQ) || c.accountNo.includes(idQ) : true;
    return matchName && matchId;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectCustomer = (c: Customer) => {
    setSelected(c);
    setQuery(c.name);
    setIdQuery(c.id);
    setShowDropdown(false);
  };

  const clearSelection = () => {
    setSelected(null);
    setQuery('');
    setIdQuery('');
  };

  const canContinue = true;

  const handleContinue = () => {
    navigate('/complaint/method');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">New Complaint</h1>
            <p className="text-sm text-gray-500">Step 1 of 2 — Identify the customer</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">1</div>
            <span className="text-sm font-medium text-gray-800">Customer</span>
          </div>
          <div className="flex-1 h-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-sm text-gray-400">Capture Method</span>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6 bg-white shadow-sm">
          <button
            onClick={() => { setMode('existing'); clearSelection(); }}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition ${
              mode === 'existing' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Search className="w-4 h-4" />
            Existing Customer
          </button>
          <button
            onClick={() => { setMode('new'); clearSelection(); }}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition ${
              mode === 'new' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Walk-in / New Customer
          </button>
        </div>

        {mode === 'existing' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-800">Search Customer</h2>

            {/* Name search */}
            <div ref={searchRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Customer Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(null);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {query && (
                  <button
                    onClick={clearSelection}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {showDropdown && query && !selected && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-4 text-sm text-gray-500 text-center">No customers found</div>
                  ) : (
                    filtered.slice(0, 6).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => selectCustomer(c)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-indigo-50 transition text-left border-b border-gray-100 last:border-0"
                      >
                        <div className={`${c.avatarColor} w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {c.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                            {c.segment === 'VIP' && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                                <Star className="w-2.5 h-2.5" />VIP
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{c.email} · {c.accountNo}</p>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">{c.id}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Customer ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Customer ID <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={idQuery}
                onChange={(e) => {
                  setIdQuery(e.target.value);
                  if (selected) setSelected(null);
                }}
                placeholder="e.g. C001"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Selected customer card */}
            {selected && (
              <div className="border-2 border-indigo-300 rounded-xl p-5 bg-indigo-50">
                <div className="flex items-start gap-4">
                  <div className={`${selected.avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {selected.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-bold text-gray-800">{selected.name}</p>
                      {selected.segment === 'VIP' && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3" />VIP
                        </span>
                      )}
                      <span className="ml-auto text-xs font-mono bg-white border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
                        {selected.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{selected.accountType} · {selected.accountNo}</p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {selected.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {selected.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={clearSelection}
                    className="p-1.5 hover:bg-indigo-100 rounded-lg transition text-indigo-400 hover:text-indigo-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Customer verified
                </div>
              </div>
            )}
          </div>
        ) : (
          /* New / walk-in customer */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <UserPlus className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                Use this for walk-in customers or those not yet in your portfolio.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Customer Full Name <span className="text-gray-400 font-normal ml-1">(optional)</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Customer ID / NRIC / Passport <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                placeholder="e.g. S1234567A or passport number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {newName && newId && (
              <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Ready to proceed as: <span className="font-medium">{newName}</span>
              </div>
            )}
          </div>
        )}

        {/* Continue */}
        <div className="mt-6">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Capture Method
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            Customer details are optional — you can skip and fill them in later.
          </p>
        </div>
      </div>
    </div>
  );
}
