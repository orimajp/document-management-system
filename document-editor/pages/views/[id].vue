<script setup lang="ts">
const route = useRoute()
console.log(`parameter:${route.params.id}`)

</script>

<template>
  <v-app>
    <v-container>
      <h1>ビューページ</h1>
      <div>
        <p>parameter: {{ $route.params.id }}  </p>
      </div>
      <NuxtLink to="/">トップへ</NuxtLink>
    </v-container>
  </v-app>
</template>