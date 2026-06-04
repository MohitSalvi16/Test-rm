import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, XCircle, Shield } from 'lucide-react';

export function ConsentCapture() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);

  const handleConsent = () => {
    if (consent) {
      navigate('/complaint/record');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Shield className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Customer Recording Consent
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 text-center">
              Customer consent is required before recording.
            </p>
            <p className="text-gray-600 text-sm text-center mt-2">
              Please ensure the customer has verbally agreed to be recorded for quality and training purposes.
            </p>
          </div>

          <div className="mb-8">
            <label className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded"
              />
              <span className="text-gray-700 font-medium">
                I confirm that customer consent has been obtained
              </span>
              {consent && <CheckCircle className="w-5 h-5 text-green-500" />}
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/complaint/method')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <XCircle className="w-5 h-5" />
              Cancel
            </button>
            <button
              onClick={handleConsent}
              disabled={!consent}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition ${
                consent
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              Consent Obtained ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
