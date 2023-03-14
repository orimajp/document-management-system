<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

useConfirmUnload()

const {
  clearDirtyState,
} = useDirtyState()

const route = useRoute()
const documentId = route.params.documentId as string
const pageId = route.params.pageId as string
console.log(`documetnId=${documentId}, pageId=${pageId}`)

const {
  getPageInfo,
} = usePage()

const content = await getPageInfo(documentId, pageId)

if (!content) {
  editTitle.value = '未発見'
  editData.value = ''
} else {
  editTitle.value = content.title
  editData.value = content.data
}

// TODO ドキュメント/ページ判定
const isDocument = computed(() => !content || content.documentId == content.pageId)

const router = useRouter()

const {
  updateDocument,
} = useDocument()

const update = async () => {
  if (isDocument) {
    // ドキュメント更新
    console.log('ドキュメント更新')
    await updateDocument(documentId, editTitle.value, editData.value)
  } else {
    // ページ更新
    console.log('ページ更新')
  }
  router.push(`/views/${documentId}/${pageId}`)
}

const cancel = async () => {
  await router.push(`/views/${documentId}/${pageId}`)
  clearDirtyState()
}
</script>

<template>
  <v-app>
    <DocumentEditor
      v-model:edit-title="editTitle"
      v-model:edit-data="editData"
      :document="isDocument"
      @update="update"
      @cancel="cancel"
    />
  </v-app>
</template>
