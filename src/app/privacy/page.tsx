import { LegalDocument } from "@/lib/content-utils";
import type { Section } from "@/lib/content-utils";
import type { Metadata } from "next";

// Define metadata for the privacy page
export const metadata: Metadata = {
  title: "Privacy Policy | Rare Evo 2025",
  description:
    "Learn how Rare Evo 2025 collects, uses, and protects your personal information when using our NFT ticket platform.",
  openGraph: {
    title: "Privacy Policy | Rare Evo 2025",
    description:
      "Learn how Rare Evo 2025 collects, uses, and protects your personal information when using our NFT ticket platform.",
    type: "website",
    url: "https://rareevo.io/privacy",
    siteName: "Rare Evo 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Rare Evo 2025",
    description:
      "Learn how Rare Evo 2025 collects, uses, and protects your personal information when using our NFT ticket platform.",
  },
};

// Privacy policy content structured as data
const privacyPolicySections: Section[] = [
  {
    id: "1",
    title: "Introduction",
    content: [
      {
        type: "paragraph",
        text: 'Welcome to RARE EVO 2025. This Privacy Policy explains how your personal information is collected, used, and disclosed by Rare Network LLC ("we," "our," or "us") when you use our NFT ticket management application, website (rareevo.io), and services related to the RARE EVO 2025 event taking place August 6-10, 2025 in Las Vegas, NV.',
      },
      {
        type: "paragraph",
        text: "By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.",
      },
    ],
  },
  {
    id: "2",
    title: "Information We Collect",
    subsections: [
      {
        id: "2.1",
        title: "Personal Information",
        content: [
          {
            type: "paragraph",
            text: "When you use our Services, we may collect the following personal information:",
          },
          {
            type: "list",
            items: [
              "Name and contact information (email address, phone number)",
              "Company or organization affiliation",
              "Wallet address and blockchain transaction information",
              "Information related to your NFT tickets (GA, VIP, or WHALE PASS)",
              "Payment information when purchasing tickets or merchandise",
              "Profile information and preferences for event participation",
              "Information provided when contacting customer support",
            ],
          },
        ],
      },
      {
        id: "2.2",
        title: "Usage Data",
        content: [
          {
            type: "paragraph",
            text: "We collect information about how you interact with our Services, including your IP address, browser type, pages visited, time spent on pages, links clicked, and information about your device. When you connect your wallet, we may collect public blockchain data like your wallet address and transaction history related to our smart contracts.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "How We Use Your Information",
    content: [
      {
        type: "paragraph",
        text: "We use the information we collect for various purposes, including:",
      },
      {
        type: "list",
        items: [
          "Providing, maintaining, and improving our Services",
          "Processing transactions and sending related information",
          "Verifying your identity and ticket ownership",
          "Sending administrative messages, updates, and security alerts",
          "Responding to your comments, questions, and customer service requests",
          "Developing new products, services, and features",
          "Monitoring and analyzing trends, usage, and activities",
          "Detecting, preventing, and addressing fraud and security issues",
          "Complying with legal obligations",
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Sharing Your Information",
    content: [
      {
        type: "paragraph",
        text: "We may share your personal information with:",
      },
      {
        type: "list",
        items: [
          "Service providers who perform services on our behalf",
          "Event partners and sponsors (with your consent)",
          "Other users when you interact with them through our Services",
          "In response to legal process or when required by law",
          "In connection with a merger, sale, or acquisition",
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Your Rights and Choices",
    content: [
      {
        type: "paragraph",
        text: "Depending on your location, you may have certain rights regarding your personal information:",
      },
      {
        type: "list",
        items: [
          "Access, correct, or delete your personal information",
          "Object to or restrict certain processing",
          "Data portability",
          "Withdraw consent (where applicable)",
        ],
      },
      {
        type: "paragraph",
        text: "To exercise these rights, please contact us at privacy@rareevo.io. Please note that some information may remain in our records after your request for deletion.",
      },
    ],
  },
  {
    id: "6",
    title: "Security",
    content: [
      {
        type: "paragraph",
        text: "We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "7",
    title: "Changes to This Privacy Policy",
    content: [
      {
        type: "paragraph",
        text: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.',
      },
    ],
  },
  {
    id: "8",
    title: "Contact Us",
    content: [
      {
        type: "paragraph",
        text: "If you have any questions about this Privacy Policy, please contact us at:",
      },
      {
        type: "contact",
        email: "privacy@rareevo.io",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <LegalDocument
        title="Privacy Policy"
        lastUpdated="July 1, 2024"
        sections={privacyPolicySections}
      />
    </div>
  );
}
