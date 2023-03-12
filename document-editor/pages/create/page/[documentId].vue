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

const register = () => {
  router.push(`/views/${documentId}/${documentId}`)
  // TODO 生成ページのpageIdを取得して、そこに遷移する必要がある
  // router.push(`/views/${documentId}/${pageIdId}`)
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
