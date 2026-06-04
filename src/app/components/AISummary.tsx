import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Edit, CheckCircle, Save, Target, Frown, Smartphone, FileText } from 'lucide-react';

export function AISummary() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [intent, setIntent] = useState('Increase Credit Limit');
  const [sentiment, setSentiment] = useState('Frustrated');
  const [painPoint, setPainPoint] = useState('Navigation confusion');
  const [product, setProduct] = useState('Mobile Banking App');
  const [summary, setSummary] = useState(
    "Customer is unable to find the credit limit increase option within the mobile application. " +
    "The user expressed frustration with the current navigation structure and difficulty locating " +
    "the feature despite multiple attempts."
  );

  const editClasses =
    'w-full bg-transparent border-b border-indigo-300 focus:border-indigo-500 focus:outline-none';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AI Generated Summary</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">AI Analysis Complete</h3>
              <p className="text-gray-600 text-sm">
                We've analyzed the customer's complaint and extracted key insights.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Customer Intent */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-700">Customer Intent</h3>
            </div>
            {isEditing ? (
              <input
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className={`text-2xl font-bold text-gray-800 ${editClasses}`}
              />
            ) : (
              <p className="text-2xl font-bold text-gray-800">{intent}</p>
            )}
          </div>

          {/* Sentiment */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Frown className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-700">Sentiment</h3>
            </div>
            {isEditing ? (
              <input
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value)}
                className={`text-2xl font-bold text-orange-600 ${editClasses}`}
              />
            ) : (
              <p className="text-2xl font-bold text-orange-600">{sentiment}</p>
            )}
          </div>

          {/* Pain Point */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-700">Pain Point</h3>
            </div>
            {isEditing ? (
              <input
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                className={`text-xl font-bold text-gray-800 ${editClasses}`}
              />
            ) : (
              <p className="text-xl font-bold text-gray-800">{painPoint}</p>
            )}
          </div>

          {/* Product */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-700">Product</h3>
            </div>
            {isEditing ? (
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className={`text-xl font-bold text-gray-800 ${editClasses}`}
              />
            ) : (
              <p className="text-xl font-bold text-gray-800">{product}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-700">Summary</h3>
          </div>
          {isEditing ? (
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              className="w-full text-gray-700 leading-relaxed bg-transparent border border-indigo-300 rounded-lg p-3 focus:border-indigo-500 focus:outline-none resize-y"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing((v) => !v)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={() => navigate('/complaint/classification')}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
