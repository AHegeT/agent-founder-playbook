import matter from 'gray-matter';

/**
 * Playbook metadata extracted from frontmatter
 */
export interface PlaybookMetadata {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  metrics: string;
  icon: string;
  published: boolean;
  date: string;
}

/**
 * Complete playbook with content
 */
export interface Playbook extends PlaybookMetadata {
  content: string;
  slug: string;
}

/**
 * Dynamically import all markdown files from the playbooks directory
 */
const playbookModules = import.meta.glob('/src/content/playbooks/*.md', {
  eager: false,
  as: 'raw',
});

/**
 * Get all playbooks (published and unpublished)
 */
export async function getAllPlaybooks(): Promise<Playbook[]> {
  const playbooks: Playbook[] = [];

  console.log('Playbook modules found:', Object.keys(playbookModules));

  for (const path in playbookModules) {
    // Skip README.md
    if (path.includes('README.md')) continue;

    console.log('Loading playbook from:', path);
    const rawContent = await playbookModules[path]() as string;
    const { data, content } = matter(rawContent);

    // Extract slug from file path
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    console.log('Parsed playbook:', { slug, data });

    playbooks.push({
      ...(data as PlaybookMetadata),
      content,
      slug,
    });
  }

  console.log('Total playbooks loaded:', playbooks.length);

  // Sort by date (newest first)
  return playbooks.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get only published playbooks
 */
export async function getPublishedPlaybooks(): Promise<Playbook[]> {
  const allPlaybooks = await getAllPlaybooks();
  return allPlaybooks.filter(playbook => playbook.published);
}

/**
 * Get a single playbook by slug
 */
export async function getPlaybookBySlug(slug: string): Promise<Playbook | null> {
  const allPlaybooks = await getAllPlaybooks();
  return allPlaybooks.find(playbook => playbook.slug === slug) || null;
}

/**
 * Get playbooks by category
 */
export async function getPlaybooksByCategory(category: string): Promise<Playbook[]> {
  const publishedPlaybooks = await getPublishedPlaybooks();
  return publishedPlaybooks.filter(
    playbook => playbook.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
  const allPlaybooks = await getAllPlaybooks();
  const categories = new Set(allPlaybooks.map(p => p.category));
  return Array.from(categories).sort();
}
