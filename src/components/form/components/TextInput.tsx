import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type Props = {
  valName: string
  label: string
  placeholder?: string
  description?: string
  required?: boolean
  control: any
}

import { Input } from '@/components/ui/input'

export function TextInput({
  valName,
  label,
  placeholder,
  description,
  required,
  control,
}: Props) {
  return (
    <FormField
      control={control}
      name={valName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
