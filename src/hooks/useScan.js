import { useState, useCallback } from 'react
import { parseQRPayload } from '../utils/qrPayloadParser';

/**
 * QR Shield - useScan Hook
 * Manages scan state, parsed payload, and history logging.
 */
export function useScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScanSuccess = useCallback((rawContent, source = 'Camera') => {
    try {
      const parsed = parseQRPayload(rawContent);
      const result = {
        parsedPayload: parsed,
        rawContent,
        source,
        timestamp: new Date().toISOString(),
      };
      setScanResult(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err?.message || 'Failed to process QR code payload.');
      return null;
    }
  }, []);

  const resetScan = useCallback(() => {
    setScanResult(null);
    setError(null);
    setIsScanning(false);
  }, []);

  return {
    isScanning,
    setIsScanning,
    scanResult,
    error,
    setError,
    handleScanSuccess,
    resetScan,
  };
}
