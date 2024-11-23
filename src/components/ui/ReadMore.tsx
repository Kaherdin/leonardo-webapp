import React, { useState } from 'react'
import { getTranslations } from 'next-intl/server'

export async function TruncatedTextReadMore({
  text,
  max,
}: {
  text: string
  max: number
}) {
  const [isTruncated, setIsTruncated] = useState(true)
  const toggleTruncated = () => setIsTruncated(!isTruncated)

  const t = await getTranslations('General')

  if (text.length <= max) {
    return (
      <p className="pt-2 text-secondary-700">
        <em>{text}</em>
      </p>
    )
  }

  const displayText = isTruncated ? text.substr(0, max - 1) + '...' : text

  return (
    <p className="pt-2 text-secondary-700">
      <em>{displayText}</em>
      <br />
      <a className="link cursor-pointer" onClick={toggleTruncated}>
        {isTruncated ? t('read_more') : t('read_less')}
      </a>
    </p>
  )
}
