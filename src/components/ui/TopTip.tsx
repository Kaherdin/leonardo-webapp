import React from 'react'
import clsx from 'clsx'
import { Border } from '@/components/ui/Border'

interface TopTipProps {
  children: React.ReactNode
  className?: string
}

const TopTip: React.FC<TopTipProps> = ({ children, className }) => {
  return (
    <Border position="left" className={clsx('my-10 pl-8', className)}>
      <p className="font-display text-sm font-bold uppercase tracking-widest text-neutral-950">
        Top tip
      </p>
      <div className="mt-4">{children}</div>
    </Border>
  )
}

export default TopTip
