import React from 'react'
import Icon from '@/components/images/Icon'

import { Culture } from '@/types/global'
import { getTranslations } from 'next-intl/server'
import { GridListItem } from '@/components/ui/GridList'

interface CultureCardProps {
  culture: Culture
}

const CultureCard1: React.FC<CultureCardProps> = async ({ culture }) => {
  const t = await getTranslations('Culture')

  return (
    <>
      <GridListItem key={culture.id} title={culture.title} invert>
        {culture.content}
      </GridListItem>
    </>
  )
}

export default CultureCard1
