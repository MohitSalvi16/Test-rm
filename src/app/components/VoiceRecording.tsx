import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Mic, Square, X, ImagePlus, Trash2, ZoomIn, FileImage } from 'lucide-react';

interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
}

export function VoiceRecording() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImg, setPreviewImg] = useState<UploadedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    Array.from(files).forEach((file) => {
      if (!allowed.includes(file.type)) return;
      const url = URL.createObjectURL(file);
      setImages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: formatSize(file.size),
          url,
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

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => setShowTranscript(true), 2000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setTimeout(() => navigate('/complaint/processing'), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Voice Recording</h2>
            <p className="text-gray-600">Listen to the customer and record their complaint</p>
          </div>

          {/* Recording Animation */}
          <div className="flex flex-col items-center mb-8">
            <div className={`relative ${isRecording ? 'animate-pulse' : ''}`}>
              <div
                className={`w-40 h-40 rounded-full flex items-center justify-center ${
                  isRecording
                    ? 'bg-red-500 shadow-lg shadow-red-300'
                    : 'bg-indigo-500 shadow-lg shadow-indigo-300'
                }`}
              >
                <Mic className="w-20 h-20 text-white" />
              </div>
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
              )}
            </div>
            <div className="mt-8 text-center">
              <p className="text-5xl font-bold text-gray-800 font-mono">{formatTime(recordingTime)}</p>
              <p className="text-gray-600 mt-2">
                {isRecording ? 'Recording in progress...' : 'Ready to record'}
              </p>
            </div>
          </div>

          {/* Live Transcript */}
          {showTranscript && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Live Transcript:</p>
              <p className="text-gray-700 italic">
                "I've been trying to increase my credit card limit from the mobile app but the process is very confusing."
              </p>
            </div>
          )}

          {/* ── Screenshot Upload ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FileImage className="w-4 h-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">
                Attach Screenshots <span className="text-gray-400 font-normal">(optional)</span>
              </p>
              {images.length > 0 && (
                <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                  {images.length} attached
                </span>
              )}
            </div>

            {/* Drop Zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition ${
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
              <ImagePlus className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-600">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WEBP supported</p>
            </div>

            {/* Image Thumbnails */}
            {images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {images.map((img) => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-24 object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); setPreviewImg(img); }}
                        className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition"
                        title="Preview"
                      >
                        <ZoomIn className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                        className="p-1.5 bg-white rounded-lg hover:bg-red-50 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    {/* File name */}
                    <div className="px-2 py-1 bg-white border-t border-gray-200">
                      <p className="text-xs text-gray-600 truncate">{img.name}</p>
                      <p className="text-xs text-gray-400">{img.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {!isRecording ? (
              <>
                <button
                  onClick={() => navigate('/complaint/consent')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  onClick={handleStartRecording}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <Mic className="w-5 h-5" />
                  Start Recording
                </button>
              </>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 shadow-lg"
              >
                <Square className="w-5 h-5" />
                Stop Recording
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Preview */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setPreviewImg(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800 text-sm">{previewImg.name}</p>
                <p className="text-xs text-gray-500">{previewImg.size}</p>
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
              className="w-full max-h-[70vh] object-contain bg-gray-50"
            />
          </div>
        </div>
      )}
    </div>
  );
}
