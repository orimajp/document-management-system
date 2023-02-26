<script setup lang="ts">
const editTitle = ref('')
const editData = ref('')

useConfirmUnload()

const router = useRouter()

const register = () => {
  // TODO 作成したドキュメントへ遷移
  router.push('/')
}

const cancel = () => {
  router.push('/')
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
