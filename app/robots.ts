import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  
  const baseUrl = 'https://my-portfolio-wheat-six-13.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
