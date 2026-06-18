export interface SignatureData {
  viewBox: string;
  paths: string[];
}

export const SIGNATURES: Record<string, SignatureData> = {
  apurav: {
    viewBox: "0 0 718 333",
    paths: [],
  },
  lakshya: {
    viewBox: "0 0 763 305",
    paths: [],
  },
};

export function hasVectorPaths(founderId: string): boolean {
  return SIGNATURES[founderId]?.paths?.some((p) => p.length > 0) ?? false;
}
