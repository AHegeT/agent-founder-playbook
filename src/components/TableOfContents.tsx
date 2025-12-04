import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split('\n');
    const extractedHeadings: Heading[] = [];

    lines.forEach((line) => {
      // Match h2 (##) and h3 (###) headings only
      const h2Match = line.match(/^##\s+(?!#)(.+)$/);
      const h3Match = line.match(/^###\s+(?!#)(.+)$/);

      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        extractedHeadings.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        extractedHeadings.push({ id, text, level: 3 });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Card className="sticky top-24 p-6">
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          On This Page
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`
                block w-full text-left text-sm py-1 transition-colors
                ${heading.level === 3 ? 'pl-4' : ''}
                ${
                  activeId === heading.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </Card>
    </div>
  );
};

export default TableOfContents;
