import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  
  const baseUrl = 'https://my-portfolio-wheat-six-13.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    
    
    
    
    
    
    
  ];
}
