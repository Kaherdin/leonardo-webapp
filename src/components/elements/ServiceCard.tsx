import { Service } from '@/types/service'
import Icon from '@/components/images/Icon'
import BasicMarkdown from '../ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'
import { truncateWithEllipses } from '@/lib/helper'
import Link from 'next/link'
import { IconProps } from '@radix-ui/react-icons/dist/types'

export const ServiceCard: React.FC<{ service: Service }> = async ({
  service,
}) => {
  const t = await getTranslations('Service')

  return (
    <div key={service.id} className="flex flex-col">
      <dt className="items-top flex min-h-20 gap-x-3 text-xl font-bold leading-7 text-gray-900">
        <div className="text-primary-600">
          <Icon
            size={48}
            /* @ts-ignore */
            name={service.classIcon as IconProps}
          />
        </div>
        {service.pageIntro.title}
      </dt>
      <dd className="mt-1 flex flex-auto flex-col text-lg leading-6 text-gray-600">
        <BasicMarkdown>
          {truncateWithEllipses(service.pageIntro.content, 150)}
        </BasicMarkdown>
        {/* <BasicMarkdown>{service.pageIntro.content}</BasicMarkdown> */}

        <Link
          href={`/services/${service.id}`}
          className="mt-4 text-sm font-semibold leading-6 text-primary-600"
        >
          {t('view_more')} <span aria-hidden="true">→</span>
        </Link>
      </dd>
    </div>
  )
}
