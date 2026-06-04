import { useNavigate } from 'react-router';
import { AlertCircle, Smartphone, Phone, Building, Star, TrendingDown, ArrowRight } from 'lucide-react';

export function SimilarComplaints() {
  const navigate = useNavigate();

  const channels = [
    { name: 'Mobile App', count: 156, icon: Smartphone, color: 'blue' },
    { name: 'Call Center', count: 89, icon: Phone, color: 'green' },
    { name: 'Branch Feedback', count: 45, icon: Building, color: 'purple' },
    { name: 'App Store Reviews', count: 34, icon: Star, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Similar Complaints Found</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* AI Insight Alert */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Pattern Detected</h3>
              <p className="text-indigo-100 text-lg">
                We found <span className="font-bold text-white text-2xl">324 similar complaints</span> related to this issue.
              </p>
              <p className="text-indigo-100 mt-2 text-sm">
                This indicates a systemic problem requiring immediate attention from the product team.
              </p>
            </div>
          </div>
        </div>

        {/* Affected Channels */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Affected Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className={`bg-${channel.color}-50 border border-${channel.color}-200 rounded-lg p-4 flex items-center gap-4`}
              >
                <div className={`bg-${channel.color}-100 p-3 rounded-lg`}>
                  <channel.icon className={`w-6 h-6 text-${channel.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{channel.name}</p>
                  <p className="text-sm text-gray-600">Channel feedback</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold text-${channel.color}-600`}>{channel.count}</p>
                  <p className="text-xs text-gray-600">complaints</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop-off Point */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">Primary Drop-Off Point</h3>
              <p className="text-xl text-gray-800 font-medium mb-3">Credit Limit Increase Flow</p>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-gray-700 text-sm mb-2">
                  <span className="font-bold">68%</span> of users abandon the process at the navigation step
                </p>
                <p className="text-gray-600 text-sm">
                  Users are unable to locate the "Increase Credit Limit" option in the mobile app menu structure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">Complaint Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="flex-1 bg-red-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Last 7 days</p>
                <p className="font-bold text-gray-800">124 complaints</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <div className="flex-1 bg-orange-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Last 30 days</p>
                <p className="font-bold text-gray-800">324 complaints</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="flex-1 bg-yellow-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Last 90 days</p>
                <p className="font-bold text-gray-800">487 complaints</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={() => navigate('/complaint/escalation')}
          className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-lg font-medium"
        >
          Continue to Escalation
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
