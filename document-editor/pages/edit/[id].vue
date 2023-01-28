<script setup lang="ts">
const route = useRoute()
console.log(`parameter:${route.params.id}`)
const id = computed(() => route.params.id as string)

</script>

<template>
  <v-app>
    <v-app-bar title="ナブバー" density="compact"></v-app-bar>
    <v-main>
      <v-container>
        <h1>ページ編集</h1>
        <div>
          <NuxtLink :to="`/views/${id}`">戻る</NuxtLink>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>