import { notFound } from 'next/navigation';
import { projectCategories } from '@/mock-data/projects';
import Projects from '@/views/Projects';
import { PAGE_SIZE } from '@/lib/constanst';
import { projectService } from '@/services/project-service';

interface CategoryPageProps {
    params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryId } = await params;

    const category = projectCategories.find((c) => c.slug === categoryId);

    if (!category) {
        notFound();
    }

    const { items, nextCursor, hasMore } = await projectService.getProjects({
        cursor: null,
        limit: PAGE_SIZE,
        categorySlug: category.slug,
    });

    return (
        <Projects
            key={category.slug}
            categorySlug={category.slug}
            initialProjects={items}
            initialCursor={nextCursor}
            initialHasMore={hasMore}
        />
    );
}

// Pre-render all category pages at build time (SSG)
export function generateStaticParams() {
    return projectCategories.map((cat) => ({ categoryId: cat.slug }));
}
