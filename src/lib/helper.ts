// import { format as Format } from 'date-fns'
import { format, Locale } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'

//DateTime
export function formatDate(date: Date, localeCode = 'fr'): string {
  const newDate = new Date(date)
  let formattedDate: string
  // const localeCode = i18n.locale.substring(0, 2);
  // const localeCode = "fr";
  switch (localeCode) {
    case 'en':
      formattedDate = format(newDate, 'dd MMM yyyy', { locale: enUS })

      break
    case 'fr':
      formattedDate = format(newDate, 'dd MMM yyyy', { locale: fr })
      break
    // case "de":
    //   formattedDate = format(newDate, "dd MMM yyyy", { locale: de });
    //   break;
    // case "it":
    // formattedDate = format(newDate, "dd MMM yyyy", { locale: it });
    // break;
    default:
      formattedDate = format(newDate, 'dd MMM yyyy', { locale: fr })
      break
  }
  return formattedDate
}

export function formatDateTime(date: Date, localeCode = 'fr'): string {
  const newDate = new Date(date)
  let formattedDate: string

  switch (localeCode) {
    case 'en':
      formattedDate = format(newDate, 'PPP HH:mm', { locale: enUS })
      break
    case 'fr':
      formattedDate = format(newDate, 'PPP HH:mm', { locale: fr })
      break
    default:
      formattedDate = format(newDate, 'PPP HH:mm', { locale: fr })
      break
  }
  return formattedDate
}

export function localeToDateLocale(locale: string): Locale {
  switch (locale) {
    case 'en':
      return enUS
    case 'fr':
      return fr
    default:
      return fr
  }
}

export function truncateWithEllipses(text: any, max: number) {
  return text?.substr(0, max - 1) + (text?.length > max ? '...' : '')
}
