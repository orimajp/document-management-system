<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

useConfirmUnload()

const {
  clearDirtyState,
} = useDirtyState()

const route = useRoute()
console.log(`parameter:${route.params.id}`)
const id = route.params.id as string

// TODO ドキュメント/ページ判定
const document = ref(false)

const router = useRouter()

const update = () => {
  router.push(`/views/${id}`)
}

const cancel = async () => {
  await router.push(`/views/${id}`)
  clearDirtyState()
}
</script>

<template>
  <v-app>
    <DocumentEditor
      v-model:edit-title="editTitle"
      v-model:edit-data="editData"
      :document="document"
      @update="update"
      @cancel="cancel"
    />
  </v-app>
</template>
