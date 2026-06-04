import { useNavigate } from 'react-router';
import { CheckCircle, FileText, Users, Clock, Home, List } from 'lucide-react';

export function EscalationSuccess() {
  const navigate = useNavigate();

  const teams = ['Product Team', 'UX Design Team'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Escalation Submitted
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Your complaint has been successfully escalated to the relevant teams
          </p>

          {/* Details Grid */}
          <div className="space-y-4 mb-8">
            {/* Complaint ID */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Complaint ID</p>
                <p className="font-bold text-gray-800 text-lg">CJ-2026-00124</p>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-bold text-green-600 text-lg">Submitted</p>
              </div>
            </div>

            {/* Assigned Teams */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">Assigned Teams</p>
                  <div className="space-y-2">
                    {teams.map((team) => (
                      <div key={team} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="font-medium text-gray-800">{team}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Review */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Expected Review</p>
                <p className="font-bold text-gray-800 text-lg">48 Hours</p>
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              <span className="font-bold">What happens next?</span> The assigned teams will review the complaint 
              and similar cases. You'll receive updates on the progress and any actions taken.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/complaints')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <List className="w-5 h-5" />
              View All Complaints
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
