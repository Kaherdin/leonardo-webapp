import { PageIntro } from './global'
import { Member } from './member'

export interface Team {
  id: string
  pageIntro: PageIntro
  classIcon: string
  content: string
  teams: Member[]
}
