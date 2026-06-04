import { useNavigate } from 'react-router';
import { AlertTriangle, TrendingUp, Save, ArrowRight, Users, RefreshCw } from 'lucide-react';

export function AIClassification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Issue Classification Result</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Category Badge */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Category 3</h2>
          <p className="text-xl text-orange-600 font-medium">Long-Term Problem</p>
        </div>

        {/* Reason Cards */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
            Classification Reason
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Recurring issue across multiple customer touchpoints</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Multiple customers impacted by the same problem</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Product experience problem requiring design changes</p>
            </div>
          </div>
        </div>

        {/* Impact Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-gray-800">Impact Score</h3>
            </div>
            <span className="text-3xl font-bold text-red-600">87/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 h-4 rounded-full" style={{ width: '87%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            High impact issue affecting customer experience and satisfaction
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <p className="text-gray-700 font-medium">Affected Customers</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">324+</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="w-5 h-5 text-purple-600" />
              <p className="text-gray-700 font-medium">Recurring Rate</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">68%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/complaint/summary')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Draft
          </button>
          <button
            onClick={() => navigate('/complaint/similar')}
            className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2"
          >
            Escalate
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
