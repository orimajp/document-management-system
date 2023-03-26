import { MenuInfo } from "~~/models/menu"

interface Props {
  menus: Array<MenuInfo>
  currentPageId: string
}

export const useTreeDraggable = (
  props: Props,
) => {
  const moving = ref(false)
  const selectedPageId = ref<string | null>(null)

  const startMove = (e: MouseEvent) => {
    console.log(e)
    moving.value = true
  }

  const endMove = () => {
    moving.value = false
    selectedPageId.value = null
  }

  const mouseDown = (e: MouseEvent) => {
    if (e) {
      selectedPageId.value = ((e.target as unknown) as HTMLOrSVGElement).dataset
        .pageId as string
    }
  }

  const mouseUp = () => (selectedPageId.value = null)

  const isCurrentPage = (pageId: string) => {
    console.log(
      `isCurrentPage(): pageId=${pageId}, props.currentPageId=${props.currentPageId}`
    )
    return props.currentPageId === pageId
  }

  const selectionPage = (pageId: string) => {
    return selectedPageId.value === pageId
  }

  return {
    moving,
    selectedPageId,
    startMove,
    endMove,
    mouseDown,
    mouseUp,
    isCurrentPage,
    selectionPage
  }
}
