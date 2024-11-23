import React from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/button'

import { Project } from '@/types/project'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { truncateWithEllipses } from '@/lib/helper'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { useTranslations } from 'next-intl'

interface ProjectCardProps {
  project: Project
}

const ProjectCard1: React.FC<ProjectCardProps> = ({ project }) => {
  const t = useTranslations('Project')

  return (
    <FadeIn
      key={project.id}
      className="flex"
      style={{ opacity: 1, transform: 'none' }}
    >
      <Link href={`/projects/${project.slug}`}>
        <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
          <div className="flex items-center">
            <div>
              {project?.logo?.url && (
                <NextCloudinaryImage
                  src={project?.logo?.url}
                  alt={project.client}
                  width={100}
                  height={20}
                  crop="fill_pad"
                  className="mr-3"
                />
              )}
            </div>
          </div>
          {project.pageIntro.cover && (
            <div className="my-6">
              {project?.pageIntro?.cover.url && (
                <NextCloudinaryImage
                  src={project?.pageIntro?.cover.url}
                  alt={project?.pageIntro?.title}
                  width={600}
                  height={500}
                  className="rounded-md"
                  crop="fill"
                />
              )}
            </div>
          )}

          <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
            <time dateTime={project.year} className="font-semibold">
              {project.year}
            </time>
            <span className="text-neutral-300" aria-hidden="true">
              /
            </span>
            <span>{project.service}</span>
          </p>
          <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
            {project?.pageIntro?.title}
          </p>
          <div className="mt-4 text-base text-neutral-600">
            <BasicMarkdown>
              {truncateWithEllipses(project?.pageIntro?.content, 75)}
            </BasicMarkdown>
          </div>
          <div className="mt-6">
            <Button variant="primary">{t('view_more')}</Button>
          </div>
        </article>
      </Link>
    </FadeIn>
  )
}

export default ProjectCard1
