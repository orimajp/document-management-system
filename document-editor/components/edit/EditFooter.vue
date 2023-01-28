<script setup lang="ts">
const emit = defineEmits<{
  (e: 'save'): void
  (e: 'cancel'): void
}>()

const save = () => {
  emit('save')
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <v-footer
    class="edit-footer"
    app
  >
    <v-spacer></v-spacer>
    <v-btn
      variant="outlined"
      color="grey"
      @click="cancel"
      class="operation-button"
    >
      CANCEL
    </v-btn>
    <v-btn
      variant="outlined"
      color="grey"
      @click="save"
      class="operation-button"
    >
      SAVE
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