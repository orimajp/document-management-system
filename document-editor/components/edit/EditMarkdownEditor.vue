<script setup lang="ts">
import type { Monaco } from '@monaco-editor/loader'
import type monaco from 'monaco-editor'
import { debounce } from 'lodash'


const editorElement = ref()

</script>

<template>
  <div
    ref="editorElement"
    class="editor"
  />
</template>

<style scoped>
.editor {
  text-align: left;
}
</style>
