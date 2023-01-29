import { Ref } from "nuxt/dist/app/compat/capi"

export const useViewLinkCustomizer = () => {
  let links = {} as HTMLCollectionOf<HTMLAnchorElement> | undefined

  const customizeLink = (event: Event) => {
    const hrefs = (event.target as Element).getAttribute('href')
    if (!hrefs) {
      return
    }

    event.preventDefault()

    window.alert(`link to: [${hrefs}]`)
  }

  const addLinkCustomizeListener = (viewer: Ref<HTMLElement | null>) => {
    links = viewer.value?.getElementsByTagName('a')
    if (!links) {
      return
    }
    Array.from(links).forEach((element) => {
      element.addEventListener('click', customizeLink)
    })
  }

  const removeLinkCustomizeListener = () => {
    if (!links) {
      return
    }
    Array.from(links).forEach((element) => {
      element.removeEventListener('click', customizeLink)
    })
  }

  return {
    addLinkCustomizeListener,
    removeLinkCustomizeListener,
  }
}
