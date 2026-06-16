"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────
type Lang = "en" | "fr";

interface SiteContextValue {
  lang: Lang;
  toggleLang: () => void;
  ldm: boolean;
  toggleLdm: () => void;
  t: typeof translations.en;
}

// ─── Translations ────────────────────────────────────────────────────
const translations = {
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      admin: "Admin",
      resume: "Resume",
      available: "AVAILABLE FOR PROJECTS",
    },
    hero: {
      status: "available for opportunities",
      headline1: "I build ",
      headline2: "complex software",
      headline3: ", optimize ",
      headline4: "database architectures",
      headline5: ", and secure ",
      headline6: "automation infrastructure",
      headline7: ".",
      sub: "Full-stack developer and system administrator with a strong background in data optimization and DevOps automation. I manage projects end-to-end — from schema design to production deployment.",
      cta: "Let's Talk",
      ctaSecondary: "View Projects",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Case studies of complex systems I've designed and built",
      viewGithub: "View Source",
      privateRepo: "Private Repository",
      featured: [
        {
          title: "DeltaTransport ERP",
          badge: "Private / Client",
          badgeColor: "red" as const,
          description:
            "Massive logistics & fleet management ERP. Handles inbound/outbound supply with delivery notes, multi-user/multi-role access, tire lifecycle management, technical visit tracking, fuel consumption audits, container tracking, and printable reports.",
          longDesc:
            "Full lifecycle management for a transport company: supply chain tracking with delivery notes, truck/trailer/driver cataloging, tire lifecycle with cost-per-km calculation, scheduled maintenance and technical visits, fuel consumption analysis, container tracking, per-driver trip accounts, audit trail with timestamp on every action, printable reports on consumption and trips. Multi-role permissions with secure sessions.",
          tech: ["Laravel", "React", "MySQL", "PowerShell"],
          metrics: ["Multi-Role", "Audit Trail", "Real-time"],
          github: "https://github.com/Lancs0022/admin_tools",
        },
        {
          title: "PEJAA",
          badge: "Master's Thesis / In Progress",
          badgeColor: "gold" as const,
          description:
            "Financial auditing platform and real-time stock management. Includes a roadmap for AI/LLM analytical agents for proactive financial alerts and predictive analysis.",
          longDesc:
            "Platform for merchandise auditing with advanced financial reports. Real-time stock tracking with discrepancy detection. Roadmap includes an AI agent module connected via LLM API to analyze financial health, detect anomalies, and send proactive alerts to stakeholders.",
          tech: ["Next.js", "TypeScript", "PostgreSQL", "LLM/AI"],
          metrics: ["Financial Audit", "AI Agents", "Real-time"],
          github: null,
        },
        {
          title: "DevOps Admin Tools",
          badge: "Private / Internal Tool",
          badgeColor: "red" as const,
          description:
            "Electron desktop app automating ERP deployment and monitoring. Integrates server watchdog, Cloudflare tunnels, and scheduled cloud backups to Google Drive daily at 6 PM.",
          longDesc:
            "Password-protected Electron app that automates: Laravel + React server startup via scheduled tasks, watchdog process that restarts and optimizes unresponsive servers, automatic Cloudflare tunnel creation exposing servers and database to the web, daily 6 PM backups to Google Drive, real-time server status dashboard with start/stop/restart PowerShell commands.",
          tech: ["Electron", "PowerShell", "Cloudflare", "Google Drive API"],
          metrics: ["Watchdog", "Auto-Backup", "Tunnels"],
          github: "https://github.com/Lancs0022/admin_tools",
        },
      ],
    },
    secondary: {
      title: "Tools & Laboratory",
      subtitle: "Open-source utilities and learning projects",
      items: [
        {
          title: "Purchase Management App",
          desc: "Qt/C++ desktop application for managing purchases and photocopy services.",
          tech: ["Qt", "C++"],
          github: "https://github.com/Lancs0022/Application-de-gestion-d-achat",
        },
        {
          title: "OCR Text Extractor",
          desc: "Python application that extracts text from images using Tesseract OCR.",
          tech: ["Python", "Tesseract"],
          github: "https://github.com/Lancs0022/Scaneur-de-texte",
        },
        {
          title: "Image Processing",
          desc: "Image manipulation algorithms and processing scripts in Octave.",
          tech: ["Octave", "MATLAB"],
          github: "https://github.com/Lancs0022/Projet-Octave",
        },
        {
          title: "File Explorer",
          desc: "Fully functional system-level file explorer application in Java.",
          tech: ["Java", "Swing"],
          github: "https://github.com/Lancs0022/ExplorateurDeFichier",
        },
        {
          title: "LLM Communication",
          desc: "Integration scripts for communicating with LLM models via API.",
          tech: ["Python", "LLM API"],
          github: "https://github.com/Lancs0022/Communiquer-avec-un-modele",
        },
        {
          title: "Fanorona",
          desc: "Traditional Malagasy board game implemented in OOP Python.",
          tech: ["Python", "OOP"],
          github: "https://github.com/Lancs0022/Fanorona",
        },
        {
          title: "Design Tool",
          desc: "Drawing and design application built with Java.",
          tech: ["Java", "Swing"],
          github: "https://github.com/Lancs0022/DesignTool",
        },
        {
          title: "Media Player",
          desc: "First learning project — media player built with PHP, HTML & CSS.",
          tech: ["PHP", "HTML/CSS"],
          github: "https://github.com/Lancs0022/Lecteur_media",
        },
        {
          title: "3D Ice Model",
          desc: "3D ice cream model created in OpenSCAD for 3D printing.",
          tech: ["OpenSCAD", "3D Print"],
          github: "https://github.com/Lancs0022/Mod-lisation-3D-d-une-glace",
        },
      ],
    },
    skills: {
      title: "Technical Arsenal",
      subtitle: "Core competencies across the full stack and infrastructure",
      categories: [
        {
          name: "Development",
          items: ["Laravel", "React", "Next.js", "Tailwind CSS", "C++", "Python", "TypeScript", "Java", "PHP"],
        },
        {
          name: "Data & Databases",
          items: [
            "Schema Design",
            "SQL Optimization",
            "PostgreSQL",
            "MySQL",
            "Query Tuning",
            "Indexing Strategy",
          ],
        },
        {
          name: "Infrastructure & Hardware",
          items: [
            "Hardware Diagnostics",
            "Network Admin",
            "PowerShell / Bash",
            "Cloudflare Tunnels",
            "Vercel Deploy",
            "Linux Admin",
            "Docker",
            "Electron",
          ],
        },
      ],
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Have a project in mind or want to collaborate? Let's build something great.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully. I'll get back to you soon.",
      error: "Failed to send message. Please try again.",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with Next.js + Supabase",
    },
  },
  fr: {
    nav: {
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
      admin: "Admin",
      resume: "CV",
      available: "DISPONIBLE POUR PROJETS",
    },
    hero: {
      status: "disponible pour de nouvelles opportunités",
      headline1: "Je construis des ",
      headline2: "logiciels complexes",
      headline3: ", j'optimise des ",
      headline4: "architectures de bases de données",
      headline5: ", et je sécurise l'",
      headline6: "infrastructure d'automatisation",
      headline7: ".",
      sub: "Développeur full-stack et administrateur système avec une solide expérience en optimisation de données et automatisation DevOps. Je gère les projets de bout en bout — de la conception du schéma au déploiement en production.",
      cta: "Discutons",
      ctaSecondary: "Voir les Projets",
    },
    projects: {
      title: "Projets Phares",
      subtitle: "Études de cas de systèmes complexes que j'ai conçus et développés",
      viewGithub: "Voir le Code",
      privateRepo: "Dépôt Privé",
      featured: [
        {
          title: "DeltaTransport ERP",
          badge: "Privé / Client",
          badgeColor: "red" as const,
          description:
            "ERP massif de logistique et gestion de flotte. Gère les approvisionnements entrants/sortants avec bons de livraison, accès multi-utilisateur/multi-rôle, cycle de vie des pneus, suivi des visites techniques, audits de consommation de carburant, traçage de conteneurs et rapports imprimables.",
          longDesc:
            "Gestion complète du cycle de vie pour une entreprise de transport : suivi de la chaîne d'approvisionnement avec bons de livraison, catalogage camions/remorques/chauffeurs, cycle de vie des pneus avec calcul du coût au km, maintenance planifiée et visites techniques, analyse de consommation de carburant, suivi de conteneurs, comptes de voyage par chauffeur, piste d'audit avec horodatage sur chaque action, rapports imprimables. Permissions multi-rôles avec sessions sécurisées.",
          tech: ["Laravel", "React", "MySQL", "PowerShell"],
          metrics: ["Multi-Rôle", "Audit Trail", "Temps Réel"],
          github: "https://github.com/Lancs0022/admin_tools",
        },
        {
          title: "PEJAA",
          badge: "Mémoire de Fin d'Études / En cours",
          badgeColor: "gold" as const,
          description:
            "Plateforme d'audit financier et gestion de stock en temps réel. Inclut une feuille de route pour des agents analytiques IA/LLM pour des alertes financières proactives et de l'analyse prédictive.",
          longDesc:
            "Plateforme d'audit de marchandises avec rapports financiers avancés. Suivi de stock en temps réel avec détection d'écarts. La feuille de route inclut un module d'agent IA connecté via API LLM pour analyser la santé financière, détecter les anomalies et envoyer des alertes proactives aux parties prenantes.",
          tech: ["Next.js", "TypeScript", "PostgreSQL", "LLM/IA"],
          metrics: ["Audit Financier", "Agents IA", "Temps Réel"],
          github: null,
        },
        {
          title: "DevOps Admin Tools",
          badge: "Privé / Outil Interne",
          badgeColor: "red" as const,
          description:
            "Application desktop Electron automatisant le déploiement et le monitoring de l'ERP. Intègre un watchdog serveur, des tunnels Cloudflare automatiques et des sauvegardes cloud planifiées vers Google Drive chaque jour à 18h.",
          longDesc:
            "Application Electron protégée par mot de passe qui automatise : démarrage des serveurs Laravel + React via tâches planifiées, processus watchdog qui redémarre et optimise les serveurs ne répondant pas, création automatique de tunnels Cloudflare exposant les serveurs et la base de données sur le web, sauvegardes quotidiennes à 18h vers Google Drive, tableau de bord de statut serveur en temps réel avec commandes PowerShell start/stop/restart.",
          tech: ["Electron", "PowerShell", "Cloudflare", "Google Drive API"],
          metrics: ["Watchdog", "Auto-Backup", "Tunnels"],
          github: "https://github.com/Lancs0022/admin_tools",
        },
      ],
    },
    secondary: {
      title: "Outils & Laboratoire",
      subtitle: "Utilitaires open-source et projets d'apprentissage",
      items: [
        {
          title: "App de Gestion d'Achat",
          desc: "Application desktop Qt/C++ pour la gestion de purchases et services de photocopie.",
          tech: ["Qt", "C++"],
          github: "https://github.com/Lancs0022/Application-de-gestion-d-achat",
        },
        {
          title: "Scanneur de Texte",
          desc: "Application Python d'extraction de texte à partir d'images avec Tesseract OCR.",
          tech: ["Python", "Tesseract"],
          github: "https://github.com/Lancs0022/Scaneur-de-texte",
        },
        {
          title: "Traitement d'Image",
          desc: "Algorithmes de manipulation d'images et scripts de traitement en Octave.",
          tech: ["Octave", "MATLAB"],
          github: "https://github.com/Lancs0022/Projet-Octave",
        },
        {
          title: "Explorateur de Fichiers",
          desc: "Application système d'exploration de fichiers fonctionnelle en Java.",
          tech: ["Java", "Swing"],
          github: "https://github.com/Lancs0022/ExplorateurDeFichier",
        },
        {
          title: "Communication LLM",
          desc: "Scripts d'intégration pour communiquer avec des modèles LLM via API.",
          tech: ["Python", "LLM API"],
          github: "https://github.com/Lancs0022/Communiquer-avec-un-modele",
        },
        {
          title: "Fanorona",
          desc: "Jeu de société traditionnel malgache implémenté en POO Python.",
          tech: ["Python", "POO"],
          github: "https://github.com/Lancs0022/Fanorona",
        },
        {
          title: "Outil de Dessin",
          desc: "Application de dessin et conception développée en Java.",
          tech: ["Java", "Swing"],
          github: "https://github.com/Lancs0022/DesignTool",
        },
        {
          title: "Lecteur Multimédia",
          desc: "Premier projet d'apprentissage — lecteur multimédia en PHP, HTML & CSS.",
          tech: ["PHP", "HTML/CSS"],
          github: "https://github.com/Lancs0022/Lecteur_media",
        },
        {
          title: "Modèle 3D Glace",
          desc: "Modèle 3D de glace créé dans OpenSCAD pour impression 3D.",
          tech: ["OpenSCAD", "Impression 3D"],
          github: "https://github.com/Lancs0022/Mod-lisation-3D-d-une-glace",
        },
      ],
    },
    skills: {
      title: "Arsenal Technique",
      subtitle: "Compétences transverses sur l'ensemble de la stack et l'infrastructure",
      categories: [
        {
          name: "Développement",
          items: ["Laravel", "React", "Next.js", "Tailwind CSS", "C++", "Python", "TypeScript", "Java", "PHP"],
        },
        {
          name: "Data & Bases de Données",
          items: [
            "Conception de Schémas",
            "Optimisation SQL",
            "PostgreSQL",
            "MySQL",
            "Optimisation de Requêtes",
            "Stratégie d'Indexation",
          ],
        },
        {
          name: "Infrastructure & Matériel",
          items: [
            "Diagnostics Matériels",
            "Administration Réseau",
            "PowerShell / Bash",
            "Tunnels Cloudflare",
            "Déploiement Vercel",
            "Admin Linux",
            "Docker",
            "Electron",
          ],
        },
      ],
    },
    contact: {
      title: "Me Contacter",
      subtitle: "Un projet en tête ou envie de collaborer ? Construisons quelque chose de grand.",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le Message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès. Je vous répondrai bientôt.",
      error: "Échec de l'envoi. Veuillez réessayer.",
    },
    footer: {
      rights: "Tous droits réservés.",
      builtWith: "Construit avec Next.js + Supabase",
    },
  },
};

// ─── Context ─────────────────────────────────────────────────────────
const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [ldm, setLdm] = useState(false);

  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "fr" : "en")), []);
  const toggleLdm = useCallback(() => setLdm((l) => !l), []);

  useEffect(() => {
    const el = document.documentElement;
    if (ldm) {
      el.classList.add("ldm");
    } else {
      el.classList.remove("ldm");
    }
  }, [ldm]);

  return (
    <SiteContext.Provider value={{ lang, toggleLang, ldm, toggleLdm, t: translations[lang] }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
