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
const prevendChildTargetId = route.query.prevendChildTargetId
  ? (route.query.prevendChildTargetId as string)
  : null
const appendNextTargetId = route.query.appendNextTargetId
  ? (route.query.appendNextTargetId as string)
  : null
console.log(`ページ追加対象ドキュメントID=${documentId}, prevendChildTargetId=${prevendChildTargetId}, appendNextTargetId=${appendNextTargetId}`)

const {
  createPageSelectPosition,
  createPagePrevendChild,
  createPageAppendNext,
} = usePage()

const router = useRouter()

const register = async () => {
  if (prevendChildTargetId) {
    const newPageId = await createPagePrevendChild(documentId, editTitle.value, editData.value, prevendChildTargetId)
    await router.push(`/views/${documentId}/${newPageId}`)
  } else if (appendNextTargetId) {
    const newPageId = await createPageAppendNext(documentId, editTitle.value, editData.value, appendNextTargetId)
    await router.push(`/views/${documentId}/${newPageId}`)
  } else {
    pageId.value = await createPageSelectPosition(documentId, editTitle.value, editData.value)
    modal.value = true
  }
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
