import { LegalDocument } from "@/lib/content-utils";
import type { Section } from "@/lib/content-utils";
import type { Metadata } from "next";

// Define metadata for the terms page
export const metadata: Metadata = {
  title: "Terms of Service | Rare Evo 2025",
  description:
    "Read the terms and conditions for using the Rare Evo 2025 NFT ticket platform and attending our event.",
  openGraph: {
    title: "Terms of Service | Rare Evo 2025",
    description:
      "Read the terms and conditions for using the Rare Evo 2025 NFT ticket platform and attending our event.",
    type: "website",
    url: "https://rareevo.io/terms",
    siteName: "Rare Evo 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Rare Evo 2025",
    description:
      "Read the terms and conditions for using the Rare Evo 2025 NFT ticket platform and attending our event.",
  },
};

// Terms of service content structured as data
const termsOfServiceSections: Section[] = [
  {
    id: "1",
    title: "Introduction",
    content: [
      {
        type: "paragraph",
        text: 'Welcome to RARE EVO 2025. These Terms of Service ("Terms") govern your access to and use of the RARE EVO 2025 website, mobile application, and services (collectively, the "Services") operated by Rare Network LLC ("we," "our," or "us").',
      },
      {
        type: "paragraph",
        text: "By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.",
      },
    ],
  },
  {
    id: "2",
    title: "Eligibility",
    content: [
      {
        type: "paragraph",
        text: "You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet all eligibility requirements.",
      },
    ],
  },
  {
    id: "3",
    title: "Account Registration",
    content: [
      {
        type: "paragraph",
        text: "To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
      },
      {
        type: "paragraph",
        text: "You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
      },
    ],
  },
  {
    id: "4",
    title: "NFT Tickets",
    content: [
      {
        type: "paragraph",
        text: "Our Services allow you to purchase, manage, and use NFT-based tickets for the RARE EVO 2025 event. By purchasing an NFT ticket, you agree to the following:",
      },
      {
        type: "list",
        items: [
          "You are purchasing a non-fungible token (NFT) that represents a ticket to the RARE EVO 2025 event.",
          "Ownership of the NFT grants you access to the event and any associated benefits as described at the time of purchase.",
          "You are responsible for maintaining control of your wallet and the NFT ticket.",
          "NFT tickets are subject to verification at the event entrance.",
          "We reserve the right to deny entry if the NFT ticket cannot be verified or has been reported as stolen or fraudulently obtained.",
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Prohibited Activities",
    content: [
      {
        type: "paragraph",
        text: "You agree not to engage in any of the following prohibited activities:",
      },
      {
        type: "list",
        items: [
          "Violating any applicable laws, regulations, or third-party rights",
          "Using the Services for any illegal or unauthorized purpose",
          "Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Services",
          "Impersonating another person or entity",
          "Selling, reselling, or exploiting for any commercial purposes any part of the Services without our express written consent",
          "Attempting to modify, reverse-engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Services",
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Intellectual Property Rights",
    content: [
      {
        type: "paragraph",
        text: "The Services and their original content, features, and functionality are and will remain the exclusive property of Rare Network LLC and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.",
      },
      {
        type: "paragraph",
        text: "Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Rare Network LLC.",
      },
    ],
  },
  {
    id: "7",
    title: "Termination",
    content: [
      {
        type: "paragraph",
        text: "We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.",
      },
      {
        type: "paragraph",
        text: "If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.",
      },
    ],
  },
  {
    id: "8",
    title: "Limitation of Liability",
    content: [
      {
        type: "paragraph",
        text: "In no event shall Rare Network LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.",
      },
    ],
  },
  {
    id: "9",
    title: "Governing Law",
    content: [
      {
        type: "paragraph",
        text: "These Terms shall be governed and construed in accordance with the laws of the State of Nevada, without regard to its conflict of law provisions.",
      },
      {
        type: "paragraph",
        text: "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.",
      },
    ],
  },
  {
    id: "10",
    title: "Changes to Terms",
    content: [
      {
        type: "paragraph",
        text: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.',
      },
      {
        type: "paragraph",
        text: "By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, you are no longer authorized to use the Services.",
      },
    ],
  },
  {
    id: "11",
    title: "Contact Us",
    content: [
      {
        type: "paragraph",
        text: "If you have any questions about these Terms, please contact us at:",
      },
      {
        type: "contact",
        email: "legal@rareevo.io",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <LegalDocument
        title="Terms of Service"
        lastUpdated="July 1, 2024"
        sections={termsOfServiceSections}
      />
    </div>
  );
}
