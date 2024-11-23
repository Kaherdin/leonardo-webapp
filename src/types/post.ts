import { BaseItem, PageIntro } from './global'
import { Member } from './member'

export interface Post extends BaseItem {
  pageIntro: PageIntro
  author: Member
  content: string
  structure: any
  slug: string
}
