import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles,
  Target,
  Smile,
  CheckCircle,
  Key,
  Shield,
  Smartphone,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Globe,
  MessageSquare,
  Bot,
  CreditCard,
  ExternalLink,
} from 'lucide-react';

const ecosystemSolutions = [
  {
    id: 'E1',
    title: 'Self-Service Password Reset Portal',
    description:
      'Customers can reset their own internet banking password 24/7 via the self-service portal — no RM involvement needed.',
    channel: 'Digital Portal',
    icon: Globe,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    tag: 'Self-Service',
    tagColor: 'bg-blue-100 text-blue-700',
    timeToResolve: 'Instantly',
    howToShare: 'Share link: ibanking.bank.com/reset',
  },
  {
    id: 'E2',
    title: 'Mobile App Biometric Login',
    description:
      'Customers who struggle with passwords can switch to fingerprint or Face ID login on the mobile app — eliminates password dependency.',
    channel: 'Mobile App',
    icon: Smartphone,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    tag: 'Preventive',
    tagColor: 'bg-emerald-100 text-emerald-700',
    timeToResolve: '2 min setup',
    howToShare: 'Guide customer through Settings → Security → Biometric',
  },
  {
    id: 'E3',
    title: 'In-App Chat Support Bot',
    description:
      'The AI chatbot inside the mobile app handles password resets and common queries without needing to contact the RM or call centre.',
    channel: 'Mobile App',
    icon: Bot,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    tag: 'AI-Assisted',
    tagColor: 'bg-purple-100 text-purple-700',
    timeToResolve: 'Instantly',
    howToShare: 'Open app → Help → Chat with Assistant',
  },
  {
    id: 'E4',
    title: 'Secure OTP via SMS/Email',
    description:
      'Standard bank OTP flow for identity verification. Already active on customer\'s account — no setup required.',
    channel: 'SMS / Email',
    icon: MessageSquare,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    tag: 'Active on Account',
    tagColor: 'bg-amber-100 text-amber-700',
    timeToResolve: '< 1 min',
    howToShare: 'Trigger from RM portal or customer self-service',
  },
];

export function AIResolution() {
  const navigate = useNavigate();
  const [ecosystemOpen, setEcosystemOpen] = useState(true);
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  const steps = [
    { icon: Shield, text: 'Verify customer identity' },
    { icon: Smartphone, text: 'Send OTP to registered mobile' },
    { icon: Key, text: 'Reset password securely' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AI Analysis Complete</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Success Badge */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Immediate Solvable Issue Detected</h3>
              <p className="text-gray-600">
                This complaint can be resolved right away. Follow the AI-recommended steps below.
              </p>
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-700">Intent</h3>
            </div>
            <p className="text-lg font-bold text-gray-800">Password Reset</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-700">Category</h3>
            </div>
            <p className="text-lg font-bold text-green-600">Immediate Solvable</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Smile className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-700">Confidence</h3>
            </div>
            <p className="text-lg font-bold text-purple-600">98%</p>
          </div>
        </div>

        {/* Customer Issue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">Customer Complaint</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 italic">
              "I forgot my internet banking password and need help resetting it."
            </p>
          </div>
        </div>

        {/* ── Ecosystem Solutions Panel ── */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 mb-6 overflow-hidden">
          <button
            onClick={() => setEcosystemOpen((v) => !v)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">Solutions Already in Our Ecosystem</p>
                <p className="text-xs text-gray-500">
                  {ecosystemSolutions.length} existing tools that could resolve or prevent this issue
                </p>
              </div>
              <span className="ml-2 px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full text-xs font-medium">
                NEW
              </span>
            </div>
            {ecosystemOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>

          {ecosystemOpen && (
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Before manually resolving, check if any of these bank solutions can help the customer directly — saving time for both of you.
              </p>
              <div className="space-y-3">
                {ecosystemSolutions.map((sol) => (
                  <div
                    key={sol.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedSolution(expandedSolution === sol.id ? null : sol.id)
                      }
                      className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition text-left"
                    >
                      <div className={`${sol.iconBg} p-2.5 rounded-lg flex-shrink-0`}>
                        <sol.icon className={`w-5 h-5 ${sol.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-gray-800">{sol.title}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sol.tagColor}`}>
                            {sol.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{sol.channel} · Resolves in {sol.timeToResolve}</p>
                      </div>
                      {expandedSolution === sol.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedSolution === sol.id && (
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100 bg-gray-50">
                        <p className="text-sm text-gray-700 mb-3 mt-3">{sol.description}</p>
                        <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-gray-200">
                          <ExternalLink className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-700 mb-0.5">How to share with customer</p>
                            <p className="text-xs text-indigo-600">{sol.howToShare}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  <span className="font-medium">Tip:</span> Sharing these self-service options with the customer reduces future RM contact for the same issue and improves customer independence.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Action */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-gray-800">AI Recommended Resolution</h3>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 mb-4">
            <p className="font-medium text-gray-800 mb-1">Recommended Action</p>
            <p className="text-xl text-indigo-600 font-bold">Password Reset Process</p>
          </div>
          <div className="space-y-3">
            <p className="font-medium text-gray-700 mb-2">Follow these steps:</p>
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                  <step.icon className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-gray-700">
                  <span className="font-bold text-gray-800">{index + 1}.</span> {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/complaint/resolution-success')}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
