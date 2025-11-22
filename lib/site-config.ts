export const siteConfig = {
  name: "Yugal Jakasaniya",
  role: "Full-Stack Developer",
  tagline: "MERN/MEAN  • UI-centric Engineer",
  location: "Rajkot, Gujarat, India",
  email: "jakasaniyayug@gmail.com",
  phone: "+91 97230 23403",
  summary:
    "Proactive and adaptable full-stack developer building scalable apps, hackathon prototypes, and industry-focused solutions. Strong problem-solver with a track record of delivering impactful products.",
  socials: {
    github: "https://github.com/Yugal0212",
    linkedin: "https://www.linkedin.com/in/yugal-jakasaniya-95b979314",
  
  },
  projects: [
    {
      id: "masterpiece-ceramic",
      title: "Masterpiece Ceramic",
      tagline: "ERP-style frontend for sales & inventory",
      tech: ["React", "Node", "MongoDB"],
      live: "https://masterpiecesceramic.vercel.app",
      source: "https://github.com/Yugal0212/Masterpieces-Ceramic",
      description: "Streamlined UI for tracking sales and managing inventory for a ceramic firm.",
      highlights: ["Fast, intuitive dashboard", "Role-aware views", "Responsive design"],
      tags: ["ERP", "Dashboard", "Frontend"],
      images: ["/images/masterpices_ceramic.png", "/images/masterpices_ceramic_2.png", "/images/masterpices_ceramic_3.png"],
      featured: true,
    },
    {
      id: "quickmart-mean",
      title: "QuickMart (MEAN)",
      tagline: "E-commerce with role-based access and secure checkout",
      tech: ["Angular", "Node", "Express", "MongoDB"],
      live: "https://quickmart-clone.netlify.app2",
      source: "https://github.com/Yugal0212/Ecommerce_web",
      description: "Scalable store: product catalog, cart, secure checkout, admin/seller/customer roles.",
      tags: ["E-commerce", "MEAN", "Auth"],
      images: ["/images/quickmart.png", "/images/quickmart_2.png"],
      featured: true,
    },
    {
      id: "chaxy-mern",
      title: "Chaxy (MERN)",
      tagline: "Real-time 1:1 & group chat over WebSockets",
      tech: ["React", "Node", "Express", "MongoDB", "WebSocket"],
      live: "https://github.com/Yugal0212/Chexay.io",
      source: "https://github.com/Yugal0212/Chexay.io",
      description: "Secure authentication and responsive UI with presence and typing indicators.",
      tags: ["MERN", "Realtime", "Chat"],
      images: [],
      featured: true,
    },
    {
      id: "library-management",
      title: "Library Management System",
      tagline: "Next.js + Nest.js with auth & role-based access",
      tech: ["Next.js", "Nest.js", "PostgreSQL"],
      live: "https://github.com/Yugal0212/library-management-system",
      source: "https://github.com/Yugal0212/library-management-system",
      description: "Digital library operations with efficient book and user management.",
      tags: ["Next.js", "Nest.js", "PostgreSQL"],
      images: ["/images/Lms.png", "/images/lms_2.png", "/images/lms_3.png"],
      featured: false,
    },
    {
      id: "ai-language-learning",
      title: "AI Language Learning Model",
      tagline: "LLaMA-powered vocabulary & conversation practice",
      tech: ["Python", "LLaMA", "Next.js"],
      live: "https://github.com/Yugal0212",
      source: "https://github.com/Yugal0212",
      description: "Hackathon prototype for AI-assisted language learning.",
      tags: ["AI", "NLP"],
      images: [],
      featured: false,
    },
  ],
  achievements: [
    {
      title: "Hackathon participent — CodeArena 1.0 (2025)",
      org: "Darshan University",
      link: "#",
      date: "2025",
    },
    {
      title: "Open House Showcase (2023)",
      org: "Karnavati University",
      link: "#",
      date: "2023",
    },
  ],
  education: [
    {
      school: "Darshan University",
      program: "B.Sc. (Hons) Computer Science",
      period: "2023–2027 (Expected)",
      location: "Rajkot",
    },
    {
      school: "Sarthank Vidhyamandir, Morbi-2",
      program: "HSC (Commerce)",
      period: "2022–2023 (96.89%)",
      location: "Morbi",
    },
  ],
  skills: {
    languages: ["Java", "C", "Python", "JavaScript"],
    frontend: ["React", "Angular", "HTML", "CSS"],
    backend: ["Node.js", "Express.js", "Nest.js"],
    databases: ["MongoDB", "PostgreSQL"],
    tools: ["Git", "GitHub", "Vercel", "Netlify"],
  },
  stats: {
    yearsOfCoding: 3,
    projectsShipped: 15,
    technologiesUsed: 12,
    
  },
}

export type Project = (typeof siteConfig.projects)[0]
export type Achievement = (typeof siteConfig.achievements)[0]
export type Education = (typeof siteConfig.education)[0]
