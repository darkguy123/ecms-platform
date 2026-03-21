
import { db } from "@/lib/firebase-config";
import { doc, setDoc, getDoc, collection, getDocs, writeBatch } from "firebase/firestore";

export async function initializeDatabase() {
  // Initialize general settings
  const settingsRef = doc(db, "settings", "general");
  const settingsSnap = await getDoc(settingsRef);

  if (!settingsSnap.exists()) {
    await setDoc(settingsRef, {
      siteName: "ECMS - Electronic Court Management System",
      primaryColor: "#0B6B3A",
      secondaryColor: "#1A2F25",
      accentColor: "#6DF26D",
      contactEmail: "info@ecms.gov.ng",
      contactPhone: "+234 800 JUSTICE",
      address: "Century Information Systems Ltd, Head Office Building, Legal District",
      metaTitle: "ECMS - Modern Justice Foundation",
      metaDescription: "The premier electronic court management system for modern judiciaries.",
      logoUrl: "",
      footerText: "© 2024 Century Information Systems Ltd. All Rights Reserved."
    });
  }

  // Initialize home page sections with professional content
  const homeSectionsRef = collection(db, "pages", "home", "sections");
  const homeSectionsSnap = await getDocs(homeSectionsRef);

  const sections = [
    {
      id: "hero",
      type: "hero",
      title: "The Digital Foundation for",
      subtitle: "Modern Justice",
      content: "Empower your judiciary with ECMS. A comprehensive, secure, and integrated platform designed to transform court operations, eliminate backlogs, and enhance public trust through radical transparency.",
      order: 0,
      isVisible: true
    },
    {
      id: "problem",
      type: "problem",
      title: "The Crisis of Traditional Litigation",
      subtitle: "The Imperative for Change",
      content: "Manual, paper-based systems are the silent enemies of justice. They lead to significant case backlogs, misplaced records, and limited access for citizens. In an era of digital acceleration, courts must evolve to remain the reliable bedrock of the rule of law.",
      order: 1,
      isVisible: true
    },
    {
      id: "benefits",
      type: "benefits",
      title: "Why Leading Judiciaries Choose ECMS",
      subtitle: "Innovation at the Core",
      content: "ECMS isn't just a database; it's a complete ecosystem. From eFiling to virtual proceedings, we provide the tools needed to deliver swift, accessible, and secure justice for all stakeholders.",
      order: 2,
      isVisible: true
    },
    {
      id: "cta",
      type: "cta",
      title: "Start Your Digital Transformation Today",
      subtitle: "Partner with Experts",
      content: "Join the growing network of courts modernizing their infrastructure with Century Information Systems. Secure your demo today and see how ECMS can redefine your judicial administration.",
      order: 3,
      isVisible: true
    }
  ];

  const batch = writeBatch(db);
  sections.forEach(s => {
    const docRef = doc(db, "pages", "home", "sections", s.id);
    batch.set(docRef, s);
  });

  await batch.commit();
}
