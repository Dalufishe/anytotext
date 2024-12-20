import { NextConfig } from 'next';

const rewrites = async (): Promise<
  | { source: string; destination: string }[]
  | { beforeFiles: { source: string; destination: string }[]; afterFiles: { source: string; destination: string }[]; fallback: { source: string; destination: string }[] }
> => {
  return [
    {
      source: "/convert",
      destination: "http://localhost:5000/convert",
    },
  ];
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  rewrites,
};

export default nextConfig;
