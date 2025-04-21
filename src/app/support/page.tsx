import type { Metadata } from "next";

// Define metadata for the support page
export const metadata: Metadata = {
  title: "Support | Rare Evo 2025",
  description:
    "Get help with your NFT tickets, wallet connection, or any other questions about the Rare Evo 2025 event.",
  openGraph: {
    title: "Support | Rare Evo 2025",
    description:
      "Get help with your NFT tickets, wallet connection, or any other questions about the Rare Evo 2025 event.",
    type: "website",
    url: "https://rareevo.io/support",
    siteName: "Rare Evo 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Rare Evo 2025",
    description:
      "Get help with your NFT tickets, wallet connection, or any other questions about the Rare Evo 2025 event.",
  },
};

// Define types for support page content
type ContactInfo = {
  title: string;
  description: string;
  email: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

// Structured data for contact information
const contactInfoItems: ContactInfo[] = [
  {
    title: "General Inquiries",
    description: "For general questions about the event:",
    email: "info@rareevo.io",
  },
  {
    title: "Technical Support",
    description: "For issues with your NFT tickets or wallet:",
    email: "support@rareevo.io",
  },
];

// Structured data for FAQ items
const faqItems: FaqItem[] = [
  {
    question: "How do I connect my wallet?",
    answer:
      "Click the 'Connect Wallet' button in the top right corner of the website and select your wallet provider. We support MetaMask, WalletConnect, and Coinbase Wallet.",
  },
  {
    question: "What blockchain networks are supported?",
    answer:
      "RARE EVO 2025 NFT tickets are minted on Ethereum and Polygon networks. Make sure your wallet is connected to the correct network when purchasing or viewing your tickets.",
  },
  {
    question: "How do I transfer my NFT ticket to someone else?",
    answer:
      "You can transfer your NFT ticket by sending it to another wallet address. Please note that certain ticket types may have transfer restrictions or fees.",
  },
  {
    question: "What happens if I lose access to my wallet?",
    answer:
      "If you lose access to your wallet, you may lose access to your NFT tickets. We recommend using a wallet with robust recovery options and keeping your recovery phrase in a secure location.",
  },
  {
    question: "Will there be physical tickets as well?",
    answer:
      "No, RARE EVO 2025 uses exclusively NFT-based digital tickets. You will need to present your NFT ticket via your wallet at the event entrance for verification.",
  },
];

// Form field type
type FormField = {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  placeholder: string;
  required: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
};

// Form fields data
const formFields: FormField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  {
    id: "subject",
    label: "Subject",
    type: "select",
    placeholder: "",
    required: true,
    options: [
      { value: "", label: "Select a topic" },
      { value: "ticket", label: "NFT Ticket Support" },
      { value: "wallet", label: "Wallet Connection Issues" },
      { value: "event", label: "Event Information" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Please describe your issue or question in detail...",
    required: true,
    rows: 5,
  },
];

// Form field renderer component
const FormFieldRenderer = ({ field }: { field: FormField }) => {
  switch (field.type) {
    case "text":
    case "email":
      return (
        <div>
          <label htmlFor={field.id} className="block mb-2 text-sm font-medium">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            className="w-full p-2 rounded-md border border-[var(--border)] bg-[var(--background)]"
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      );
    case "select":
      return (
        <div>
          <label htmlFor={field.id} className="block mb-2 text-sm font-medium">
            {field.label}
          </label>
          <select
            id={field.id}
            className="w-full p-2 rounded-md border border-[var(--border)] bg-[var(--background)]"
            required={field.required}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "textarea":
      return (
        <div>
          <label htmlFor={field.id} className="block mb-2 text-sm font-medium">
            {field.label}
          </label>
          <textarea
            id={field.id}
            rows={field.rows || 3}
            className="w-full p-2 rounded-md border border-[var(--border)] bg-[var(--background)]"
            placeholder={field.placeholder}
            required={field.required}
          ></textarea>
        </div>
      );
    default:
      return null;
  }
};

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Support</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            Our support team is available to assist you with any questions or
            issues you may have regarding your NFT tickets or the RARE EVO 2025
            event.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Loop through contact info items */}
            {contactInfoItems.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-[var(--border)] rounded-lg"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="mb-2">{item.description}</p>
                <a
                  href={`mailto:${item.email}`}
                  className="text-[var(--primary)] hover:underline"
                >
                  {item.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Render first two form fields in a grid */}
              {formFields.slice(0, 2).map((field) => (
                <FormFieldRenderer key={field.id} field={field} />
              ))}
            </div>

            {/* Render remaining form fields */}
            {formFields.slice(2).map((field) => (
              <FormFieldRenderer key={field.id} field={field} />
            ))}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
            >
              Submit Request
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">FAQ</h2>
          <div className="space-y-4">
            {/* Loop through FAQ items */}
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="p-4 border border-[var(--border)] rounded-lg"
              >
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-[var(--muted-foreground)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
