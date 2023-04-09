<script setup lang="ts">
const route = useRoute()
const documentId = route.params.documentId as string
const pageId = route.params.pageId as string
console.log(`documetnId=${documentId}, pageId=${pageId}`)

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
  router.push(`/tree/${documentId}/${pageId}`)
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
    <ViewTreeDrawer
      :document-id="documentId"
      :page-id="pageId"
    />
    <v-main>
      <v-container>
        <ViewMarkDownPreviewer
          :render-text="documentData"
        />
      </v-container>
    </v-main>
  </v-app>
</template>
