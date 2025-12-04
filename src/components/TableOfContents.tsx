import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split('\n');
    const flatHeadings: Heading[] = [];

    lines.forEach((line) => {
      // Match h2 (##) and h3 (###) headings only
      const h2Match = line.match(/^##\s+(?!#)(.+)$/);
      const h3Match = line.match(/^###\s+(?!#)(.+)$/);

      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        flatHeadings.push({ id, text, level: 2, children: [] });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        flatHeadings.push({ id, text, level: 3 });
      }
    });

    // Build hierarchical structure
    const hierarchical: Heading[] = [];
    let currentH2: Heading | null = null;

    flatHeadings.forEach((heading) => {
      if (heading.level === 2) {
        currentH2 = heading;
        hierarchical.push(heading);
      } else if (heading.level === 3 && currentH2) {
        currentH2.children!.push(heading);
      }
    });

    setHeadings(hierarchical);
  }, [content]);

  useEffect(() => {
    // Intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newActiveId = entry.target.id;
            setActiveId(newActiveId);

            // Auto-expand parent section when a child becomes active
            headings.forEach((h2) => {
              if (h2.children?.some(child => child.id === newActiveId)) {
                setExpandedSections(prev => new Set(prev).add(h2.id));
              }
            });
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    // Observe all h2 headings and their children
    const allHeadingIds: string[] = [];
    headings.forEach((h2) => {
      allHeadingIds.push(h2.id);
      h2.children?.forEach(child => allHeadingIds.push(child.id));
    });

    allHeadingIds.forEach((id) => {
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

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isChildActive = (h2: Heading): boolean => {
    return h2.children?.some(child => child.id === activeId) || false;
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
        <nav className="space-y-1">
          {headings.map((h2) => {
            const hasChildren = h2.children && h2.children.length > 0;
            const isExpanded = expandedSections.has(h2.id);
            const isH2Active = activeId === h2.id;
            const hasActiveChild = isChildActive(h2);

            return (
              <div key={h2.id}>
                <div className="flex items-center gap-0.5">
                  {hasChildren ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(h2.id);
                        }}
                        className="p-0.5 hover:bg-accent rounded transition-colors flex-shrink-0"
                        aria-label={isExpanded ? "Collapse section" : "Expand section"}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() => scrollToHeading(h2.id)}
                        className={`
                          flex-1 text-left text-sm py-1 px-1 rounded transition-colors hover:bg-accent/50
                          ${
                            isH2Active || hasActiveChild
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        {h2.text}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => scrollToHeading(h2.id)}
                      className={`
                        w-full text-left text-sm py-1 px-1 ml-4 rounded transition-colors hover:bg-accent/50
                        ${
                          isH2Active
                            ? 'text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      {h2.text}
                    </button>
                  )}
                </div>

                {/* Sub-items (h3) - only show when expanded */}
                {hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-2">
                    {h2.children!.map((h3) => (
                      <button
                        key={h3.id}
                        onClick={() => scrollToHeading(h3.id)}
                        className={`
                          block w-full text-left text-sm py-1 px-1 rounded transition-colors hover:bg-accent/50
                          ${
                            activeId === h3.id
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        {h3.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </Card>
    </div>
  );
};

export default TableOfContents;
