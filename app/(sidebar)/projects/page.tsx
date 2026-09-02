import Projects from '@/views/Projects';
import { projectService } from '@/services/project-service';
import { PAGE_SIZE } from '@/lib/constanst';

export default async function ProjectsPage() {
    const { items, nextCursor, hasMore } = await projectService.getProjects({
        cursor: null,
        limit: PAGE_SIZE,
    });

    return <Projects initialProjects={items} initialCursor={nextCursor} initialHasMore={hasMore} />;
}
