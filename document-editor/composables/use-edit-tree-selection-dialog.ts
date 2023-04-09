import { MenuInfo } from "~~/models/menu"

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

/* ヘッダ・フッタ補正 */
const HEADER_FOOTER_HEIGHT = 117

interface Props {
  showModal: boolean
  documentId: string
  currentPageId: string
}

export const useEditTreeSelectionDialog = (
  props: Props,
  closeDialog: () => void,
) => {
  const showModal = computed<boolean>({
    get: () => props.showModal,
    set: () => closeDialog()
  })

  const menuInfo = reactive<MenuInfo>({
    title: '',
    pageId: '',
    menus: [],
  })

  const {
    getMenuInfo,
    updateMenuData,
  } = useMenu()

  watchEffect(async () => {
    if (props.showModal) {
      const result = await getMenuInfo(props.documentId)
      if (result){
        menuInfo.title = result.title
        menuInfo.pageId = result.pageId
        menuInfo.menus = result.menus
      }
    }
  })

  const router = useRouter()
  const registerTreeData = async () => {
    console.log('registerTreeData():')
    const updateMenuInfo = JSON.parse(JSON.stringify(menuInfo))
    await updateMenuData(props.documentId, updateMenuInfo)
    console.log(props.currentPageId)
    router.push(`/views/${props.documentId}/${props.currentPageId}`)
  }

  const cancelTreeData = () => {
    router.push(`/views/${props.documentId}/${props.currentPageId}`)
  }

  const { height, } = useWindowSize()

  const editAreaHeightStyle = computed(() =>
    height.value - ADJUST_HEIGHT - HEADER_FOOTER_HEIGHT + 'px'
  )

  const dialogAreaHeight = computed(() => height.value - ADJUST_HEIGHT)

  return {
    menuInfo,
    registerTreeData,
    cancelTreeData,
    editAreaHeightStyle,
    dialogAreaHeight,
  }
}
