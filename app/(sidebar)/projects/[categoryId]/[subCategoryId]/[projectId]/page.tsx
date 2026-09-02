import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { projectService } from '@/services/project-service';
import { mockProjects } from '@/mock-data/projects';
import Project from '@/views/Project';

interface ProjectPageProps {
    params: Promise<{ categoryId: string; subCategoryId: string; projectId: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { projectId } = await params;
    const project = await projectService.getProjectBySlug(projectId);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { categoryId, subCategoryId, projectId } = await params;

    const project = await projectService.getProjectBySlug(projectId);

    if (!project || project.categorySlug !== categoryId || project.subCategorySlug !== subCategoryId) {
        notFound();
    }

    return (
        <Project project={project}/>
    );
}

// TODO: real api
export function generateStaticParams() {
    return mockProjects.map((project) => ({
        categoryId: project.categorySlug,
        subCategoryId: project.subCategorySlug,
        projectId: project.slug,
    }));
}