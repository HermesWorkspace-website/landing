import { NextResponse } from "next/server";

// Serves /well-known/llms-full.txt — used by some AI agents that look here
export function GET() {
  const content = `# HermesWorkspace — Full LLM Context
# See https://hermesworkspace.com/llms-full.txt for the complete file

Redirect: https://hermesworkspace.com/llms-full.txt
`;
  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
