import matter from 'gray-matter';

/**
 * Event metadata extracted from frontmatter
 */
export interface EventMetadata {
  id: string;
  title: string;
  date: string | null; // ISO format or null for TBD
  tags: string[];
  rsvpUrl: string;
  location?: string;
  description?: string;
  highlight?: boolean;
  published: boolean;
}

/**
 * Complete event with content
 */
export interface Event extends EventMetadata {
  content: string;
  slug: string;
}

/**
 * Dynamically import all markdown files from the events directory
 */
const eventModules = import.meta.glob('/src/content/events/*.md', {
  eager: false,
  as: 'raw',
});

/**
 * Get all events (published and unpublished)
 */
export async function getAllEvents(): Promise<Event[]> {
  const events: Event[] = [];

  for (const path in eventModules) {
    if (path.includes('README.md')) continue;

    const rawContent = await eventModules[path]() as string;
    const { data, content } = matter(rawContent);

    const slug = path.split('/').pop()?.replace('.md', '') || '';

    events.push({
      ...(data as EventMetadata),
      content,
      slug,
    });
  }

  return events;
}

/**
 * Get only published events
 */
export async function getPublishedEvents(): Promise<Event[]> {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.published);
}

/**
 * Get upcoming events (future dates + TBD), sorted by date
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  const publishedEvents = await getPublishedEvents();
  const now = new Date();

  // Separate events with dates and TBD events
  const datedEvents = publishedEvents.filter(e => e.date);
  const tbdEvents = publishedEvents.filter(e => !e.date);

  // Filter to only future events
  const futureEvents = datedEvents.filter(e => new Date(e.date!) >= now);

  // Sort dated events by date (soonest first)
  futureEvents.sort((a, b) =>
    new Date(a.date!).getTime() - new Date(b.date!).getTime()
  );

  // TBD events go at the end
  return [...futureEvents, ...tbdEvents];
}

/**
 * Get past events, sorted by date (most recent first)
 */
export async function getPastEvents(): Promise<Event[]> {
  const publishedEvents = await getPublishedEvents();
  const now = new Date();

  const pastEvents = publishedEvents.filter(e => e.date && new Date(e.date) < now);

  return pastEvents.sort((a, b) =>
    new Date(b.date!).getTime() - new Date(a.date!).getTime()
  );
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.slug === slug) || null;
}

/**
 * Format event date for display
 */
export function formatEventDate(date: string | null): string {
  if (!date) return 'Date TBD';

  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Get month and day from date for calendar display
 */
export function getDateParts(date: string | null): { month: string; day: string } {
  if (!date) return { month: 'TBD', day: '?' };

  const d = new Date(date);
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: d.getDate().toString(),
  };
}
