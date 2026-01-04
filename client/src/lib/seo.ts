/**
 * SEO Helper Functions
 * Manage meta tags, structured data, and SEO optimization
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function updateMetaTags(metadata: SEOMetadata) {
  // Update title
  document.title = metadata.title;

  // Update or create meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", metadata.description);

  // Update or create meta keywords
  if (metadata.keywords) {
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement("meta");
      keywordsTag.setAttribute("name", "keywords");
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute("content", metadata.keywords);
  }

  // Update Open Graph tags
  updateOGTag("og:title", metadata.title);
  updateOGTag("og:description", metadata.description);
  if (metadata.image) updateOGTag("og:image", metadata.image);
  if (metadata.url) updateOGTag("og:url", metadata.url);
  if (metadata.type) updateOGTag("og:type", metadata.type);

  // Update Twitter Card tags
  updateTwitterTag("twitter:title", metadata.title);
  updateTwitterTag("twitter:description", metadata.description);
  if (metadata.image) updateTwitterTag("twitter:image", metadata.image);
}

function updateOGTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function updateTwitterTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function addStructuredData(data: any) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export const siteMetadata = {
  siteName: "TechBucket Pvt Ltd",
  siteDescription:
    "TechBucket enables entrepreneurs, small businesses, and enterprises with the best technological expertise, guidance, and support for achieving efficiency and growth.",
  siteKeywords:
    "IT solutions, technology partner, network infrastructure, IT hardware, server solutions, networking, system administration",
  siteUrl: "https://techbucket.com.np",
  logo: "https://techbucket.com.np/logo.png",
  socialLinks: {
    facebook: "https://facebook.com/techbucket",
    twitter: "https://twitter.com/techbucket",
    linkedin: "https://linkedin.com/company/techbucket",
  },
};

export const pages = {
  home: {
    title: "TechBucket - Your Technology Partner",
    description: siteMetadata.siteDescription,
    keywords: siteMetadata.siteKeywords,
  },
  products: {
    title: "Products - TechBucket",
    description:
      "Browse our comprehensive catalog of enterprise-grade IT hardware from leading manufacturers like Cisco, Dell, and HP.",
    keywords: "IT hardware, networking equipment, servers, switches, access points",
  },
  services: {
    title: "Services - TechBucket",
    description:
      "Comprehensive IT solutions including network infrastructure design, implementation, wireless deployment, and system administration.",
    keywords: "IT services, network design, system administration, IT support",
  },
  contact: {
    title: "Contact Us - TechBucket",
    description: "Get in touch with TechBucket for your technology needs and inquiries.",
    keywords: "contact, support, inquiry, help",
  },
  support: {
    title: "Support Center - TechBucket",
    description: "Submit support requests and get help from our expert team.",
    keywords: "support, help, technical support, troubleshooting",
  },
};
