<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

useConfirmUnload()

const route  = useRoute()
const id = route.params.id as string
console.log(`ページ追加対象ドキュメントID=${id}`)

const router = useRouter()

const register = () => {
  // TODO 作成したページへ遷移
  router.push(`/views/${id}`)
}

const cancel = () => {
  router.push(`/views/${id}`)
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
