
/**
 * @fileOverview Central data store for ECMS content.
 * This file replaces the database for a fully portable, GitHub-ready project.
 */

export const SITE_DATA = {
  settings: {
    siteName: "ECMS - Electronic Court Management System",
    contactEmail: "info@ecms.gov.ng",
    contactPhone: "+234 800 JUSTICE",
    address: "Century Information Systems Ltd, Head Office Building, Legal District",
    footerText: "© 2024 Century Information Systems Ltd. All Rights Reserved."
  },
  home: {
    heroTitle: "The Digital Foundation for",
    heroSubtitle: "Modern Justice",
    heroDescription: "Empower your court with ECMS. Eliminate backlogs and enhance public trust through a secure, integrated platform designed for modern legal operations.",
    demoLink: "https://ecmsfhcadmin.centurycodes.ng/"
  },
  about: {
    mission: "ECMS provides global judiciaries with the most secure, intuitive, and integrated electronic court management system, enabling them to deliver justice swiftly and transparently.",
    history: "Century Information Systems Ltd represents over two decades of expertise in judicial technology and digital transformation across Africa and beyond through our ECMS platform."
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
