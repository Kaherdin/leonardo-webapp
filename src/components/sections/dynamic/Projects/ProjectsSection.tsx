'use client'
import React from 'react'

import { Project } from '@/types/project'
import { PageIntro, Pagination } from '@/types/global'
import { fetchProjects } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeInStagger } from '@/components/ui/FadeIn'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ProjectCard1 from './ProjectCard/ProjectCard1'
import { Section } from '@/components/ui/Section'
import Fetcher from '@/request/Fetcher'
import PaginationMain from '../../Pagination'
interface ProjectsProps {
  projectsSection: { sectionIntro: PageIntro } & { projects: Project[] } & {
    pagination: Pagination
  }
  designType: number
}

interface RenderContentProps {
  projects: Project[]
  sectionIntro: PageIntro
  designType?: number
}

const RenderContent: React.FC<RenderContentProps> = ({
  projects,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <>
          <SectionIntro {...sectionIntro} />
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {projects.map((project: Project) => (
              <FadeIn key={project.id}>
                <ProjectCard1 key={project.id} project={project} />
              </FadeIn>
            ))}
          </FadeInStagger>
        </>
      )
  }
}

const ProjectsSection: React.FC<ProjectsProps> = ({
  projectsSection,
  designType,
}) => {
  const url = '/projects'
  console.log(projectsSection?.projects, 'projectsSection?.projects')
  return (
    <Section>
      {projectsSection?.projects && projectsSection?.projects?.length > 0 ? (
        <div>
          <RenderContent
            projects={projectsSection?.projects}
            sectionIntro={projectsSection.sectionIntro}
            designType={designType}
          />
        </div>
      ) : (
        <Fetcher url={url} paginationMode={projectsSection?.pagination?.value}>
          {({ data, currentPage, totalPages, goToPage }) => {
            return (
              <div>
                <RenderContent
                  projects={data.data}
                  sectionIntro={projectsSection.sectionIntro}
                  designType={designType}
                />
                {projectsSection?.pagination?.value === 'off' ? null : (
                  <PaginationMain
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                  />
                )}
              </div>
            )
          }}
        </Fetcher>
      )}
    </Section>
  )
}

export default ProjectsSection
