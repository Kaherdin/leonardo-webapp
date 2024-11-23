import React, { useState, useCallback } from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useDropzone } from 'react-dropzone'

import { useForm } from 'react-hook-form'

type Props = {
  valName: string
  label: string
  description?: string
  required?: boolean
  control: any
  multiple?: boolean // Allow multiple file uploads
}

export function DropzoneInput({
  valName,
  label,
  description,
  required,
  control,
  multiple = true, // Allow multiple files by default
}: Props) {
  return (
    <FormField
      control={control}
      name={valName}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DropzoneComponent
              field={field}
              fieldState={fieldState}
              valName={valName}
              multiple={multiple}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Composant Dropzone personnalisé avec logique de suppression et gestion des fichiers
function DropzoneComponent({
  field,
  fieldState,
  valName,
  multiple,
}: {
  field: any
  fieldState: any
  valName: string
  multiple: boolean
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { setValue, getValues } = useForm()

  // Custom onDrop function using useCallback to handle file selection
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = multiple ? acceptedFiles : [acceptedFiles[0]] // Handle single/multiple files
      // console.log(files, 'files')
      field.onChange(files) // Update the field value in react-hook-form
      // setSelectedFiles(files) // Update the local state to display selected files
      // setValue(valName, files)
    },
    [multiple, field],
  )

  const removeFile = (file: File) => {
    const newFiles = selectedFiles.filter((f: File) => f !== file)
    setSelectedFiles(newFiles) // Update the local state
    field.onChange(newFiles) // Update the field value in react-hook-form
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  })

  return (
    <div
      {...getRootProps()}
      className={`rounded-lg border border-dashed p-4 ${
        isDragActive ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      {/* <div className="text-2xl font-bold">
        <code className="text-white">
          {JSON.stringify(getValues('cover'), null, 2)}
        </code>
      </div> */}
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Déposez les fichiers ici...</p>
      ) : (
        <p>
          Glissez-déposez des fichiers ici, ou cliquez pour sélectionner des
          fichiers
        </p>
      )}

      {/* Affichage des fichiers sélectionnés */}
      {selectedFiles && selectedFiles.length > 0 && (
        <ul className="mt-2">
          {selectedFiles.map((file: File, index: number) => (
            <li key={index} className="flex items-center justify-between">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(file)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
