import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin file-tracing root to this repo so Next doesn't pick up an unrelated
  // lockfile higher up in the user's home directory at build time.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
