<script setup lang="ts">
import { MenuInfo } from '~~/models/menu';

interface Props {
  documentId?: string
  pageId?: string
}

const props = withDefaults(defineProps<Props>(), {
  documentId: '',
  pageId: '',
})

const documentId = computed(() => props.documentId)
const pageId = computed(() => props.pageId)
const menuDatas = reactive<MenuInfo>({
  title: '',
  pageId: '',
  menus: [],
})

const {
  getMenuInfo,
} = useMenu()

watch(
  () => [documentId.value, pageId.value],
  async ([newDocumentId, newPaegId]) => {
    const result = await getMenuInfo(newDocumentId)
    menuDatas.title = result?.title as string
    menuDatas.pageId = result?.pageId as string
    menuDatas.menus = result?.menus as []
  },
  {
    immediate: true,
  }
)

const documentName = computed(() => menuDatas.title)
const menus = computed(() => menuDatas.menus)
const documentPath = computed(() => `/views/${documentId.value}/${documentId.value}`)

const router = useRouter()
const selectPage = (menuInfo:  any) => {
  console.log('selectPage')
  console.log(menuInfo)
  router.push(`/views/${documentId.value}/${menuInfo.id}`)
}
</script>

<template>
  <v-navigation-drawer
    permanent
  >
    <v-list density="compact" nav>
      <v-list-item>
        <NuxtLink :to="documentPath">
          {{ documentName }}
        </NuxtLink>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list
      density="compact"
      nav
      @click:select="selectPage"
      :items="menus"
      item-title="title"
      item-value="pageId"
    >
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
