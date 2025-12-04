import matter from 'gray-matter';

/**
 * Roundtable session metadata extracted from frontmatter
 */
export interface RoundtableMetadata {
  id: string;
  title: string;
  description: string;
  nextSession: string;
  duration: string;
  location?: string;
  published: boolean;
  date: string;
}

/**
 * Complete roundtable session with content
 */
export interface Roundtable extends RoundtableMetadata {
  content: string;
  slug: string;
}

/**
 * Dynamically import all markdown files from the roundtables directory
 */
const roundtableModules = import.meta.glob('/src/content/roundtables/*.md', {
  eager: false,
  as: 'raw',
});

/**
 * Get all roundtable sessions (published and unpublished)
 */
export async function getAllRoundtables(): Promise<Roundtable[]> {
  const roundtables: Roundtable[] = [];

  console.log('Roundtable modules found:', Object.keys(roundtableModules));

  for (const path in roundtableModules) {
    // Skip README.md
    if (path.includes('README.md')) continue;

    console.log('Loading roundtable from:', path);
    const rawContent = await roundtableModules[path]() as string;
    const { data, content } = matter(rawContent);

    // Extract slug from file path
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    console.log('Parsed roundtable:', { slug, data });

    roundtables.push({
      ...(data as RoundtableMetadata),
      content,
      slug,
    });
  }

  console.log('Total roundtables loaded:', roundtables.length);

  // Sort by date (newest first)
  return roundtables.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get only published roundtable sessions
 */
export async function getPublishedRoundtables(): Promise<Roundtable[]> {
  const allRoundtables = await getAllRoundtables();
  return allRoundtables.filter(roundtable => roundtable.published);
}

/**
 * Get the latest published roundtable session
 */
export async function getLatestRoundtable(): Promise<Roundtable | null> {
  const publishedRoundtables = await getPublishedRoundtables();
  return publishedRoundtables[0] || null;
}

/**
 * Get a single roundtable by slug
 */
export async function getRoundtableBySlug(slug: string): Promise<Roundtable | null> {
  const allRoundtables = await getAllRoundtables();
  return allRoundtables.find(roundtable => roundtable.slug === slug) || null;
}
