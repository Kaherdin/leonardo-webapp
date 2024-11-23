// types/contact.ts
import { PageIntro, MediaItem, ButtonProps } from './global'

export interface Office {
  id: number
  city: string
  country: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface EmailContact {
  id: number
  label: string
  email: string
}

export interface SocialNetwork {
  id: number
  name: string
  url: string
  icon: string // For storing Lucide icon name
}

export interface ContactContent {
  offices: Office[]
  emails: EmailContact[]
  socials: SocialNetwork[]
  formEnabled?: boolean
}

export interface ContactProps {
  contactSection: {
    formEnabled: any
    sectionIntro: PageIntro
    content: ContactContent
    buttons?: ButtonProps[]
  }
  designType: Number
}
