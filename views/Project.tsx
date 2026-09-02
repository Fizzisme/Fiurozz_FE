'use client'

import ImageGallery from '@/components/ui/project/image-gallery';
import AuthorCard from '@/components/ui/project/author-card';
import ProjectTabs from '@/components/ui/project/project-tabs';
import type {Project} from '@/mock-data/projects';
import { ArrowLeft } from '@/components/animate-ui/icons/arrow-left';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import * as React from 'react';


export default function Project({project}:{project: Project}) {
    const router = useRouter();



  return (
      <div className="py-5">
          <div className="container mx-auto max-w-5xl px-4 lg:px-0">

              <Button variant="ghost" asChild className="cursor-pointer !px-0 text-[#52514e] dark:text-[#c3c2b7]"
                      onClick={() => router.back()}
              >
                  <AnimateIcon animateOnHover className='flex gap-1 items-center justify-center'>

                          <ArrowLeft />
                 Back
                  </AnimateIcon>
              </Button>

              <header className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h1>
                  <p className="text-gray-500 text-sm md:text-base">{project.description}</p>
              </header>

              <ImageGallery
                  thumbnail={project.thumbnail}
                  images={project.images}
                  title={project.title}
              />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div className="flex">
                      <AuthorCard
                          name={project.author.name}
                          email={project.author.email}
                          avatar={project.author.avatar}
                      />
                      <div className="grid flex-1 text-left text-lg leading-tight ml-2">
                          <span className="truncate font-semibold">{project.author.name}</span>
                          <span className="truncate text-xs text-[#6a7282]">{project.author.email}</span>
                      </div>
                  </div>
                  {/*<ProjectActions demoUrl={project.demoUrl} githubUrl={project.githubUrl} />*/}
              </div>
          </div>

          <ProjectTabs project={project} />
      </div>
  );
};