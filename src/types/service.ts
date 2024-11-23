import { CTA, PageIntro } from './global'
import { Project } from './project'

export interface Service {
  id: string
  pageIntro: PageIntro
  classIcon: string
  content: string //TODO: Discuss the utility
  cta: CTA[] //TODO: Discuss the utility
  projects: Project[]
  slug: string
}
