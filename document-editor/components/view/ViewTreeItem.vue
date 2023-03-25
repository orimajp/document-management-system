<script setup lang="ts">
import { MenuNode } from '~~/models/menu';
import { ViewTreeItem } from '#components';

interface Props {
  currentNode: MenuNode
  pageIdArray: Array<string>
}

const props = defineProps<Props>()

const {
  iconText,
  notDocument,
  firstNode,
  addPageIdArray,
  openPage,
} = useTree(props)
</script>

<template>
  <ul>
    <li
      v-if="notDocument"
      class="doc-list"
      :class="{ selected: currentNode.select }"
      @click="openPage"
    >
      <v-icon class="collapse-icon" :icon="iconText" />
      <span>{{ currentNode.title }}</span>
    </li>
    <li
      v-if="currentNode.expand"
      class="collapse-list"
      :class="{ 'border-list': !firstNode }"
    >
      <ViewTreeItem
        class="doc-layer"
        v-for="(child, index) in currentNode.nodes"
        :key="index"
        :page-id-array="addPageIdArray"
        :current-node="child"
      />
    </li>
  </ul>
</template>

<style scoped>
.doc-layer {
  padding-left: 0;
}
.collapse-list {
  margin-left: 13px;
  padding: 0;
}
.border-list {
  border-left: solid 1px grey;
}

li {
  list-style-type: none;
  line-height: 1;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 13px;
  word-wrap: break-word;
  text-indent: -1em;
  padding-left: 1em;
}
.doc-list {
  cursor: pointer;
  padding-top: 9px;
  padding-bottom: 9px;
  /*position: relative;*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.doc-list:hover {
  background-color: lightgrey;
  /*background-color: darkgrey;*/
  /*background-color: white;*/
  padding-left: 13px;
  color: black;
}
.page-link {
  color: inherit;
  text-decoration: none;
}
.collapse-icon {
  color: white;
  margin: -4px -4px -4px 0;
  font-size: 13px;
  width: 13px;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
.selected .collapse-icon {
  color: black;
}
</style>
