import type { GetProjectsCursorParams, Project, ProjectsCursorPage } from '@/mock-data/projects';
import { getProjectBySlugAction, getProjectsCursorPageAction } from '@/actions/projects-action';

export const projectService = {

    async getProjects(params: GetProjectsCursorParams = {}): Promise<ProjectsCursorPage> {
        return getProjectsCursorPageAction(params);
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        return getProjectBySlugAction(slug);
    },
};