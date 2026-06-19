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

export function dbg(context: string, message: string, data?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== 'production') return;
  const rid = _requestId || generateCorrelationId();
  const ts = new Date().toISOString().slice(11, 23);
  const prefix = `[blog-diag][${rid}][${ts}][${context}]`;
  if (data !== undefined) {
    console.log(`${prefix} ${message}`, JSON.stringify(data));
  } else {
    console.log(`${prefix} ${message}`);
  }
}

export function perf(label: string): { end: (extra?: Record<string, unknown>) => void } {
  const start = Date.now();
  const rid = _requestId || generateCorrelationId();
  const ts = new Date().toISOString().slice(11, 23);
  const prefix = `[perf][${rid}][${ts}]`;
  console.log(`${prefix}[${label}] START at ${start}`);
  return {
    end: (extra?: Record<string, unknown>) => {
      const duration = Date.now() - start;
      const extraStr = extra ? ` ${JSON.stringify(extra)}` : '';
      console.log(`${prefix}[${label}] END duration=${duration}ms${extraStr}`);
    },
  };
}
