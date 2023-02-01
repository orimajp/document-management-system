<script setup lang="ts">
interface Props {
  documentTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  documentTitle: '',
})

const emit = defineEmits<{
  (e: 'createPage'): void
  (e: 'editDocument'): void
  (e: 'editTree'): void
}>()

const createPage = () => {
  emit('createPage')
}
const editDocument = () => {
  emit('editDocument')
}
const editTree = () => {
  emit('editTree')
}

const router = useRouter()
const goTop = () => {
  router.push('/')
}
</script>

<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-btn icon="mdi-home" @click="goTop">
      </v-btn>
    </template>
    <v-app-bar-title>
      {{ props.documentTitle }}
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn
      variant="outlined"
      color="grey"
      @click="createPage"
    >
      ページ作成
    </v-btn>
    <v-btn
      variant="outlined"
      color="grey"
      @click="editDocument"
      class="button"
    >
      ページ編集
    </v-btn>
    <v-btn
      variant="outlined"
      color="grey"
      @click="editTree"
      class="button"
    >
      階層編集
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.button {
  margin-left: 8px;
}
</style>
