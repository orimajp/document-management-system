<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')
const modal = ref(false)
const pageId = ref('')

useConfirmUnload()

const {
  clearDirtyState,
} = useDirtyState()

const route  = useRoute()
const documentId = route.params.documentId as string
console.log(`ページ追加対象ドキュメントID=${documentId}`)

const router = useRouter()

const {
  createPage,
} = usePage()

const register = async () => {
  pageId.value = await createPage(documentId, editTitle.value, editData.value)
  modal.value = true
}

const cancel = async () => {
  await router.push(`/views/${documentId}/${documentId}`)
  clearDirtyState()
}
</script>

<template>
  <v-app>
    <DocumentEditor
      v-model:edit-title="editTitle"
      v-model:edit-data="editData"
      @register="register"
      @cancel="cancel"
      :create="true"
    />
    <EditTreeSelectionDialog
      v-model:show-modal="modal"
      :document-id="documentId"
      :current-page-id="pageId"
    />
  </v-app>
</template>
