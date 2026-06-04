import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  ImagePlus,
  Trash2,
  ZoomIn,
  X,
  FileImage,
  ChevronDown,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
}

const CATEGORIES = [
  'Mobile App Issue',
  'Internet Banking',
  'Transaction Error',
  'Card Problem',
  'Account Access',
  'Payment Failure',
  'Other',
];

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function ScreenshotComplaint() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImg, setPreviewImg] = useState<UploadedImage | null>(null);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    Array.from(files).forEach((file) => {
      if (!allowed.includes(file.type)) return;
      setImages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: formatSize(file.size),
          url: URL.createObjectURL(file),
        },
      ]);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
    if (previewImg?.id === id) setPreviewImg(null);
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      setError('Please upload at least one screenshot.');
      return;
    }
    if (!customerName.trim()) {
      setError('Please enter the customer name.');
      return;
    }
    if (!category) {
      setError('Please select a complaint category.');
      return;
    }
    setError('');
    setSubmitting(true);
    setTimeout(() => navigate('/complaint/processing'), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/complaint/method')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Upload Screenshot Complaint</h1>
            <p className="text-sm text-gray-500">Attach screenshots and describe the issue</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          {['Upload Screenshots', 'Add Details', 'Submit'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-sm ${i === 0 ? 'font-medium text-gray-800' : 'text-gray-400'}`}>
                {step}
              </span>
              {i < 2 && <div className="w-8 h-px bg-gray-300 mx-1" />}
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileImage className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-gray-800">Screenshots</h2>
            {images.length > 0 && (
              <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                {images.length} file{images.length > 1 ? 's' : ''} attached
              </span>
            )}
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDragging ? 'bg-indigo-100' : 'bg-gray-100'
              }`}
            >
              <ImagePlus className={`w-8 h-8 ${isDragging ? 'text-indigo-600' : 'text-gray-400'}`} />
            </div>
            <p className="font-medium text-gray-700 mb-1">
              <span className="text-indigo-600">Click to upload</span> or drag & drop
            </p>
            <p className="text-sm text-gray-400">PNG, JPG, GIF, WEBP — multiple files supported</p>
          </div>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm"
                >
                  {/* Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                    #{idx + 1}
                  </div>
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-36 object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => { e.stopPropagation(); setPreviewImg(img); }}
                      className="p-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
                      title="Preview"
                    >
                      <ZoomIn className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                      className="p-2 bg-white rounded-lg shadow hover:bg-red-50 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  {/* File info */}
                  <div className="px-3 py-2 bg-white border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-700 truncate">{img.name}</p>
                    <p className="text-xs text-gray-400">{img.size}</p>
                  </div>
                </div>
              ))}

              {/* Add more tile */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="h-36 rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-indigo-600"
              >
                <ImagePlus className="w-7 h-7" />
                <span className="text-xs font-medium">Add more</span>
              </button>
            </div>
          )}
        </div>

        {/* Complaint Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <h2 className="font-bold text-gray-800">Complaint Details</h2>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Issue Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none text-sm bg-white"
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Additional Notes
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Describe what the customer experienced, any error messages shown, steps they took before the issue occurred..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{notes.length} characters</p>
          </div>
        </div>

        {/* AI notice */}
        <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-700">
            The AI will analyse your screenshots and notes to automatically classify the complaint, detect similar issues, and suggest a resolution path.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pb-8">
          <button
            onClick={() => navigate('/complaint/method')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Submitting to AI...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Submit for AI Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setPreviewImg(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800 text-sm">{previewImg.name}</p>
                <p className="text-xs text-gray-400">{previewImg.size}</p>
              </div>
              <button
                onClick={() => setPreviewImg(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <img
              src={previewImg.url}
              alt={previewImg.name}
              className="w-full max-h-[75vh] object-contain bg-gray-50"
            />
          </div>
        </div>
      )}
    </div>
  );
}
