<script setup lang="ts">
const route = useRoute()
console.log(`parameter:${route.params.id}`)
const id = computed(() => route.params.id as string)

const router = useRouter()
const editDocument = async () => {
  await router.push(`/edit/${id.value}`)
}
const editTree = async () => {
  await router.push(`/tree/${id.value}`)
}
</script>

<template>
  <v-app>
    <v-app-bar title="ナブバー" density="compact">
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        color="grey"
        @click="editDocument"
      >
        ページ編集
      </v-btn>
      &nbsp;
      <v-btn
        variant="outlined"
        color="grey"
        @click="editTree"
      >
        階層編集
      </v-btn>
    </v-app-bar>
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
        <h1>ビューページ</h1>
        <div>
          <p>parameter: {{ $route.params.id }}  </p>
        </div>
        <div>
          <NuxtLink :to="`/create/page/${id}`">ページ作成</NuxtLink>
        </div>
        <NuxtLink to="/">トップへ</NuxtLink>
      </v-container>
    </v-main>
  </v-app>
</template>