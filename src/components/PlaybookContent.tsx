import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PlaybookContentProps {
  content: string;
}

interface Section {
  type: 'normal' | 'menu';
  title?: string;
  content: string;
}

/**
 * Component that renders playbook markdown content
 * Automatically converts "#### Menu Item: [Title]" headings into accordions
 */
export const PlaybookContent = ({ content }: PlaybookContentProps) => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    // Split content into sections based on any "####" heading (h4)
    const lines = content.split('\n');
    const parsedSections: Section[] = [];
    let currentSection: Section = { type: 'normal', content: '' };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this line is an h4 heading (exactly 4 #'s, not 3 or 5)
      if (/^####\s+(?!#)/.test(line)) {
        // Save current section if it has content
        if (currentSection.content.trim()) {
          parsedSections.push(currentSection);
        }

        // Start new accordion section
        // Remove "Menu Item:" prefix if present, otherwise just remove ####
        let title = line.replace(/^####\s+/, '').trim();
        if (title.startsWith('Menu Item:')) {
          title = title.replace('Menu Item:', '').trim();
        }

        currentSection = {
          type: 'menu',
          title,
          content: ''
        };
      } else if (/^#{1,3}\s+/.test(line) || /^#{5,6}\s+/.test(line)) {
        // This is an h1, h2, h3, h5, or h6 heading - close accordion and start normal section
        if (currentSection.content.trim() || currentSection.type === 'menu') {
          parsedSections.push(currentSection);
        }

        currentSection = {
          type: 'normal',
          content: line + '\n'
        };
      } else {
        // Add line to current section
        currentSection.content += line + '\n';
      }
    }

    // Add the last section
    if (currentSection.content.trim()) {
      parsedSections.push(currentSection);
    }

    setSections(parsedSections);
  }, [content]);

  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        if (section.type === 'menu') {
          return (
            <Accordion key={index} type="single" collapsible className="border rounded-lg px-4">
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none pt-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }

        // Normal section - render as regular markdown
        return (
          <div key={index} className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {section.content}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
};

export default PlaybookContent;
