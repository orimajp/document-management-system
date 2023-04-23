export const useTreeContextMenuRouting = (
  openDucumentId: Ref<string>,
  openPageId: Ref<string>,
  openPageTitle: Ref<string>,
) => {

  const copyClipbord = (text: string) => {
    return window.navigator.clipboard.writeText(text)
  }
  
  const copyPath = async () => {
    const path = `/views/${openDucumentId.value}/${openPageId.value}`
    const markdownLink = `[${openPageTitle.value}](${path})`
    await copyClipbord(markdownLink)
  }

  const router = useRouter()

  const createChildPage = async () => {
    const path = `/create/page/${openDucumentId.value}?prevendChildTargetId=${openPageId.value}`
    await router.push(path)
  }

  const createNextPage = async () => {
    const path = `/create/page/${openDucumentId.value}?appendNextTargetId=${openPageId.value}`
    await router.push(path)
  }

  return {
    copyPath,
    createChildPage,
    createNextPage
  }
}
