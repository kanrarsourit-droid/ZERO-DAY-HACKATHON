import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  UploadCloud,
  FileImage,
  AlertCircle,
  RotateCw,
  Loader2,
  X,
  FileWarning,
  CheckCircle2,
} from 'lucide-react';

const FILE_CONTAINER_ID = 'qr-file-decoder-temp';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
];

export default function ImageUploadScanner({ onScanSuccess, onError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef(null);
  const currentPreviewRef = useRef(null);

  // Keep preview ref in sync for cleanup
  useEffect(() => {
    currentPreviewRef.current = previewUrl;
  }, [previewUrl]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (currentPreviewRef.current) {
        URL.revokeObjectURL(currentPreviewRef.current);
      }
    };
  }, []);

  const resetSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setUploadError(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateAndProcessFile = async (file) => {
    if (!file) return;

    resetSelection();
    setUploadError(null);

    // 1. Validate file extension & mime type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isSvg = fileExt === 'svg' || file.type.includes('svg');
    const isAllowedType = ALLOWED_MIME_TYPES.includes(file.type) || ['png', 'jpg', 'jpeg', 'webp'].includes(fileExt);

    if (isSvg) {
      const err = 'SVG format is not accepted for security sandboxing. Please upload a raster image (.png, .jpg, or .webp).';
      setUploadError(err);
      if (onError) onError(err);
      return;
    }

    if (!isAllowedType) {
      const err = `Unsupported file type (${file.type || fileExt}). Please upload a valid PNG, JPG, or WEBP image.`;
      setUploadError(err);
      if (onError) onError(err);
      return;
    }

    // 2. Validate file size (10 MB maximum)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const err = `File size (${sizeMB} MB) exceeds the maximum allowed 10 MB limit.`;
      setUploadError(err);
      if (onError) onError(err);
      return;
    }

    // 3. Create local preview URL
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setIsProcessing(true);

    // 4. Decode QR barcode using Html5Qrcode
    try {
      // Ensure the hidden container exists
      const html5QrCode = new Html5Qrcode(FILE_CONTAINER_ID);
      
      try {
        const decodedText = await html5QrCode.scanFile(file, false);
        setIsProcessing(false);
        onScanSuccess(decodedText, `Image File (${file.name})`);
      } catch (decodeErr) {
        setIsProcessing(false);
        const errMessage = 'No QR code detected in the uploaded image. Please ensure the code is clear, well-lit, and uncropped.';
        setUploadError(errMessage);
        if (onError) onError(errMessage);
      } finally {
        try {
          html5QrCode.clear();
        } catch {}
      }
    } catch (engineErr) {
      setIsProcessing(false);
      const errMessage = 'Unable to initialize image decoder engine.';
      setUploadError(errMessage);
      if (onError) onError(errMessage);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="rounded-2xl bg-shield-900 border border-shield-border overflow-hidden relative shadow-lg">
      {/* Hidden container required by Html5Qrcode for file processing */}
      <div id={FILE_CONTAINER_ID} className="hidden" />

      {/* Top Header */}
      <div className="h-11 bg-shield-950 px-4 border-b border-shield-border flex items-center justify-between text-xs font-mono text-shield-dim">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white font-medium">LOCAL FILE INGESTION</span>
        </div>
        <span>ACCEPTED: PNG, JPG, JPEG, WEBP (&le;10MB)</span>
      </div>

      {/* Upload & Dropzone Area */}
      <div className="p-5 sm:p-6 bg-shield-950/60 min-h-[340px] flex flex-col justify-center">
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload State or Preview State */}
        {!previewUrl ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
              isDragging
                ? 'border-emerald-400 bg-emerald-500/10 scale-[0.99]'
                : 'border-shield-700 hover:border-emerald-500/50 bg-shield-900/40 hover:bg-shield-900/70'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-shield-850 border border-shield-700 flex items-center justify-center text-emerald-400 mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-base font-semibold text-white mb-1.5">
              Drag & Drop QR image file here
            </h3>
            <p className="text-xs text-shield-muted max-w-sm mb-4 leading-relaxed font-sans">
              Upload screenshot, printed ticket photo, flyer graphic, or invoice image containing an encoded barcode.
            </p>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-xs font-semibold uppercase tracking-wider transition-colors">
                Browse Files
              </span>
              <span className="text-xs font-mono text-shield-dim">
                Max 10 MB (PNG, JPG, WEBP)
              </span>
            </div>
          </div>
        ) : (
          /* Image Preview & Processing State */
          <div className="space-y-4">
            <div className="relative rounded-xl bg-shield-900 border border-shield-700 p-4 flex flex-col sm:flex-row items-center gap-5">
              {/* Image thumbnail */}
              <div className="w-36 h-36 rounded-lg bg-shield-950 border border-shield-800 flex items-center justify-center overflow-hidden shrink-0 relative">
                <img
                  src={previewUrl}
                  alt="Uploaded QR Preview"
                  className="w-full h-full object-contain"
                />

                {isProcessing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                  </div>
                )}
              </div>

              {/* File details & decoding progress */}
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-mono font-semibold text-white truncate max-w-xs">
                    {selectedFile?.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-shield-800 text-shield-dim border border-shield-700">
                    {(selectedFile?.size / 1024).toFixed(1)} KB
                  </span>
                </div>

                {isProcessing ? (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Decoding matrix symbology...</span>
                  </div>
                ) : uploadError ? (
                  <div className="text-xs font-mono text-rose-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Scan failed</span>
                  </div>
                ) : (
                  <div className="text-xs font-mono text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Decoded successfully</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetSelection}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-shield-800 hover:bg-shield-750 text-white border border-shield-700 text-xs font-mono transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-shield-muted" />
                    <span>Select Different Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error notification banner */}
        {uploadError && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-sans">
              <strong className="font-mono text-rose-400 mr-1 uppercase">Error:</strong>
              {uploadError}
            </div>
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="p-3 bg-shield-950 border-t border-shield-border flex items-center justify-between text-xs font-mono text-shield-dim">
        <span>Zero-Trust local sandboxed decode</span>
        <span>SVG rejected • Raster only</span>
      </div>
    </div>
  );
}
