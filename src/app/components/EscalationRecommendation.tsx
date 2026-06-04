import { useNavigate } from 'react-router';
import { Sparkles, Users, Palette, AlertTriangle, CheckCircle, Edit } from 'lucide-react';

export function EscalationRecommendation() {
  const navigate = useNavigate();

  const teams = [
    { name: 'Product Team', icon: Users, color: 'blue', role: 'Feature prioritization and roadmap planning' },
    { name: 'UX Design Team', icon: Palette, color: 'purple', role: 'Navigation redesign and user flow optimization' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AI Escalation Recommendation</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* AI Recommendation Badge */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">AI-Generated Recommendation</h3>
              <p className="text-gray-600">
                Based on analysis of 324 similar complaints and user behavior patterns, our AI suggests the following escalation strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Teams Impacted */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Teams to Involve
          </h3>
          <div className="space-y-4">
            {teams.map((team) => (
              <div
                key={team.name}
                className={`bg-${team.color}-50 border border-${team.color}-200 rounded-lg p-4`}
              >
                <div className="flex items-start gap-3">
                  <div className={`bg-${team.color}-100 p-2 rounded-lg flex-shrink-0`}>
                    <team.icon className={`w-5 h-5 text-${team.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 mb-1">{team.name}</p>
                    <p className="text-sm text-gray-600">{team.role}</p>
                  </div>
                  <CheckCircle className={`w-5 h-5 text-${team.color}-600 flex-shrink-0`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Level */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Suggested Priority Level</h3>
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 flex items-center gap-4">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-red-600 mb-1">HIGH PRIORITY</p>
              <p className="text-gray-700">
                Immediate attention required due to high impact score and customer volume
              </p>
            </div>
          </div>
        </div>

        {/* Root Cause */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">Suggested Root Cause</h3>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-5 border border-orange-200">
            <p className="text-gray-800 leading-relaxed">
              Users cannot discover the credit limit increase option in the mobile app due to poor information architecture. 
              The feature is buried within nested menus, making it difficult for customers to find. 
              <span className="font-bold"> Recommendation: Promote this feature to a more prominent location in the app navigation.</span>
            </p>
          </div>
        </div>

        {/* Expected Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">Expected Resolution Timeline</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Team Review</p>
              <p className="text-xl font-bold text-blue-600">48 hours</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Design Sprint</p>
              <p className="text-xl font-bold text-purple-600">1-2 weeks</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Implementation</p>
              <p className="text-xl font-bold text-green-600">2-4 weeks</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/complaint/escalation')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Edit className="w-5 h-5" />
            Modify
          </button>
          <button
            onClick={() => navigate('/complaint/escalation-success')}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Accept Recommendation
          </button>
        </div>
      </div>
    </div>
  );
}
