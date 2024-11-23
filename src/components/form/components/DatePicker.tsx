import { fr } from 'date-fns/locale'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/helper'
import { DateRange } from 'react-day-picker'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import format from 'date-fns/format'

interface CustomDatePickerProps {
  type: 'single' | 'range'
  helper?: React.ReactNode
}

interface GFieldProps {
  valName: string
  label: string
  placeholder?: string
  description?: string
  required?: boolean
  control: any
}

// export default function TextInput(props: TextInputProps & RnTextInputProps) {
export default function DatePickerInput(
  props: GFieldProps & CustomDatePickerProps,
) {
  const {
    valName,
    label,
    placeholder,
    description,
    required,
    control,
    ...rest
  } = props

  // const renderButtonContent = () => {
  //   if (type === "range") {
  //     const { from, to } = values[valName] || {};
  //     if (from && to) {
  //       return (
  //         <span>{`${formatDate(from, "fr")} - ${formatDate(to, "fr")}`}</span>
  //       );
  //     } else if (from) {
  //       return <span>{formatDate(from, "fr")}</span>;
  //     }
  //     return <span>Sélectionner la durée</span>;
  //   } else {
  //     return values[valName] ? (
  //       <span>{formatDate(values[valName], "fr")}</span>
  //     ) : (
  //       <span>Sélectionner la date</span>
  //     );
  //   }
  // };

  return (
    <FormField
      control={control}
      name={valName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    // format(field.value, 'PPP')
                    formatDate(field.value, 'fr')
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
