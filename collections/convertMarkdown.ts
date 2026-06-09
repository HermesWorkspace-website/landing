export const convertMarkdown = async ({ data }: any) => {
  console.log('HOOK RUNNING')

  if (!data.markdownContent) {
    console.log('NO MARKDOWN')
    return data
  }

  console.log('MARKDOWN FOUND')
  console.log(data.markdownContent)

  return data
}