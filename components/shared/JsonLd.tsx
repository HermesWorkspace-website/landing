// JsonLd.tsx — server-safe JSON-LD injector
// Usage: <JsonLd data={schemaObject} />

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(data)}
    </script>
  );
}
