<script setup lang="ts">
import { MenuInfo } from '~~/models/menu'
import { TreeDraggable } from '#components'

interface Props {
  menus: Array<MenuInfo>
  currentPageId: string
}

const props = defineProps<Props>()

const {
  moving,
    selectedPageId,
    startMove,
    endMove,
    mouseDown,
    mouseUp,
    isCurrentPage,
    selectionPage
} = useTreeDraggable(props)
</script>

<template>
  <draggable
    class="item-container"
    :list="props.menus"
    :group="{ name: 'treeNodes' }"
    item-key="pageId"
    animation="200"
    @start="startMove"
    @end="endMove"
  >
    <template #item="{ element }">
      <div class="item-group">
        <div
          class="item"
          :class="{
            'current-item': isCurrentPage(element.pageId),
            moving: moving,
            'select-item': selectionPage(element.pageId)
          }"
          @mousedown="mouseDown"
          @mouseup="mouseUp"
        >
          {{ element.title }}
        </div>
        <TreeDraggable
          :menus="element.menus"
          :current-page-id="element.pageId"
          class="item-sub"
        />
      </div>
    </template>
  </draggable>
</template>

<style scoped>
.item-container {
  /*max-width: 20rem;*/
  /*width: 100%;*/
  right: 0;
  margin: 0;
}
.item {
  cursor: grab;
  /*padding: 1rem;*/
  padding: 5px 10px;
  border: solid darkgrey 1px;
  border-radius: 5px;
  color: darkgray;
  background-color: #fefefe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
.item.current-item {
  border: solid darkgrey 3px;
}
.item.select-item {
  font-weight: bold;
}
.item.moving {
  cursor: grabbing;
}
.item-sub {
  /*margin: 0 0 0 1rem;*/
  margin: 1px 0 1px 20px;
}
</style>
