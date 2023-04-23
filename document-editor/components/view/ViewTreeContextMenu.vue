<script setup lang="ts">
import { TreeContextMenuParam } from '~/composables/contextmenu/use-tree-context-menu-controll';

interface Props {
  treeContextMenuParam: TreeContextMenuParam
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'closeContextMenu'): void
}>()

const closeContextMenu =() => {
  emit('closeContextMenu')
}

const {
  showContextMenu,
  openDocumentId,
  openPageId,
  openPageTitle,
  contextMenuX,
  contextMenuY,
  top
} = useTreeContextMenu(props, closeContextMenu)

const {
  copyPath,
  createChildPage,
  createNextPage,
} = useTreeContextMenuRouting(openDocumentId, openPageId, openPageTitle)
</script>

<template>
  <v-menu
    v-model="showContextMenu"
    :position-x="contextMenuX"
    :position-y="contextMenuY"
    absolute
    offset-y
  >
    <v-list density="compact">
      <v-list-item class="menu-item" dense @click="copyPath">
        <v-list-item-title>
          パスをMarkdown形式でクリップボードにコピー
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item class="menu-item" dense @click="createChildPage">
        <v-list-item-title> 子の先頭にページを追加 </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!top" class="menu-item" dense @click="createNextPage">
        <v-list-item-title> 次にページを追加 </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.menu-item {
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #fafafa;
}
</style>