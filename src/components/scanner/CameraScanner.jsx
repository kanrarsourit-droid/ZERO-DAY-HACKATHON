import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Camera,
  VideoOff,
  Video,
  AlertCircle,
  RotateCw,
  Settings2,
  Shield,
  Loader2,
  Scan,
} from 'lucide-react';

const CAMERA_CONTAINER_ID = 'qr-camera-feed-container';

export default function CameraScanner({ onScanSuccess, onError }) {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [cameraState, setCameraState] = useState('idle'); // 'idle' | 'requesting' | 'active' | 'stopping' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  const html5QrCodeRef = useRef(null);
  const isScanningRef = useRef(false);
  const isInitializingRef = useRef(false);
  const isMountedRef = useRef(true);

  // Load available cameras when possible
  const enumerateCameras = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length > 0) {
        setCameras(devices);
        if (!selectedCameraId) {
          // Prefer back/environment camera if available, else first camera
          const backCam = devices.find((d) =>
            d.label.toLowerCase().includes('back') ||
            d.label.toLowerCase().includes('environment') ||
            d.label.toLowerCase().includes('rear')
          );
          setSelectedCameraId(backCam ? backCam.id : devices[0].id);
        }
      }
    } catch {
      // Camera permission might not be granted yet, will re-check after start
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    enumerateCameras();

    return () => {
      isMountedRef.current = false;
      // Stop camera if active during unmount
      if (html5QrCodeRef.current && isScanningRef.current) {
        try {
          html5QrCodeRef.current
            .stop()
            .then(() => {
              try {
                html5QrCodeRef.current.clear();
              } catch {}
            })
            .catch(() => {});
        } catch {}
      }
    };
  }, []);

  const stopCamera = async () => {
    if (html5QrCodeRef.current && isScanningRef.current) {
      setCameraState('stopping');
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.warn('Camera stop warning:', err);
      } finally {
        try {
          html5QrCodeRef.current.clear();
        } catch {}
        isScanningRef.current = false;
        if (isMountedRef.current) {
          setCameraState('idle');
        }
      }
    } else {
      setCameraState('idle');
    }
  };

  const startCamera = async (overrideCameraId) => {
    if (isInitializingRef.current || isScanningRef.current) return;

    isInitializingRef.current = true;
    setCameraState('requesting');
    setErrorMessage(null);

    // Make sure previous instance is cleaned up
    if (html5QrCodeRef.current) {
      try {
        if (isScanningRef.current) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      } catch {}
      html5QrCodeRef.current = null;
    }

    try {
      const targetId = overrideCameraId || selectedCameraId;
      const html5QrCode = new Html5Qrcode(CAMERA_CONTAINER_ID);
      html5QrCodeRef.current = html5QrCode;

      const cameraConfig = targetId
        ? targetId
        : { facingMode: 'environment' };

      const scanConfig = {
        fps: 12,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          const qrboxSize = Math.floor(minEdge * 0.72);
          return {
            width: Math.max(180, Math.min(qrboxSize, 300)),
            height: Math.max(180, Math.min(qrboxSize, 300)),
          };
        },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        cameraConfig,
        scanConfig,
        async (decodedText) => {
          if (!isMountedRef.current) return;
          // Successfully detected a QR Code
          // Stop camera immediately to prevent duplicate triggers
          isScanningRef.current = false;
          try {
            await html5QrCode.stop();
            html5QrCode.clear();
          } catch {}
          if (isMountedRef.current) {
            setCameraState('idle');
            onScanSuccess(decodedText, 'Camera Stream');
          }
        },
        () => {
          // Non-critical frame error (normal while scanning frames)
        }
      );

      if (isMountedRef.current) {
        isScanningRef.current = true;
        setCameraState('active');
        // Re-enumerate cameras after permission has been granted
        enumerateCameras();
      } else {
        // Unmounted during start
        try {
          await html5QrCode.stop();
          html5QrCode.clear();
        } catch {}
      }
    } catch (err) {
      console.error('Camera initialization error:', err);
      let userFriendlyError = 'Unable to initialize optical camera feed.';

      const errString = String(err?.message || err).toLowerCase();
      if (errString.includes('permission') || errString.includes('notallowederror')) {
        userFriendlyError = 'Camera access was denied. Please allow camera permissions in your browser address bar settings to scan barcodes directly.';
      } else if (errString.includes('notfounderror') || errString.includes('devicesnotfound')) {
        userFriendlyError = 'No camera device detected on this system. You can switch to the Upload Image File tab to scan an image instead.';
      } else if (errString.includes('notreadableerror') || errString.includes('in use') || errString.includes('busy')) {
        userFriendlyError = 'Camera is already in use by another application or tab. Please close other camera apps and try again.';
      } else if (errString.includes('overconstrainederror')) {
        userFriendlyError = 'The requested camera resolution or orientation is not supported by your hardware.';
      }

      if (isMountedRef.current) {
        setErrorMessage(userFriendlyError);
        setCameraState('error');
        if (onError) onError(userFriendlyError);
      }
    } finally {
      isInitializingRef.current = false;
    }
  };

  const handleCameraChange = async (e) => {
    const newId = e.target.value;
    setSelectedCameraId(newId);
    if (cameraState === 'active') {
      await stopCamera();
      await startCamera(newId);
    }
  };

  return (
    <div className="rounded-2xl bg-shield-900 border border-shield-border overflow-hidden relative shadow-lg">
      {/* Viewport Top Header */}
      <div className="h-11 bg-shield-950 px-4 border-b border-shield-border flex items-center justify-between text-xs font-mono text-shield-dim">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              cameraState === 'active'
                ? 'bg-emerald-400 animate-pulse'
                : cameraState === 'requesting'
                ? 'bg-amber-400 animate-pulse'
                : cameraState === 'error'
                ? 'bg-rose-400'
                : 'bg-shield-dim'
            }`}
          />
          <span className="text-white font-medium">
            {cameraState === 'active'
              ? 'SENSOR: SCANNING LIVE'
              : cameraState === 'requesting'
              ? 'SENSOR: ACQUIRING PERMISSION'
              : cameraState === 'error'
              ? 'SENSOR: ERROR'
              : 'SENSOR: STANDBY'}
          </span>
        </div>

        {/* Camera Selector (if multiple cameras detected) */}
        {cameras.length > 1 && (
          <div className="flex items-center gap-1.5">
            <Settings2 className="w-3.5 h-3.5 text-shield-dim" />
            <select
              value={selectedCameraId}
              onChange={handleCameraChange}
              disabled={cameraState === 'requesting'}
              className="bg-shield-900 text-shield-text border border-shield-700 rounded px-2 py-0.5 text-[11px] font-mono focus:outline-none focus:border-emerald-500 max-w-[150px] sm:max-w-[200px] truncate"
            >
              {cameras.map((cam, idx) => (
                <option key={cam.id} value={cam.id}>
                  {cam.label || `Camera ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Camera Viewport Body */}
      <div className="h-80 sm:h-96 bg-shield-950 relative flex flex-col items-center justify-center overflow-hidden">
        
        {/* DOM element for html5-qrcode video feed */}
        <div
          id={CAMERA_CONTAINER_ID}
          className={`w-full h-full flex items-center justify-center relative ${
            cameraState === 'active' ? 'block' : 'hidden'
          }`}
          style={{ minHeight: '320px' }}
        />

        {/* Laser scanline overlay when camera is active */}
        {cameraState === 'active' && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {/* Viewfinder Target Framing Box */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 border border-emerald-500/30 rounded-xl overflow-hidden shadow-[0_0_0_9999px_rgba(8,11,16,0.55)]">
              {/* Corner Targeting Accents */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-emerald-400"></span>
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-emerald-400"></span>
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-emerald-400"></span>
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-emerald-400"></span>

              {/* Animated Laser Scanning Beam */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10B981] animate-laserScan" />
            </div>

            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-shield-950/80 border border-shield-700 text-[11px] font-mono text-emerald-400">
                Align QR code within bounds
              </span>
            </div>
          </div>
        )}

        {/* Idle / Standby View */}
        {cameraState === 'idle' && (
          <div className="p-6 text-center flex flex-col items-center justify-center space-y-4 max-w-sm">
            <div className="relative w-48 h-48 border-2 border-dashed border-shield-700 rounded-xl flex items-center justify-center bg-shield-900/40">
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-shield-500"></span>
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-shield-500"></span>
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-shield-500"></span>
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-shield-500"></span>
              
              <div className="flex flex-col items-center gap-2 text-shield-dim">
                <VideoOff className="w-8 h-8 text-shield-dim" />
                <span className="text-xs font-mono">Camera Offline</span>
              </div>
            </div>

            <p className="text-xs text-shield-muted leading-relaxed font-sans">
              Click Start Camera to initialize optical scanning. You will be prompted for browser device permission.
            </p>

            <button
              type="button"
              onClick={() => startCamera()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
            >
              <Camera className="w-4 h-4" />
              <span>Start Camera</span>
            </button>
          </div>
        )}

        {/* Requesting Camera Permission State */}
        {cameraState === 'requesting' && (
          <div className="p-6 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h4 className="text-sm font-semibold text-white">
              Requesting Camera Access
            </h4>
            <p className="text-xs text-shield-muted max-w-xs leading-relaxed font-sans">
              Please grant video access in the browser permission dialogue to stream the camera feed.
            </p>
          </div>
        )}

        {/* Error State */}
        {cameraState === 'error' && (
          <div className="p-6 text-center flex flex-col items-center justify-center space-y-3 max-w-md">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">
              Camera Initialization Failed
            </h4>
            <p className="text-xs text-rose-300 leading-relaxed font-sans">
              {errorMessage}
            </p>
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => startCamera()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-shield-800 hover:bg-shield-750 text-white border border-shield-700 text-xs font-mono transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
            </div>
          </div>
        )}

        {/* Stopping State */}
        {cameraState === 'stopping' && (
          <div className="p-6 text-center flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-shield-dim" />
            <span className="text-xs font-mono text-shield-dim">Closing camera session...</span>
          </div>
        )}
      </div>

      {/* Viewport Bottom Controls */}
      <div className="p-3 bg-shield-950 border-t border-shield-border flex items-center justify-between text-xs font-mono">
        <span className="text-shield-dim text-[11px]">
          {cameraState === 'active'
            ? 'Automatic recognition active'
            : 'Standby for user activation'}
        </span>

        {cameraState === 'active' && (
          <button
            type="button"
            onClick={stopCamera}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <VideoOff className="w-3.5 h-3.5" />
            <span>Stop Camera</span>
          </button>
        )}
      </div>
    </div>
  );
}
