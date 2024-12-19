import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        asideBg: '#d9d9d9',
        borderGray: '#ccc',
        uploadButton: '#4a90e2',
        uploadButtonHover: '#357ABD',
        errorText: '#ff4d4f',
      },
      backgroundImage: {
        'upload-radial-gradient': 'radial-gradient(circle, rgba(82, 140, 238, 1), rgba(51, 111, 214, 1))',
        // 'converting-radial-gradient': 'radial-gradient(circle, rgba(195, 243, 201, 1), rgba(147, 237, 151, 1))',
        'complete-radial-gradient': 'radial-gradient(circle, rgba(195, 243, 201, 1), rgba(147, 237, 151, 1))',
      },
    },
  },
  plugins: [],
} satisfies Config;
