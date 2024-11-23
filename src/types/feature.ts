import dynamicIconImports from 'lucide-react/dynamicIconImports'
export interface Feature {
  id: string
  name: string
  classIcon: keyof typeof dynamicIconImports
  content: any
  link: string
}
