import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'profile'
}

const SEOHead = ({ 
  title = "Arunabh Saikia - Senior Software Engineer @Adobe",
  description = "Senior Full Stack Engineer with 8+ years experience building scalable applications at Adobe, ManifestHQ, and IBM. Expert in React, Node.js, TypeScript, and modern web technologies.",
  image = "/social-preview.png",
  url = "https://arunabhsaikia.dev",
  type = "profile"
}: SEOProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title
    
    // Create or update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: 'Senior Software Engineer, Full Stack Developer, React, Node.js, TypeScript, Adobe, JavaScript, Python, Web Development, UI/UX, Frontend, Backend' },
      { name: 'author', content: 'Arunabh Saikia' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: 'Arunabh Saikia - Senior Software Engineer Portfolio' },
      { property: 'og:site_name', content: 'Arunabh Saikia Portfolio' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:creator', content: '@arsaikia' },
      
      // Additional SEO
      { name: 'theme-color', content: '#3B82F6' },
      { name: 'msapplication-TileColor', content: '#3B82F6' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]
    
    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (name) meta.name = name
        if (property) meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      
      meta.content = content
    })
    
    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
    
    // Add structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Arunabh Saikia",
      "jobTitle": "Senior Software Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Adobe"
      },
      "description": description,
      "url": url,
      "image": image,
      "sameAs": [
        "https://github.com/arsaikia",
        "https://www.linkedin.com/in/arsaikia/",
        "mailto:arunabhsaikia.official@gmail.com"
      ],
      "knowsAbout": [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "Full Stack Development",
        "Software Engineering",
        "Web Development",
        "UI/UX Design",
        "System Architecture"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Senior Software Engineer",
        "occupationLocation": {
          "@type": "Place",
          "name": "San Francisco, CA"
        },
        "skills": [
          "React", "Node.js", "TypeScript", "JavaScript", "Python", 
          "GraphQL", "PostgreSQL", "MongoDB", "AWS", "Docker", 
          "Kubernetes", "System Design", "Team Leadership"
        ]
      },
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "Adobe",
          "startDate": "2021-06"
        },
        {
          "@type": "Organization", 
          "name": "ManifestHQ",
          "startDate": "2020-05",
          "endDate": "2021-05"
        },
        {
          "@type": "Organization",
          "name": "IBM", 
          "startDate": "2016-03",
          "endDate": "2019-07"
        }
      ]
    }
    
    // Add or update structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.type = 'application/ld+json'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)
    
  }, [title, description, image, url, type])
  
  return null
}

export default SEOHead 