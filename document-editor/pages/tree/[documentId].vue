<script setup lang="ts">
import { MenuInfo } from '~~/models/menu';

const route = useRoute()
const documentId = route.params.documentId as string
console.log(`documetnId=${documentId}`)

const {
  getPageInfo,
} = usePage()

const content = await getPageInfo(documentId, documentId)
const title = computed(() => !content ? '': content.title)

const {
  getMenuInfo,
} = useMenu()

const menuInfo = reactive<MenuInfo>({
  title: '',
  pageId: '',
  menus: [],
})
const result = await getMenuInfo(documentId)
if (result) {
  menuInfo.title = result.title
  menuInfo.pageId = result.pageId
  menuInfo.menus = result.menus
}

const router = useRouter()
const {
  updateMenuData,
} = useMenu()

const update = async () => {
  const updateMenuInfo = JSON.parse(JSON.stringify(menuInfo))
  await updateMenuData(documentId, updateMenuInfo)
  router.push(`/views/${documentId}/${documentId}`)
}

const cancel = () => {
  router.push(`/views/${documentId}/${documentId}`)
}
</script>

<template>
  <v-app>
    <TreeEditorNavbar
      :title="title"
    />
    <v-main>
      <v-container style="height: 100%;">
        <div class="tree-edit-content">
        <v-card
          class="tree-edit-area"
          valiant="outlined"
        >
          <TreeDraggable
            :menus="menuInfo.menus"
            :current-page-id="documentId"
          />
        </v-card>
      </div>
      </v-container>
    </v-main>
    <TreeEditorFooter
      @update="update"
      @cancel="cancel"
    />
  </v-app>
</template>

<style scoped>
.tree-edit-content {
  padding: 10px;
  height: 100%;
}
.tree-edit-area {
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 20px;
  border-radius: 5px;
  background: repeating-linear-gradient(
    90deg,
    #eeeeee 0px,
    #eeeeee 20px,
    #e0e0e0 20px,
    #e0e0e0 40px
  );
}
</style>