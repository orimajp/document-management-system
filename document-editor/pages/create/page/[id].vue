<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

useConfirmUnload()

const {
  clearDirtyState,
} = useDirtyState()

const route  = useRoute()
const id = route.params.id as string
console.log(`ページ追加対象ドキュメントID=${id}`)

const router = useRouter()

const register = () => {
  // TODO 作成したページへ遷移
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
      @register="register"
      @cancel="cancel"
      :create="true"
    />
  </v-app>
</template>
