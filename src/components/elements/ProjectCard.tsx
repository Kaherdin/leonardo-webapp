import React from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'

import { Project } from '@/types/project'
import ReactMarkdown from 'react-markdown'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import BasicMarkdown from '../ui/BasicMarkdown'
import { truncateWithEllipses } from '@/lib/helper'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = async ({ project }) => {
  const t = await getTranslations('Project')

  return (
    <FadeIn key={project.id} className="flex">
      <Link href={`/projects/${project.id}`}>
        <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
          <div className="flex items-center">
            <div>
              <NextCloudinaryImage
                src={project.logo.url}
                alt={project.client}
                width={100}
                height={20}
                crop="fill_pad"
                className="mr-3"
              />
            </div>
          </div>
          {project.pageIntro.cover && (
            <div className="my-6">
              <NextCloudinaryImage
                src={project.pageIntro.cover.url}
                alt={project.pageIntro.title}
                width={600}
                height={500}
                className="rounded-md"
                crop="fill"
              />
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
            {/* <Link
              href={`/projects/${project.id}`}
              className={buttonVariants({ variant: 'primary' })}
            >
              {t('view_more')}
            </Link> */}

            <Button variant="primary">{t('view_more')}</Button>
          </div>
        </article>
      </Link>
    </FadeIn>
  )
}

export default ProjectCard
