import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/mock-data/projects';

interface ProjectCardProps {
    project: Project;
    /** Grid cha (masonry) truyền span/style riêng cho từng card qua đây */
    className?: string;
    style?: React.CSSProperties;
}

export default function ProjectCard({ project, className, style }: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${project.categorySlug}/${project.subCategorySlug}/${project.slug}`}
            style={style}
            className={`group relative aspect-video cursor-pointer overflow-hidden rounded bg-neutral-900 ring-1 ring-white/[0.06] ${className ??
                ''}`}
        >
            <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {project.featured && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-pink-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Featured
                </span>
            )}

            {/* Overlay gradient - title/author chỉ hiện khi hover, đúng theo design tham khảo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="mb-1 line-clamp-1 text-base font-semibold text-white">{project.title}</h3>
                    <p className="line-clamp-1 text-sm text-neutral-300">{project.author.name}</p>
                </div>
            </div>
        </Link>
    );
}
