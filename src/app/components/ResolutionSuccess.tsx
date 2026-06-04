import { useNavigate } from 'react-router';
import { CheckCircle, Clock, ThumbsUp, Home, List } from 'lucide-react';

export function ResolutionSuccess() {
  const navigate = useNavigate();

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
            Issue Resolved
          </h2>
          <p className="text-center text-gray-600 mb-8">
            The customer's complaint has been successfully resolved
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center border border-blue-200">
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Resolution Time</p>
              <p className="text-3xl font-bold text-blue-600">4 min</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center border border-purple-200">
              <div className="flex justify-center mb-2">
                <ThumbsUp className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-purple-600">Requested</p>
            </div>
          </div>

          {/* Resolution Details */}
          <div className="bg-gray-50 rounded-lg p-5 mb-8 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Resolution Summary</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Customer identity verified successfully</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">OTP sent to registered mobile number</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Password reset completed securely</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Customer confirmed successful login</p>
              </div>
            </div>
          </div>

          {/* Follow-up Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Next Steps:</span> A customer satisfaction survey has been sent 
              to gather feedback on this resolution. The response will help improve our service quality.
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
