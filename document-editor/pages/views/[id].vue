<script setup lang="ts">
const route = useRoute()
console.log(`parameter:${route.params.id}`)
const id = route.params.id as string

const title = ref('ダミータイトル') // TODO データからタイトルをセット
const documentData = ref('ダミーデータ')

console.log(`表示ID: ${id}`)

const router = useRouter()
const createPage = () => {
  router.push(`/create/page/${id}`)
}
const editDocument = () => {
  router.push(`/edit/${id}`)
}
const editTree = () => {
  router.push(`/tree/${id}`)
}
</script>

<template>
  <v-app>
    <ViewNavbar
      :document-title="title"
      @create-page="createPage"
      @edit-document="editDocument"
      @edit-tree="editTree"
    />
    <v-navigation-drawer
      permanent
    >
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <ViewMarkDownPreviewer
          :render-text="documentData"
        />
      </v-container>
    </v-main>
  </v-app>
</template>
