import ProjectCardSkeleton from '@/components/ui/project/project-card-skeleton';
import { getSpanClassName } from '@/lib/utils';
import { PAGE_SIZE } from '@/lib/constanst';

export default function ProjectsLoading() {
    return (
        <div className="projects-grid-container">
            <div className="projects-grid">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <ProjectCardSkeleton key={i} className={getSpanClassName(i)} />
                ))}
            </div>
        </div>
    );
}
