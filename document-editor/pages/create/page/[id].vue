<script setup lang="ts">
const syncMode = ref([0])
const splitMode = ref(1)
const editTitle = ref('')
//const editTitle = ref('(仮)新規作成/編集')
const editData = ref('')
//const editData = ref('テストデータ。テストデータ。テストデータ。テストデータ。テストデータ。テストデータ。テストデータ。')
const mainEl = ref<HTMLElement | null>(null)

const {
  editorWidth,
} = useEditorWidth(splitMode)

const isEnableScrollSync = computed(() => syncMode.value.length > 0)
const editorWidthRatio = computed(() => `${editorWidth.value}%`)
const previewerWidthRatio = computed(() => `${100 - editorWidth.value}%`)

const {
  initializeScrollPosition,
} = useContentScrollPosition()

initializeScrollPosition()

const { width, height } = useWindowSize()
const editorWidthPx = computed(() => width.value * editorWidth.value / 100)
const contentHeight = computed(() => height.value - (48 + 48))
const contentHeightPx = computed(() => `${contentHeight.value}px`)

const route  = useRoute()
const id = route.params.id as string
console.log(`ページ追加対象ドキュメントID=${id}`)

const router = useRouter()

const update = () => {
  alert('update')
  router.push('/')
}

const cancel = () => {
  alert('cancel')
  router.push('/')
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
      <EditMarkdownEditor
        v-model="editData"
        :width="editorWidthPx"
        :height="contentHeight"
        :isEnableScrollSync="isEnableScrollSync"
        theme="vs-dark"
        class="editor-area"
      />
      <EditMarkdownPreviewer
        :renderText="editData"
        :isEnableScrollSync="isEnableScrollSync"
        class="previewer-area"
      />
    </v-main>
    <EditFooter
      @update="update"
      @cancel="cancel"
    />
  </v-app>  
</template>

<style scoped>
.all-area {
  display: flex;
  height: 100%;
}
.editor-area {
  width: v-bind(editorWidthRatio);
  height: v-bind(contentHeightPx);
  background-color: black;
}
.previewer-area {
  width: v-bind(previewerWidthRatio);
  height: v-bind(contentHeightPx);
  overflow: auto;
/*  background-color: black;*/
  background-color: #0d1117;
}
</style>
