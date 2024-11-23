export const formDataImgExample = async (values: any) => {
  const formData = new FormData()
  const newValues = {
    ...values,

    media: null,
    cover: null,
    avatar: null,
  }

  formData.append('data', JSON.stringify(newValues))

  if (values.media && values.media[0] instanceof File) {
    formData.append('files.media', values.media[0], values.media[0].name)
  }
  if (values.cover && values.cover[0] instanceof File) {
    formData.append('files.cover', values.cover[0], values.cover[0].name)
  }
  if (values.avatar && values.avatar[0] instanceof File) {
    formData.append('files.avatar', values.avatar[0], values.avatar[0].name)
  }

  return formData
}
