<script setup lang="ts">

const syncMode = ref([0])
const splitMode = ref(1)
const editTitle = ref('')
//const editTitle = ref('(仮)新規作成/編集')
//const editData = ref('')
const editData = ref('テストデータ。テストデータ。テストデータ。テストデータ。テストデータ。テストデータ。テストデータ。')
const mainEl = ref<HTMLElement | null>(null)


const isSyncMode = computed(() => syncMode.value.length > 0)
const editorWidth = computed(() => transferWidth(splitMode.value))
const editorWidthRatio = computed(() => `${editorWidth.value}%`)
const previewerWidthRatio = computed(() => `${100 - editorWidth.value}%`)

const transferWidth = (splitMode: number): number => {
  if (splitMode === 0) return 100
  if (splitMode === 1) return 50
  return 0
}

const { width: mainWidth, height: mainHeight } = useElementSize(mainEl)

watch(
  () => [mainWidth.value, mainHeight.value],
  ([newWidth, newHeight]) => {
    console.log(`mainWidth=${newWidth}, mainHeight=${newHeight}`)
  }
)

const { width, height } = useWindowSize()
watch(
  () => [width.value, height.value],
  ([newWidth, newHeight]) => {
    console.log(`width=${newWidth}, height=${newHeight}`)
  }
)
//const contentHeight = computed(() => `${height.value - (48 + 10)}px`)
const contentHeight = computed(() => height.value - (48 + 10))

watch(
  () => syncMode.value,
  (val) => {
    console.log(`syncMode=${val}, isSyncMode=${isSyncMode.value}`)
  }
)

watch(
  () => editTitle.value,
  (val) => {
    console.log(`editTitle=${val}`)
  }
)

const save = () => {
  alert('save')
}

const cancel = () => {
  alert('cancel')
}

</script>

<template>
  <v-app>
    <EditNavbar
      v-model:editTitle="editTitle"
      v-model:editData="editData"
      v-model:syncMode="syncMode"
      v-model:splitMode="splitMode"
      :create="true"
    />
    <v-main class="all-area" ref="mainEl">
      <div class="editor-area">
      </div>
      <div class="previewer-area">
      </div>
    </v-main>
    <EditFooter
      @save="save"
      @cancel="cancel"
      :create="true"
    />
  </v-app>  
</template>

<style scoped>
.all-area {
  display: flex;
/*  height: v-bind(contentHeight);*/
}
.editor-area {
  width: v-bind(editorWidthRatio);
  background-color: yellow;
  height: 100%;
}
.previewer-area {
  width: v-bind(previewerWidthRatio);
  overflow: auto;
  background-color: blue;
  height: 100%;
}
</style>