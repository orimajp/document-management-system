<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

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
  const pageId = await createPage(documentId, editTitle.value, editData.value)
  router.push(`/views/${documentId}/${pageId}`)
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
  </v-app>
</template>
