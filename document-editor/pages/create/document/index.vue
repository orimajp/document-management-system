<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

useConfirmUnload()

const {
  clearDirtyState,
} = useDirtyState()

const {
  createDocument,
} = useDocument()

const router = useRouter()

const register = async () => {
  // TODO 作成したドキュメントへ遷移
  await createDocument(editTitle.value, editData.value)
  router.push('/')
}

const cancel = async () => {
  await router.push('/')
  // TODO 作成済みの場合はディレクトリごと削除
  clearDirtyState()
}
</script>

<template>
  <v-app>
    <DocumentEditor
      v-model:edit-title="editTitle"
      v-model:edit-data="editData"
      :document="true"
      :create="true"
      @register="register"
      @cancel="cancel"
    />
  </v-app>  
</template>
