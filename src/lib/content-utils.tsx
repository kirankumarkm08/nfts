// Types for content structure
export type ContentItem = {
  type: "paragraph" | "list" | "contact";
  text?: string;
  items?: string[];
  email?: string;
};

export type Subsection = {
  id: string;
  title: string;
  content: ContentItem[];
};

export type Section = {
  id: string;
  title: string;
  content?: ContentItem[];
  subsections?: Subsection[];
};

// Reusable component to render different content types
export const ContentRenderer = ({ content }: { content: ContentItem }) => {
  if (content.type === "paragraph") {
    return <p className="mb-4">{content.text}</p>;
  } else if (content.type === "list") {
    return (
      <ul className="list-disc pl-6 space-y-2 mb-4">
        {content.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else if (content.type === "contact") {
    return (
      <p className="mb-4">
        <a
          href={`mailto:${content.email}`}
          className="text-[var(--primary)] hover:underline"
        >
          {content.email}
        </a>
      </p>
    );
  }
  return null;
};

// Reusable component to render a legal document (privacy policy, terms, etc.)
export const LegalDocument = ({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: Section[];
}) => {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        Last Updated: {lastUpdated}
      </p>

      {/* Loop through main sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {section.id}. {section.title}
          </h2>

          {/* Render content if it exists */}
          {section.content &&
            section.content.map((contentItem, index) => (
              <ContentRenderer key={index} content={contentItem} />
            ))}

          {/* Render subsections if they exist */}
          {section.subsections &&
            section.subsections.map((subsection) => (
              <div key={subsection.id} className="mb-6">
                <h3 className="text-lg font-medium mb-3">
                  {subsection.id} {subsection.title}
                </h3>
                {subsection.content &&
                  subsection.content.map((contentItem, index) => (
                    <ContentRenderer key={index} content={contentItem} />
                  ))}
              </div>
            ))}
        </section>
      ))}
    </div>
  );
};
