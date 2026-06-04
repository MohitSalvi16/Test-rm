import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Filter, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

export function ComplaintList() {
  const navigate = useNavigate();

  const complaints = [
    {
      id: 'CJ-2026-00124',
      customer: 'John Anderson',
      issue: 'Credit limit increase navigation issue',
      category: 'Long-Term Problem',
      status: 'Escalated',
      priority: 'High',
      date: 'June 4, 2026',
      sentiment: 'Frustrated',
      statusColor: 'orange',
      icon: AlertTriangle,
    },
    {
      id: 'CJ-2026-00123',
      customer: 'Sarah Mitchell',
      issue: 'Forgot internet banking password',
      category: 'Immediate Solvable',
      status: 'Resolved',
      priority: 'Low',
      date: 'June 4, 2026',
      sentiment: 'Neutral',
      statusColor: 'green',
      icon: CheckCircle,
    },
    {
      id: 'CJ-2026-00122',
      customer: 'Michael Chen',
      issue: 'Transaction dispute inquiry',
      category: 'Immediate Solvable',
      status: 'In Progress',
      priority: 'Medium',
      date: 'June 3, 2026',
      sentiment: 'Concerned',
      statusColor: 'blue',
      icon: Clock,
    },
    {
      id: 'CJ-2026-00121',
      customer: 'Emily Rodriguez',
      issue: 'Card activation delay',
      category: 'Long-Term Problem',
      status: 'Escalated',
      priority: 'High',
      date: 'June 3, 2026',
      sentiment: 'Angry',
      statusColor: 'orange',
      icon: AlertTriangle,
    },
    {
      id: 'CJ-2026-00120',
      customer: 'David Kim',
      issue: 'Mobile app login issues',
      category: 'Long-Term Problem',
      status: 'Pending',
      priority: 'Medium',
      date: 'June 2, 2026',
      sentiment: 'Frustrated',
      statusColor: 'yellow',
      icon: Clock,
    },
    {
      id: 'CJ-2026-00119',
      customer: 'Lisa Thompson',
      issue: 'ATM withdrawal problem',
      category: 'Irrelevant',
      status: 'Closed',
      priority: 'Low',
      date: 'June 2, 2026',
      sentiment: 'Neutral',
      statusColor: 'gray',
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">All Complaints</h1>
          </div>
          <button
            onClick={() => navigate('/complaint/customer')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            New Complaint
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by complaint ID, customer name, or issue..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Issue</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {complaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    onClick={() => navigate(`/complaints/${complaint.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4">
                      <p className="font-mono text-sm text-indigo-600 font-medium">{complaint.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{complaint.customer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{complaint.issue}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{complaint.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <complaint.icon className={`w-4 h-4 text-${complaint.statusColor}-600`} />
                        <span className={`text-${complaint.statusColor}-600 font-medium text-sm`}>
                          {complaint.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          complaint.priority === 'High'
                            ? 'bg-red-100 text-red-700'
                            : complaint.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{complaint.date}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
