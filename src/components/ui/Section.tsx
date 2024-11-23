import clsx from 'clsx'

type SectionProps<T extends React.ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
}

export function Section<T extends React.ElementType = 'section'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof SectionProps<T>> &
  SectionProps<T>) {
  let Component = as ?? 'section'

  return (
    <Component className={clsx('pb-16', className)}>
      <div>{children}</div>
    </Component>
  )
}
