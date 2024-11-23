import React from 'react'
import Icon from '@/components/images/Icon'

import { Service } from '@/types/service'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { truncateWithEllipses } from '@/lib/helper'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

interface ServiceCardProps {
  service: Service
}

const ServiceCard1: React.FC<ServiceCardProps> = async ({ service }) => {
  const t = await getTranslations('Service')

  return (
    <div key={service.id} className="flex flex-col">
      <dt className="items-top flex min-h-20 gap-x-3 text-xl font-bold leading-7 text-gray-900">
        <div className="text-primary-600">
          <Icon size={48} name={service.classIcon as any} />
        </div>
        {service.pageIntro.title}
      </dt>
      <dd className="mt-1 flex flex-auto flex-col text-lg leading-6 text-gray-600">
        <BasicMarkdown>
          {truncateWithEllipses(service.pageIntro.content, 150)}
        </BasicMarkdown>
        {/* <BasicMarkdown>{service.pageIntro.content}</BasicMarkdown> */}

        <Link
          href={`/services/${service.slug}`}
          className="mt-4 text-sm font-semibold leading-6 text-primary-600"
        >
          {t('view_more')} <span aria-hidden="true">→</span>
        </Link>
      </dd>
    </div>
  )
}

export default ServiceCard1
