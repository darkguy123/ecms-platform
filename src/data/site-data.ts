
/**
 * @fileOverview Central data store for ECMS content.
 * This file replaces the database for a fully portable, GitHub-ready project.
 */

export const SITE_DATA = {
  settings: {
    siteName: "ECMS - Electronic Court Management System",
    contactEmail: "office@eCourtMS.com",
    contactPhone: "+23407039000997, +2348180188858",
    address: "Suite B051, H&A Plaza, Wuye, Abuja 900108, Federal Capital Territory",
    footerText: "© 2026 Century Information Systems Ltd. All Rights Reserved."
  },
  home: {
    heroTitle: "Electronic Court Management System",
    heroSubtitle: "The Digital Backbone for Modern Justice",
    heroDescription: "Empower your court with ECMS. Eliminate backlogs and enhance public trust through a secure, integrated platform designed for modern legal operations.",
    demoLink: "https://ecmsfhcadmin.centurycodes.ng/"
  },
  about: {
    title: "About ECMS",
    subtitle: "Innovation in Judicial Administration",
    mission: "ECMS provides global judiciaries with the most secure, intuitive, and integrated electronic court management system, enabling them to deliver justice swiftly and transparently. Our platform is built on the philosophy that technology should be the bedrock of a fair and efficient judicial system.",
    history: "Century Information Systems Ltd represents over two decades of expertise in judicial technology and digital transformation across Africa and beyond. Our ECMS platform has been the catalyst for modernization in numerous high-stakes legal environments."
  },
  architecture: {
    title: "Technical Architecture",
    description: "Robust, scalable, multi-layered architecture designed for complex judicial operational requirements.",
    layers: [
      {
        name: "User Access Layer",
        items: ["Legal Practitioners", "Litigants", "Court Registrars", "Judges", "Admin Partners", "Public Portals"]
      },
      {
        name: "Application & Services Layer",
        items: ["eFiling", "eCase Management", "eAffidavit", "eCourt Orders", "eProbate", "eProceedings", "eArchive", "eLibrary", "Small Claims"]
      },
      {
        name: "Workflow & Process",
        items: ["Automated Routing", "Task Management", "Procedural Rules", "Approval Chains"]
      },
      {
        name: "Data & Security",
        items: ["Role-based Access", "Encryption", "Audit Trails", "Secure Storage"]
      }
    ],
    features: [
      { title: "Centralized Core Engine", desc: "Coordinates all modules, ensuring filings, case data, records, and processes operate within a single integrated environment." },
      { title: "Advanced Security Controls", desc: "Role-based access management, data encryption, comprehensive audit trails protecting sensitive judicial information." },
      { title: "Automated Workflow Routing", desc: "Intelligent task distribution to appropriate registries, judicial officers, and administrative channels." }
    ]
  },
  partnerships: {
    title: "Proven Implementation",
    description: "Deployed and validated through collaborations with Nigeria's premier judicial institutions.",
    federal: [
      { name: "Federal High Court of Nigeria", role: "Digital process and records management" },
      { name: "Corporate Affairs Commission (CAC)", role: "Data authentication service" },
      { name: "Bureau of Public Procurement (BPP)", role: "Data authentication service" }
    ],
    states: [
      { name: "FCT High Court", status: "Active" },
      { name: "Delta State Judiciary", status: "Active" },
      { name: "Bayelsa State Judiciary", status: "Active" },
      { name: "Gombe State Judiciary", status: "Active" },
      { name: "Nasarawa State Judiciary", status: "Active" },
      { name: "Plateau State Judiciary", status: "Active" }
    ]
  },
  security: {
    title: "Security, Compliance & Trust",
    description: "Comprehensive mechanisms ensuring integrity, confidentiality, and reliability.",
    items: [
      { title: "Role-Based Access Control", desc: "Structured privilege management ensuring users access only role-relevant information." },
      { title: "Secure Authentication", desc: "Multi-factor verification protocols ensuring only authorized individuals initiate filings." },
      { title: "Audit Trails & Monitoring", desc: "Comprehensive activity logging enabling transparent accountability." },
      { title: "Document Integrity", desc: "Digitally issued documents authenticated through platform verification mechanisms." }
    ],
    certifications: ["ISO Security Standards", "Data Protection Compliance", "Judicial Standards Adherence", "Regular Security Audits"]
  },
  methodology: {
    title: "Implementation Methodology",
    steps: [
      { id: "01", title: "Needs Assessment", desc: "Operational environment analysis with stakeholder consultations." },
      { id: "02", title: "System Customisation", desc: "Workflow integration tailored to your court's procedural structure." },
      { id: "03", title: "Data Migration", desc: "Legacy record digitisation and migration with gateway integration." },
      { id: "04", title: "Capacity Building", desc: "Comprehensive training programs for judges and administrative staff." },
      { id: "05", title: "Pilot Deployment", desc: "Selected division pilot implementation with operational adjustment." },
      { id: "06", title: "Ongoing Support", desc: "Continuous monitoring and enhancement as requirements evolve." }
    ]
  },
  modules: [
    {
      title: "eFiling",
      icon: "FileCheck",
      desc: "Electronic submission of court documents by legal practitioners and litigants.",
      features: ["24/7 Remote Filing", "Secure Document Upload", "Automated Fee Calculation"]
    },
    {
      title: "eCase Management",
      icon: "ClipboardList",
      desc: "End-to-end tracking and management of case lifecycles for registrars and judges.",
      features: ["Real-time Dashboard", "Automated Notifications", "Digital Case Files"]
    },
    {
      title: "eAffidavit",
      icon: "FileText",
      desc: "Streamlined process for swearing and filing affidavits digitally with biometric verification.",
      features: ["Virtual Commissioning", "Electronic Signatures", "Identity Verification"]
    },
    {
      title: "eCourt Orders",
      icon: "Gavel",
      desc: "Rapid generation and dissemination of authenticated court orders and judgments.",
      features: ["Certified Digital Copies", "Instant Notification", "Secure QR Verification"]
    },
    {
      title: "eProbate",
      icon: "Scale",
      desc: "Management of wills, inheritance, and letters of administration in a secure digital vault.",
      features: ["Asset Management", "Beneficiary Tracking", "Digital Will Storage"]
    },
    {
      title: "eArchive",
      icon: "Archive",
      desc: "Long-term secure storage and instant retrieval of historical court records.",
      features: ["OCR Search", "Data Redundancy", "Quick Retrieval"]
    }
  ],
  blog: [
    {
      id: "modernizing-justice",
      title: "Modernizing Justice: The Impact of ECMS in Nigeria",
      excerpt: "Explore how electronic court management is transforming legal processes and reducing case backlogs across federal courts.",
      content: "The introduction of the Electronic Court Management System (ECMS) has marked a turning point in the Nigerian judiciary. By digitizing case files and enabling remote eFiling, courts have seen a significant reduction in administrative delays and a boost in overall transparency...",
      date: "2024-03-20",
      image: "https://picsum.photos/seed/blog1/800/500",
      category: "Innovation"
    },
    {
      id: "secure-filing-guide",
      title: "A Practitioner's Guide to Secure eFiling",
      excerpt: "Step-by-step instructions on how to leverage the ECMS eFiling module for faster, more secure document submissions.",
      content: "For legal practitioners, time is of the essence. Our eFiling module allows lawyers to submit documents 24/7 without physically visiting the court registry. This guide covers the security protocols and validation steps required for a successful filing...",
      date: "2024-03-15",
      image: "https://picsum.photos/seed/blog2/800/500",
      category: "Tutorial"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What is ECMS?",
      answer: "ECMS (Electronic Court Management System) is a comprehensive digital platform designed to automate and streamline judicial processes, from case filing to final judgment."
    },
    {
      id: "faq-2",
      question: "Is the system secure?",
      answer: "Yes, ECMS utilizes military-grade encryption and biometric verification to ensure the integrity and confidentiality of all judicial records."
    }
  ],
  legal: {
    terms: "These Terms of Use govern your access to and use of the ECMS platform...",
    privacy: "We are committed to protecting the privacy of all users of the ECMS platform..."
  }
};
