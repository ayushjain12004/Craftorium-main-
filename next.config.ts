// import type { NextConfig } from "next";


// const nextConfig: NextConfig = {
// "compilerOptions": {
//     "strict": true,
//     "jsx": "react-jsx",
//     "moduleResolution": "node",
//     "esModuleInterop": true
//   },
//   "include": ["src"]

// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
