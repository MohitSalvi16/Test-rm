import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, CheckCircle } from 'lucide-react';

export function AIProcessing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Speech-to-Text',
    'Intent Detection',
    'Sentiment Analysis',
    'Journey Mapping',
    'Issue Classification',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => navigate('/complaint/summary'), 1000);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mb-6">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Processing</h2>
            <p className="text-gray-600">Analyzing customer feedback...</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center gap-4 p-4 rounded-lg transition ${
                  index <= currentStep ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep
                      ? 'bg-green-500'
                      : index === currentStep
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : index === currentStep ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <span className="text-white text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      index <= currentStep ? 'text-gray-800' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {index < currentStep && (
                  <span className="text-green-600 text-sm font-medium">Complete</span>
                )}
                {index === currentStep && (
                  <span className="text-indigo-600 text-sm font-medium">Processing...</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Our AI is analyzing the complaint to provide accurate insights and recommendations...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
