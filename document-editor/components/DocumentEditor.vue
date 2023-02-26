<script setup lang="ts">
interface Props {
  editTitle?: string
  editData?: string
  create?: boolean
  document?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editTitle: '',
  editData: '',
  create: false,
  document: false,
})

const emit = defineEmits<{
  (e: 'update:editTitle', text: string): void
  (e: 'update:editData', text: string): void
  (e: 'register'): void
  (e: 'update'): void
  (e: 'cancel'): void
}>()

const editTitle = computed({
  get: () => props.editTitle,
  set: (val) => emit('update:editTitle', val)
})

const editData = computed({
  get: () => props.editData,
  set: (val) => emit('update:editData', val)
})

console.log(`編集対象： ${ props.document ? 'ドキュメント' : 'ページ' }`)
console.log(`編集モード： ${ props.create ? '作成' : '更新' }`)

const syncMode = ref([0])
const splitMode = ref(1)
const mainEl = ref<HTMLElement | null>(null)
const saveTitle = ref('')

const {
  clearDirtyState,
  initilizeTitleDirtyState,
  updateTitleDirtyState,
} = useDirtyState()

onMounted(() => {
  saveTitle.value = props.editTitle
  initilizeTitleDirtyState()
})

watch(
  () => props.editTitle,
  (newVal) => {
    updateTitleDirtyState(newVal !== saveTitle.value)
  }
)

const {
  editorWidth,
} = useEditorWidth(splitMode)

const {
  changeDelayState,
} = useScrollDelay()

watch(
  () => splitMode.value,
  () => changeDelayState()
)

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

const register = () => {
  alert('register')
  clearDirtyState()
  emit('register')
}

const update = () => {
  alert('update')
  clearDirtyState()
  emit('update')
}

const cancel = () => {
  alert('cancel')
  // TODO dirtyチェック
  emit('cancel')
}
</script>

<template>
  <EditNavbar
    v-model:editTitle="editTitle"
    v-model:syncMode="syncMode"
    v-model:splitMode="splitMode"
    :create="props.create"
  />
  <v-main class="all-area" ref="mainEl">
    <EditMarkdownEditor
      v-model="editData"
      :width="editorWidthPx"
      :height="contentHeight"
      :isEnableScrollSync="isEnableScrollSync"
      :create="props.create"
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
    @register="register"
    @cancel="cancel"
    @update="update"
    :create="create"
  />
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
  background-color: #0d1117;
}
</style>
