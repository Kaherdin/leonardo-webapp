// components/ui/CultureCard.tsx

import React from 'react'
import { GridListItem } from '../ui/GridList'
import { Culture } from '@/types/global'

interface CultureCardProps {
  culture: Culture
}

const CultureCard: React.FC<CultureCardProps> = ({ culture }) => {
  return (
    <GridListItem key={culture.id} title={culture.title} invert>
      {culture.content}
    </GridListItem>
  )
}

export default CultureCard
