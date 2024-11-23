'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { toast } from '@/hooks/use-toast'
import { TextInput } from './components/TextInput'

import { postAxiosAPI } from '@/request/request'
import { DropzoneInput } from './components/DropZone'
import { useTranslations } from 'next-intl'
import { TextArea } from './components/TextArea'
import { SelectInput } from './components/SelectInput'

const FormSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Fullname must be at least 2 characters.',
  }),
  subject: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  emailTo: z.string().email({
    message: 'Email must be a valid email address.',
  }),
  phone: z.string().min(2, {
    message: 'Telephone must be at least 2 characters.',
  }),
  message: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  media: z.array(z.unknown()).optional(),
  budget: z.string().optional(),

  //   bla: z.date(),

  //   bla: z
  //     .union([
  //       z.string().length(0, {
  //         message: 'Bla must be at least 4 characters.',
  //       }),
  //       z.string().min(4),
  //     ])
  //     .optional()
  //     .transform((e) => (e === '' ? undefined : e)),
})

const formDataContact = async (values: z.infer<typeof FormSchema>) => {
  const formData = new FormData()
  const newValues = {
    ...values,
    media: null,
  }

  formData.append('data', JSON.stringify(newValues))

  // if (values.media && values.media[0] instanceof File) {
  //   formData.append('files.media', values.media[0], values.media[0].name)
  // }

  if (values.media && values.media.length > 0) {
    values.media.map((file: any) => {
      formData.append('files.media', file, file.name)
    })
  }

  return formData
}

export function ContactForm() {
  const t = useTranslations('Contact')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: '',
      emailTo: '',
      phone: '',
      subject: '',
      message: '',
      budget: '',
      media: [],
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formData = await formDataContact(data)
      await postAxiosAPI('/email-contact', formData)

      // This works without FormData
      // await postAxiosAPI('/email-contact', { data: data })

      toast({
        title: t('form_submit_title'),
        description: t('form_submit_description'),
        variant: 'success',
      })

      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  const budgetOptions = [
    { value: t('budget_label01'), label: t('budget_label01') },
    { value: t('budget_label02'), label: t('budget_label02') },
    { value: t('budget_label03'), label: t('budget_label03') },
    { value: t('budget_label04'), label: t('budget_label04') },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
        <h2 className="font-display text-lg font-semibold text-neutral-950">
          {t('title')}
        </h2>
        <div className="mt-6 space-y-6">
          <TextInput
            valName="subject"
            label={t('subject')}
            placeholder="Réduire l'impact de mon application"
            control={form.control}
          />
          <TextInput
            valName="fullname"
            label={t('fullname')}
            placeholder="Giovanni Greenialdo"
            control={form.control}
          />
          <TextInput
            valName="phone"
            label={t('phone')}
            control={form.control}
          />

          <SelectInput
            valName="budget"
            label={t('budget')}
            options={budgetOptions}
            control={form.control}
          />
          <TextArea
            valName="message"
            label={t('message')}
            // placeholder="Giovanni Greenialdo"
            control={form.control}
          />
          <TextInput
            valName="emailTo"
            label={t('email')}
            placeholder="giovanni@swisscom.ch"
            //   description="This is your public display name."
            control={form.control}
          />
          <DropzoneInput
            valName="media"
            label={t('media')}
            // description="Drag and drop files here or click to select files"
            control={form.control}
          />
          {/* <DatePickerInput
          valName="bla"
          label="Username"
          placeholder="shadcn"
          description="This is your public display name."
          control={form.control}
          type="single"
        /> */}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
