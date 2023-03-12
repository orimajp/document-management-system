<script setup lang="ts">
const route = useRoute()
const documentId = route.params.documentId as string
const pageId = route.params.pageId as string
console.log(`documetnId=${documentId}, pageId=${pageId}`)
//console.log(`parameter:${route.params.id}`)
//const id = route.params.id as string

const title = ref('ダミータイトル') // TODO データからタイトルをセット
const documentData = ref('ダミーデータ')

const {
  getPageInfo,
} = usePage()

const content = await getPageInfo(documentId, pageId)
console.log(content)

if (!content) {
  title.value = '未発見'
  documentData.value = ''
} else {
  title.value = content.title
  documentData.value = content.data
}


console.log(`表示ドキュメントID=${documentId}, ページID=${pageId}`)

const router = useRouter()
const createPage = () => {
  router.push(`/create/page/${documentId}`)
}
const editDocument = () => {
  router.push(`/edit/${documentId}/${pageId}`)
}
const editTree = () => {
  router.push(`/tree/${documentId}`)
}
</script>

<template>
  <v-app>
    <ViewNavbar
      :document-title="title"
      @create-page="createPage"
      @edit-document="editDocument"
      @edit-tree="editTree"
    />
    <v-navigation-drawer
      permanent
    >
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <ViewMarkDownPreviewer
          :render-text="documentData"
        />
      </v-container>
    </v-main>
  </v-app>
</template>
