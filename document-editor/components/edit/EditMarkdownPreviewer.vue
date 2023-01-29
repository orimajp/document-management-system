<script setup lang="ts">
import { debounce } from 'lodash'

interface Props {
  renderText: string
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  renderText: '',
  height: 0
})
const viewer = ref<HTMLElement | null>(null)

const { $md } = useNuxtApp()
const renderedText = computed(() => $md.render(props.renderText))

const heightPx = computed(() => `${props.height}px`)

const {
  addLinkCustomizeListener,
  removeLinkCustomizeListener,
} = useViewLinkCustomizer()

const customizeLink = () => {
  removeLinkCustomizeListener()
  addLinkCustomizeListener(viewer)
}

const deboucedCustmizeLink = debounce(customizeLink)

watch(
  () => renderedText.value,
  (newVal) => {
    nextTick(() => {
      deboucedCustmizeLink()
    })
  }
)

useViewerScrollHandler(viewer)
</script>

<template>
  <div ref="viewer">
    <div
      class="markdown-body"
      v-html="renderedText"
    />
  </div>
</template>

<style>
.markdown-body {
  width: 100%;
  padding: 30px;
/*  padding: 10px 10px 200px 10px;*/
/*  margin-bottom: 200px;*/
  height: v-bind(heightPx);
}
</style>
