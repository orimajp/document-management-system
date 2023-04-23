<script setup lang="ts">
import { useTreeContextControll } from '~/composables/contextmenu/use-tree-context-menu-controll';
import { MenuNode } from '~~/models/menu';

interface Props {
  documentId?: string
  pageId?: string
}

const props = withDefaults(defineProps<Props>(), {
  documentId: '',
  pageId: '',
})

const pageIdArray = [] as Array<string> // リアクティブにしない
const documentId = computed(() => props.documentId)
const pageId = computed(() => props.pageId)
const menuNodes = reactive<MenuNode>({
  title: '',
  documentId: '',
  pageId: '',
  expand: false,
  select: false,
  nodes: [],
})
const documentSelected = computed(() => documentId.value === pageId.value)
const firstPage = computed(() => menuNodes.nodes.length === 0 ? null : menuNodes.nodes[0])

const {
  getMenuNode,
} = useMenu()

watch(
  () => [documentId.value, pageId.value],
  async ([newDocumentId, newPaegId]) => {
    const result = await getMenuNode(newDocumentId, newPaegId)
    if (result) {
      menuNodes.title = result.title
      menuNodes.documentId = result.documentId
      menuNodes.pageId = result.pageId
      menuNodes.expand = true
      menuNodes.select = result.select
      menuNodes.nodes = result.nodes
    }
  },
  {
    immediate: true,
  }
)

const router = useRouter()
const goDocumentTop = () => {
  router.push(`/views/${documentId.value}/${documentId.value}`)
}

const {
  openTopContextMenu,
  openTreeContextMenu,
  closeContextMenu,
  contextMenuParam
} = useTreeContextControll()

const topContextMenu = (e: MouseEvent) => {
  openTopContextMenu(documentId.value, documentId.value, menuNodes.title, e)
}

const treeContextMenu = (documentId: string, pageId: string, pageTitle: string, e: MouseEvent) => {
  openTreeContextMenu(documentId, pageId, pageTitle, e)
}

</script>

<template>
  <v-navigation-drawer
    permanent
  >
    <div class="link-area">

      <div
        class="document-top-link"
        :class="{ selected: documentSelected }"
        @click="goDocumentTop"
        @contextmenu="topContextMenu"
        v-text="menuNodes.title"
      />
      <div
       class="tree-area"
      >
        <ViewTreeItem
          :current-node="menuNodes"
          :page-id-array="pageIdArray"
          @openContextMenu="treeContextMenu"
        />
      </div>
    </div>
    <ViewTreeContextMenu
      :tree-context-menu-param="contextMenuParam"
      @closeContextMenu="closeContextMenu"
    />
  </v-navigation-drawer>
</template>

<style scoped>
.link-area {
  padding: 10px 0 10px 0;
  color: white;
}
.document-top-link {
  /*padding: 0 0 0 10px;*/
  padding: 5px 0 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.document-top-link:hover {
  background-color: lightgray;
  color: black;
}
.tree-area {
  margin-left: -13px;
  padding-left: 0;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
</style>
