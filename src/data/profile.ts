export const profile = {
  name: "Tanmay Adhikari",
  location: "India",
  email: "tanmay.adhikari.work@gmail.com",
  phone: "+91 8533942901",
  links: {
    linkedin: "https://linkedin.com/in/tanmay-adhikari-ttt",
    github: "https://github.com/TanmayAdhikari",
  },
  headline: "AI/ML Engineer",
  summary:
    "AI/ML Engineer specializing in Generative AI, Computer Vision, and logistics automation systems. Experienced in building enterprise RAG platforms, edge AI monitoring pipelines, waste segmentation systems aligned with Google CircularNet workflows, and large-scale route optimization engines.",
  skills: {
    programming: ["Python", "SQL"],
    genAI: [
      "RAG systems",
      "LangChain",
      "OpenAI API",
      "Gemini API",
      "Prompt engineering",
      "Vector databases",
    ],
    computerVision: [
      "YOLOv8",
      "Object detection",
      "Waste segmentation",
      "ANPR",
      "RTSP video processing",
      "Edge AI deployment",
    ],
    machineLearning: ["Scikit-learn", "Pandas", "NumPy", "Model development", "Data pipelines"],
    optimization: [
      "Linear programming",
      "K-Means clustering",
      "Logistics routing",
      "Operational efficiency",
    ],
    tools: ["Git", "Linux", "Streamlit", "FastAPI", "Edge computing devices", "SQL databases"],
  },
  education: [
    {
      school: "Graphic Era Hill University, Dehradun",
      degree: "Bachelor of Technology in Computer Science Engineering",
      year: "2025",
      score: "CPI: 7.8",
    },
  ],
  experience: [
    {
      title: "AI/ML Engineer",
      company: "Transport Corporation of India (TCI)",
      start: "Nov 2024",
      end: "Present",
      highlights: [
        "Architecting enterprise RAG systems for intelligent document analysis and operational knowledge automation.",
        "Developing AI-driven dock management automation using real-time computer vision monitoring and edge inference workflows.",
        "Leading waste segmentation initiatives aligned with Google CircularNet architecture via RTSP pipelines.",
        "Deploying enterprise AI solutions including edge processing systems, automation pipelines, and logistics intelligence platforms at scale.",
      ],
    },
    {
      title: "AI/ML Intern",
      company: "OneStep Greener",
      start: "Jul 2024",
      end: "Nov 2024",
      highlights: [
        "Developed AI-assisted logistics planning for urban waste collection across Delhi.",
        "Implemented K-Means clustering with Google Distance Matrix API to create locality-based operational zones.",
        "Designed driver allocation logic based on vehicle capacity and estimated waste volume; improved fleet utilization by ~20%.",
        "Built automated scheduling workflows for scalable routing and workforce planning.",
      ],
    },
    {
      title: "Generative AI & Machine Learning Intern",
      company: "Genpact",
      start: "Jan 2024",
      end: "Jun 2024",
      highlights: [
        "Contributed to enterprise ML and NLP pipelines supporting operational automation for Fortune 500 clients.",
        "Assisted last-mile route optimization systems, improving logistics efficiency and reducing delivery costs up to ~15%.",
      ],
    },
  ],
  projects: [
    {
      title: "Enterprise Multi-Document GenAI Assistant (RAG System)",
      description:
        "Production-grade Retrieval-Augmented Generation platform enabling contextual Q&A across enterprise document repositories with memory persistence and citation-based responses.",
      tags: ["RAG", "Vector search", "LangChain", "LLMs"],
      metrics: ["Response latency under ~2 seconds (target)"],
    },
    {
      title: "Warehouse Dock Automation System with ANPR and Edge AI",
      description:
        "Real-time dock monitoring on edge devices processing RTSP CCTV streams; YOLOv8 vehicle detection and Gemini-powered ANPR with a SQL-backed dashboard.",
      tags: ["Computer Vision", "YOLOv8", "Edge AI", "Gemini API", "SQL"],
      metrics: ["~95% vehicle detection accuracy (reported)"],
    },
    {
      title: "LLM-Powered CSV Data Transformation Tool",
      description:
        "Natural-language driven CSV manipulation that generates transformation commands via LLM workflows to reduce manual processing time.",
      tags: ["LLMs", "Automation", "Data engineering"],
      metrics: ["~95% command accuracy (reported)", "~70% time reduction (reported)"],
    },
    {
      title: "Multi-Week Hub Distribution Optimizer",
      description:
        "Logistics optimization platform using linear programming models for supply chain efficiency via intelligent route planning and allocation.",
      tags: ["Optimization", "Linear programming", "Logistics"],
      metrics: ["Up to ~25% simulated cost reduction (reported)"],
    },
  ],
} as const;

export type Profile = typeof profile;
