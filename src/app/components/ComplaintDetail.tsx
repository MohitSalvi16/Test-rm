import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  User,
  Calendar,
  Tag,
  AlertTriangle,
  TrendingUp,
  FileText,
  Users,
  Target,
  Frown,
  Pencil,
  X,
  Check,
  ChevronDown,
} from 'lucide-react';

const STATUSES = ['Escalated', 'In Progress', 'Pending', 'Resolved', 'Closed'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const CATEGORIES = ['Long-Term Problem', 'Immediate Solvable', 'Irrelevant'];

export function ComplaintDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initial = {
    id: id || 'CJ-2026-00124',
    customer: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    issue: 'Credit limit increase navigation issue',
    description:
      "I've been trying to increase my credit card limit from the mobile app but the process is very confusing. I can't find where to do it.",
    category: 'Long-Term Problem',
    status: 'Escalated',
    priority: 'High',
    date: 'June 4, 2026',
    time: '10:23 AM',
    intent: 'Increase Credit Limit',
    sentiment: 'Frustrated',
    product: 'Mobile Banking App',
    impactScore: 87,
    similarComplaints: 324,
    assignedTeams: ['Product Team', 'UX Design Team'],
    notes: '',
  };

  const [complaint, setComplaint] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initial);
  const [saved, setSaved] = useState(false);

  const startEdit = () => {
    setDraft(complaint);
    setEditing(true);
    setSaved(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(complaint);
  };

  const saveEdit = () => {
    setComplaint(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = <K extends keyof typeof draft>(key: K) => draft[key];
  const set = <K extends keyof typeof draft>(key: K, val: typeof draft[K]) =>
    setDraft((d) => ({ ...d, [key]: val }));

  const statusColor: Record<string, string> = {
    Escalated: 'bg-orange-100 text-orange-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Resolved: 'bg-green-100 text-green-700',
    Closed: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/complaints')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">Complaint Details</h1>
            <p className="text-gray-500 text-sm">ID: {complaint.id}</p>
          </div>

          {/* Status badge — editable when in edit mode */}
          {editing ? (
            <div className="relative">
              <select
                value={draft.status}
                onChange={(e) => set('status', e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-indigo-300 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          ) : (
            <span className={`px-4 py-2 rounded-lg font-medium text-sm ${statusColor[complaint.status] ?? 'bg-gray-100 text-gray-700'}`}>
              {complaint.status}
            </span>
          )}

          {/* Edit / Save / Cancel */}
          {!editing ? (
            <button
              onClick={startEdit}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={cancelEdit}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Save success banner */}
        {saved && (
          <div className="bg-green-50 border-t border-green-200 px-6 py-2 flex items-center gap-2 text-green-700 text-sm">
            <Check className="w-4 h-4" />
            Changes saved successfully.
          </div>
        )}
        {editing && (
          <div className="bg-indigo-50 border-t border-indigo-200 px-6 py-2 text-indigo-700 text-sm">
            You are in edit mode — make your changes and click <strong>Save Changes</strong>.
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Customer Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Name', key: 'customer' as const },
                  { label: 'Email', key: 'email' as const },
                  { label: 'Phone', key: 'phone' as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <p className="text-sm text-gray-500 mb-1">{label}</p>
                    {editing ? (
                      <input
                        value={String(field(key))}
                        onChange={(e) => set(key, e.target.value)}
                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">{complaint[key]}</p>
                    )}
                  </div>
                ))}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                  <p className="font-medium text-gray-800">{complaint.date} at {complaint.time}</p>
                </div>
              </div>
            </div>

            {/* Complaint Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Complaint Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Issue Summary</p>
                  {editing ? (
                    <input
                      value={draft.issue}
                      onChange={(e) => set('issue', e.target.value)}
                      className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{complaint.issue}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Description</p>
                  {editing ? (
                    <textarea
                      rows={4}
                      value={draft.description}
                      onChange={(e) => set('description', e.target.value)}
                      className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 italic">"{complaint.description}"</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    RM Notes
                    {!editing && !complaint.notes && (
                      <span className="text-gray-400 ml-1">(none)</span>
                    )}
                  </p>
                  {editing ? (
                    <textarea
                      rows={3}
                      value={draft.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder="Add your notes here..."
                      className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  ) : complaint.notes ? (
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <p className="text-gray-700">{complaint.notes}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">AI Analysis Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-gray-500">Customer Intent</p>
                  </div>
                  <p className="font-bold text-gray-800">{complaint.intent}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Frown className="w-4 h-4 text-orange-600" />
                    <p className="text-sm text-gray-500">Sentiment</p>
                  </div>
                  <p className="font-bold text-orange-600">{complaint.sentiment}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-purple-600" />
                    <p className="text-sm text-gray-500">Product</p>
                  </div>
                  <p className="font-bold text-gray-800">{complaint.product}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                  {editing ? (
                    <div className="relative">
                      <select
                        value={draft.category}
                        onChange={(e) => set('category', e.target.value)}
                        className="appearance-none w-full bg-white border border-indigo-300 rounded px-2 py-1 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 pr-6"
                      >
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  ) : (
                    <p className="font-bold text-gray-800">{complaint.category}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assigned Teams */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Assigned Teams
              </h3>
              {editing ? (
                <div className="space-y-2">
                  {draft.assignedTeams.map((team, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={team}
                        onChange={(e) => {
                          const updated = [...draft.assignedTeams];
                          updated[i] = e.target.value;
                          set('assignedTeams', updated);
                        }}
                        className="flex-1 px-3 py-2 border border-indigo-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => set('assignedTeams', draft.assignedTeams.filter((_, j) => j !== i))}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => set('assignedTeams', [...draft.assignedTeams, ''])}
                    className="text-sm text-indigo-600 hover:underline mt-1"
                  >
                    + Add team
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {complaint.assignedTeams.map((team) => (
                    <div key={team} className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <p className="font-medium text-gray-800">{team}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">

            {/* Priority */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Priority Level</h3>
              {editing ? (
                <div className="space-y-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => set('priority', p)}
                      className={`w-full py-2.5 rounded-lg border-2 font-medium text-sm transition ${
                        draft.priority === p
                          ? p === 'High'
                            ? 'border-red-500 bg-red-100 text-red-700'
                            : p === 'Medium'
                            ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
                            : 'border-gray-400 bg-gray-100 text-gray-700'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg text-center ${
                    complaint.priority === 'High'
                      ? 'bg-red-100 border-2 border-red-300'
                      : complaint.priority === 'Medium'
                      ? 'bg-yellow-100 border-2 border-yellow-300'
                      : 'bg-gray-100 border-2 border-gray-300'
                  }`}
                >
                  <AlertTriangle
                    className={`w-8 h-8 mx-auto mb-2 ${
                      complaint.priority === 'High'
                        ? 'text-red-600'
                        : complaint.priority === 'Medium'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}
                  />
                  <p
                    className={`text-2xl font-bold ${
                      complaint.priority === 'High'
                        ? 'text-red-600'
                        : complaint.priority === 'Medium'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {complaint.priority}
                  </p>
                </div>
              )}
            </div>

            {/* Impact Score */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                Impact Score
              </h3>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-red-600">{complaint.impactScore}/100</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full"
                  style={{ width: `${complaint.impactScore}%` }}
                />
              </div>
            </div>

            {/* Similar Complaints */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Similar Complaints</h3>
              <p className="text-sm text-gray-500 mb-4">Related issues found</p>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 text-center border border-orange-200">
                <p className="text-5xl font-bold text-orange-600 mb-1">{complaint.similarComplaints}</p>
                <p className="text-gray-700 text-sm">complaints detected</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Timeline
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Complaint Submitted', time: `${complaint.date} ${complaint.time}`, color: 'bg-indigo-600' },
                  { label: 'AI Analysis Complete', time: `${complaint.date} 10:24 AM`, color: 'bg-indigo-600' },
                  { label: 'Escalated to Teams', time: `${complaint.date} 10:25 AM`, color: 'bg-orange-500' },
                ].map((ev) => (
                  <div key={ev.label} className="flex gap-3">
                    <div className={`w-2 h-2 ${ev.color} rounded-full mt-2 flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{ev.label}</p>
                      <p className="text-xs text-gray-500">{ev.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
