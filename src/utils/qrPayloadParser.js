/**
 * QR Shield - QR Payload Classifier & Sanitizer
 * 
 * Securely classifies decoded QR content into:
 * - HTTPS_URL
 * - HTTP_URL
 * - PLAIN_TEXT
 * - DANGEROUS_SCHEME (e.g. javascript:, data:, file:)
 * - CUSTOM_SCHEME (e.g. tel:, sms:, mailto:, intent:)
 * 
 * Follows zero-trust security rules:
 * - Never executes payloads
 * - Prevents automatic browser navigation
 * - Flags non-standard schemes as untrusted input
 */

export const PAYLOAD_TYPES = {
  HTTPS_URL: {
    id: 'HTTPS_URL',
    label: 'HTTPS Web URL',
    category: 'web',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotClass: 'bg-emerald-400',
    description: 'Secure encrypted web destination. Eligible for redirect and threat analysis.',
    isUrl: true,
    canAnalyseUrl: true,
  },
  HTTP_URL: {
    id: 'HTTP_URL',
    label: 'Insecure HTTP URL',
    category: 'web',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotClass: 'bg-amber-400',
    description: 'Unencrypted web address (HTTP). Data in transit can be intercepted or tampered with.',
    isUrl: true,
    canAnalyseUrl: true,
  },
  PLAIN_TEXT: {
    id: 'PLAIN_TEXT',
    label: 'Plain Text Payload',
    category: 'text',
    badgeClass: 'bg-shield-800 text-shield-text border-shield-700',
    dotClass: 'bg-shield-dim',
    description: 'Decoded text string containing no web destination or active application protocol.',
    isUrl: false,
    canAnalyseUrl: false,
  },
  DANGEROUS_SCHEME: {
    id: 'DANGEROUS_SCHEME',
    label: 'High-Risk / Script URI',
    category: 'danger',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    dotClass: 'bg-rose-400',
    description: 'Potentially dangerous scheme (e.g. javascript:, data:, file:). Execution blocked by security sandbox.',
    isUrl: false,
    canAnalyseUrl: false,
  },
  CUSTOM_SCHEME: {
    id: 'CUSTOM_SCHEME',
    label: 'Untrusted Application URI',
    category: 'untrusted',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotClass: 'bg-amber-400',
    description: 'Attempts to trigger an external application (e.g. tel:, sms:, mailto:, intent:). Quarantined as untrusted data.',
    isUrl: false,
    canAnalyseUrl: false,
  },
};

const DANGEROUS_PROTOCOLS = new Set([
  'javascript:',
  'data:',
  'file:',
  'vbscript:',
  'blob:',
]);

const APP_PROTOCOLS = new Set([
  'tel:',
  'sms:',
  'smsto:',
  'mailto:',
  'intent:',
  'market:',
  'itms:',
  'itms-apps:',
  'facetime:',
  'callto:',
  'skype:',
  'whatsapp:',
  'tg:',
  'viber:',
  'wifi:',
]);

export function parseQRPayload(rawContent) {
  if (typeof rawContent !== 'string') {
    return {
      type: PAYLOAD_TYPES.PLAIN_TEXT,
      rawContent: String(rawContent || ''),
      extractedUrl: null,
      protocol: null,
      domain: null,
      isCleanString: true,
    };
  }

  const trimmed = rawContent.trim();
  const lower = trimmed.toLowerCase();

  // 1. Check for immediate script injection attempts or dangerous schemes
  for (const protocol of DANGEROUS_PROTOCOLS) {
    if (lower.startsWith(protocol)) {
      return {
        type: PAYLOAD_TYPES.DANGEROUS_SCHEME,
        rawContent: trimmed,
        extractedUrl: null,
        protocol: protocol.replace(':', ''),
        domain: null,
        isCleanString: false,
      };
    }
  }

  // 2. Check for application/custom URI schemes
  for (const protocol of APP_PROTOCOLS) {
    if (lower.startsWith(protocol)) {
      return {
        type: PAYLOAD_TYPES.CUSTOM_SCHEME,
        rawContent: trimmed,
        extractedUrl: null,
        protocol: protocol.replace(':', ''),
        domain: null,
        isCleanString: true,
      };
    }
  }

  // 3. Check for HTTP / HTTPS Web URLs
  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    try {
      const parsedUrl = new URL(trimmed);
      const isHttps = parsedUrl.protocol === 'https:';
      const isHttp = parsedUrl.protocol === 'http:';

      if (isHttps || isHttp) {
        return {
          type: isHttps ? PAYLOAD_TYPES.HTTPS_URL : PAYLOAD_TYPES.HTTP_URL,
          rawContent: trimmed,
          extractedUrl: trimmed,
          protocol: parsedUrl.protocol.replace(':', ''),
          domain: parsedUrl.hostname,
          path: parsedUrl.pathname,
          search: parsedUrl.search,
          hash: parsedUrl.hash,
          isCleanString: true,
        };
      }
    } catch {
      // Malformed URL falls through to plain text
    }
  }

  // 4. Check if text looks like a custom URI with a colon before any slash or space
  const uriSchemeMatch = trimmed.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
  if (uriSchemeMatch && !trimmed.includes(' ') && uriSchemeMatch[1].length <= 20) {
    const scheme = uriSchemeMatch[1].toLowerCase();
    if (!['http', 'https'].includes(scheme)) {
      return {
        type: PAYLOAD_TYPES.CUSTOM_SCHEME,
        rawContent: trimmed,
        extractedUrl: null,
        protocol: scheme,
        domain: null,
        isCleanString: true,
      };
    }
  }

  // 5. Default: Plain text
  return {
    type: PAYLOAD_TYPES.PLAIN_TEXT,
    rawContent: trimmed,
    extractedUrl: null,
    protocol: null,
    domain: null,
    isCleanString: true,
  };
}
