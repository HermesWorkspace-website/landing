let _requestId = '';

function generateCorrelationId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${ts}-${rand}`;
}

export function getRequestId(): string {
  if (!_requestId) {
    _requestId = generateCorrelationId();
  }
  return _requestId;
}

export function resetRequestId(): void {
  _requestId = '';
}

export function dbg(_context: string, _message: string, _data?: Record<string, unknown>): void {
}

export function perf(_label: string): { end: (extra?: Record<string, unknown>) => void } {
  return { end: () => {} };
}
