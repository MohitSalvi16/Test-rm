import { useNavigate } from 'react-router';
import { Mic, Keyboard, Phone, ImagePlus, ArrowLeft } from 'lucide-react';

export function ComplaintCaptureMethod() {
  const navigate = useNavigate();

  const methods = [
    {
      id: 'voice',
      title: 'Record Customer Voice',
      description: 'Capture complaint through voice recording',
      icon: Mic,
      borderColor: 'border-indigo-200',
      hoverBorder: 'hover:border-indigo-400',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      action: () => navigate('/complaint/consent'),
    },
    {
      id: 'text',
      title: 'Type Complaint',
      description: 'Manually enter complaint details',
      icon: Keyboard,
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      action: () => navigate('/complaint/resolution'),
    },
    {
      id: 'call',
      title: 'Record Customer Call',
      description: 'Record live customer call',
      icon: Phone,
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      action: () => navigate('/complaint/consent'),
    },
    {
      id: 'screenshot',
      title: 'Upload Screenshot',
      description: "Attach screenshots of the customer's issue",
      icon: ImagePlus,
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: () => navigate('/complaint/screenshot'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/complaint/customer')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">New Complaint</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How would you like to register the complaint?
          </h2>
          <p className="text-gray-600">
            Choose the method that works best for capturing customer feedback
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={method.action}
              className={`bg-white p-8 rounded-xl shadow-sm border-2 ${method.borderColor} ${method.hoverBorder} hover:shadow-md transition group flex flex-col items-center text-center`}
            >
              <div
                className={`${method.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition`}
              >
                <method.icon className={`w-8 h-8 ${method.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{method.title}</h3>
              <p className="text-gray-500 text-sm">{method.description}</p>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          You can also attach supporting screenshots during voice or text capture
        </p>
      </div>
    </div>
  );
}
