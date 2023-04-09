<script setup lang="ts">
interface Props {
  showModal: boolean
  documentId: string
  currentPageId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:showModal'): void
}>()

const closeDialog = () => {
  emit('update:showModal')
}

const {
  menuInfo,
  registerTreeData,
  cancelTreeData,
  editAreaHeightStyle,
  dialogAreaHeight,
} = useEditTreeSelectionDialog(props, closeDialog)
</script>

<template>
  <v-dialog v-model="props.showModal" persistent max-width="800">
    <v-card outlined :height="dialogAreaHeight">
      <v-card-title>メニュー階層変更</v-card-title>
      <v-card-text :style="{ height: editAreaHeightStyle }">
        <div class="tree-edit-area" :style="{ height: editAreaHeightStyle }">
          <TreeDraggable
            :menus="menuInfo.menus"
            :current-page-id="props.currentPageId"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-f1" text @click="cancelTreeData">
          変更しない
        </v-btn>
        <v-btn color="blue darken-f1" text @click="registerTreeData">
          変更を保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.tree-edit-area {
  width: 100%;
  overflow: scroll;
  padding: 20px;
  border: solid 1px lightgray;
  border-radius: 5px;
  background: repeating-linear-gradient(
    90deg,
    #eeeeee 0px,
    #eeeeee 20px,
    #e0e0e0 20px,
    #e0e0e0 40px
  );
}
</style>