<script setup lang="ts">
import { debounce } from 'lodash'

interface Props {
  renderText: string,
}

const props = withDefaults(defineProps<Props>(), {
  renderText: '',
})

const viewer = ref<HTMLElement | null>(null)

const { $md } = useNuxtApp()
const renderedText = computed(() => $md.render(props.renderText))

const { height } = useElementSize(viewer)
const heightPx = computed(() => `${height.value}px`)

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
  font-size: 80%;
  margin-bottom: v-bind(heightPx);
}
</style>
