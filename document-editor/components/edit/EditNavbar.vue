<script setup lang="ts">
interface Props {
  editTitle?: string
  syncMode?: Array<number>
  splitMode?: number
  create?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editTitle: '',
  syncMode: () => [0],
  splitMode: 1,
  create: false,
})

const emit = defineEmits<{
  (e: 'update:editTitle', text: string): void
  (e: 'update:syncMode', num: Array<number> ): void
  (e: 'update:splitMode', num: number): void
}>()

const editTitle = computed({
  get: () => props.editTitle,
  set: (val) => emit('update:editTitle', val)
})

const syncMode = computed({
  get: () => props.syncMode,
  set: (val) => emit('update:syncMode', val)
})

const splitMode = computed({
  get: () => props.splitMode,
  set: (val) => emit('update:splitMode', val)
})

const { isDirty } = useDirtyState()
// TODO このフラグをどう使うか要検討

const router = useRouter()
const goTop = () => {
  router.push('/')
}
</script>

<template>
  <v-app-bar
   density="compact"
   class="text-grey-darken-1 navbar-area"
  >
    <template v-slot:prepend>
      <v-btn icon="mdi-home" @click="goTop">
      </v-btn>
    </template>
    <v-text-field
      variant="outlined"
      density="compact"
      placeHolder="タイトルを入力してください"
      v-model="editTitle"
      :autofocus="props.create"
      class="title-field"
    />
    <v-btn-toggle
      v-model="syncMode"
      multiple
      variant="outlined"
      density="compact"
      class="button-group text-grey-darken-1"
    >
      <v-btn
        tabindex="-1"
      >
        S
      </v-btn>
    </v-btn-toggle>
    <v-btn-toggle
      v-model="splitMode"
      mandatory
      variant="outlined"
      density="compact"
      class="button-group text-grey-darken-1"
    >
      <v-btn
        tabindex="-1"
      >
        E
      </v-btn>
      <v-btn
        tabindex="-1"
      >
        B
      </v-btn>
      <v-btn
        tabindex="-1"
      >
        P
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<style scoped>
.navbar-area {
  -webkit-app-region: drag
}
.title-field {
  margin-top: 20px;
  margin-right: 8px;
  margin-left: 5px;
  -webkit-app-region: no-drag;
}
.button-group {
  margin-right: 8px;
  -webkit-app-region: no-drag;
}
</style>
