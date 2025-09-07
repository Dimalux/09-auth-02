// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// файл next.config.ts :

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
	  remotePatterns: [
	      { protocol: 'https', hostname: 'ac.goit.global' }
	    ]
	}
};

export default nextConfig;