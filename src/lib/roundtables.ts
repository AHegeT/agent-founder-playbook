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
  meetupUrl?: string;
  slidoUrl?: string;
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
 * Get the latest past roundtable session (most recent session that has already occurred)
 */
export async function getLatestPastRoundtable(): Promise<Roundtable | null> {
  const publishedRoundtables = await getPublishedRoundtables();
  const now = new Date();

  // Filter sessions that are in the past
  const pastSessions = publishedRoundtables.filter(session =>
    new Date(session.date) < now
  );

  // Return the most recent past session (already sorted by date desc)
  return pastSessions[0] || null;
}

/**
 * Get the next upcoming roundtable session (next session that hasn't occurred yet)
 */
export async function getNextUpcomingRoundtable(): Promise<Roundtable | null> {
  const publishedRoundtables = await getPublishedRoundtables();
  const now = new Date();

  // Filter sessions that are in the future
  const futureSessions = publishedRoundtables.filter(session =>
    new Date(session.date) >= now
  );

  // Return the closest upcoming session (reverse to get oldest future session)
  return futureSessions.reverse()[0] || null;
}

/**
 * Get a single roundtable by slug
 */
export async function getRoundtableBySlug(slug: string): Promise<Roundtable | null> {
  const allRoundtables = await getAllRoundtables();
  return allRoundtables.find(roundtable => roundtable.slug === slug) || null;
}
