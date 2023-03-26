<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update'): void
  (e: 'cancel'): void
}>()

const update = () => {
  emit('update')
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <v-footer
    class="edit-footer "
    app
  >
    <v-spacer></v-spacer>
    <v-btn
      variant="outlined"
      color="grey"
      @click="cancel"
      class="operation-button text-grey-darken-1"
    >
      キャンセル
    </v-btn>
    <v-btn
      variant="outlined"
      color="grey"
      @click="update"
      class="operation-button text-grey-darken-1"
    >
      更新
    </v-btn>
  </v-footer>
</template>

<style scoped>
.edit-footer {
  height: 48px;
  padding-right: 8px;
  padding-left: 8px;
}
.operation-button {
  margin-left: 8px;
  width: 100px;
}
</style>
