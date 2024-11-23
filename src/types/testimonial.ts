import { MediaItem } from './global'
import { Member } from './member'

export interface Testimonial {
  id: string
  title: string
  cover: MediaItem
  content: string
  author: Member
  //TODO: Replace by pageIntro
}
