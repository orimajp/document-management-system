<script setup lang="ts">
// https://github.com/bazingaedward/monaco-editor-vue3/blob/main/src/MonacoEditor.vue
// https://github.com/nuxt/framework/discussions/5246
// https://berezuzu.medium.com/resizable-monaco-editor-3e922ad54e4
import type { Monaco } from '@monaco-editor/loader'
import type monaco from 'monaco-editor'
import { debounce } from 'lodash'

const APPBAR_HEIGHT = 48

interface Props {
  width?: number
  height?: number
  modelValue: string
  theme?: string
  isEnableScrollSync?: boolean
  create?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
  theme: 'vs',
  isEnableScrollSync: true,
  create: false,
})

const emit = defineEmits(['editorWillMount', 'editorDidMount', 'change', 'update:modelValue'])

const editorElement = ref<HTMLElement | null>(null)

const styleWidth = computed(() => `${props.width}px`)
const styleHeight = computed(() => `${props.height}px`)

watch(
  () => [props.width, props.height],
  ([newWidth, newHeight]) => {
    editor.layout({ width: newWidth, height: newHeight })
  }
)

const resizeEditor = () => {
  if (editor && editorElement.value) {
    editor.layout({ width: props.width, height: props.height })
  }
}
//const debouncedResizeEditor = debounce(resizeEditor, 100, { maxWait: 200 })
const debouncedResizeEditor = debounce(resizeEditor)

let monaco_: Monaco
let editor: monaco.editor.IStandaloneCodeEditor

onMounted(() => {
  initMonaco()
  window.addEventListener('resize', debouncedResizeEditor)
  if (!props.create) {
    nextTick(() => {
      setTimeout(() => focus(), 500)
    })
  }
})

onBeforeUnmount(() => {
  editor && editor.dispose()
  window.removeEventListener('resize', debouncedResizeEditor)
})

const focus = () => {
  editor?.focus()
}

watch(
  () => props.modelValue,
  (newVal) => {
    newVal !== getValue() && setValue(newVal)
  }
)

const height = computed(() => props.height)
const isEnableScrollSync = computed(() => props.isEnableScrollSync)
const {
  setEditor,
} = useEditorScrollHandler(height, isEnableScrollSync)

const initMonaco = async () => {
  const loader = await import('@monaco-editor/loader').then(m => m?.default)
  monaco_ = await loader.init()
  emit('editorWillMount', monaco_)
  editor = monaco_.editor['create'](editorElement.value as HTMLElement, {
    value: props.modelValue,
    language: 'markdown',
    theme: props.theme,
    wordWrap: 'on',
  })

  if (editor) {
    setEditor(editor)
    editor.onDidChangeModelContent((event) => {
      const value = editor.getValue()
      if( props.modelValue != value) {
        emit('change', value, event)
        emit('update:modelValue', value)
      }
    })
  }

  emit('editorDidMount', editor)
}

const setValue = (value: string) => {
  if (editor) return (editor as monaco.editor.IStandaloneCodeEditor).setValue(value)
}

const getValue = () => {
  if (!editor) return ''
  return (editor as monaco.editor.IStandaloneCodeEditor).getValue()
}
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
  width: v-bind(styleWidth);
  height: v-bind(styleHeight);
}
</style>
