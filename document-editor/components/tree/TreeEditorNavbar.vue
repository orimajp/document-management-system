<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ''
})

const pageTitle = computed(() => `[階層編集] ${props.title}`)
</script>

<template>
  <v-app-bar
    density="compact"
    class="navbar-area"
  >
    <v-app-bar-title
      class="title"
    >
      {{ pageTitle }}
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
.navbar-area {
  -webkit-app-region: drag
}
.title {
  -webkit-app-region: drag
}
</style>