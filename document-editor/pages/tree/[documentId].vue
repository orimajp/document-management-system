<script setup lang="ts">
const route = useRoute()
const documentId = route.params.documentId as string
console.log(`documetnId=${documentId}`)

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>ツリー編集</h1>
        <div>
          <NuxtLink :to="`/views/${documentId}/${documentId}`">戻る</NuxtLink>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>