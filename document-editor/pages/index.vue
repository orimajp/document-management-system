<script setup lang="ts">
import { DocumentListItem } from '~~/models/document';
//import { DocumentItem } from '~~/models/document-item';

const openFile = async () => {
  const result = await window.electronAPI.openFile()
  if (result) {
    const { filePath, textData } = result
    console.log(`filePath=${filePath}, textData=${textData}`)
    alert(`filePath=${filePath}`)
  }
}

const { documentFolder } = useDocumentFolder()

const documentState = reactive({
//  documents: [] as Array<DocumentItem>
  documents: [] as Array<DocumentListItem>,
})

const loading = ref(false)
const empty = ref(true)
const exists = computed(() => !loading.value && !empty.value)

onMounted(() => {
  if (documentFolder.value.length > 0) {
    nextTick(async() => {
      loading.value = true
      documentState.documents = await window.electronAPI.getDocumentList(documentFolder.value)
      console.log(documentState.documents)
      loading.value = false
      empty.value = documentState.documents.length === 0
    })
  } else {
    router.push('/initialize')
  }
})

const router = useRouter()
const createDocument = async () => {
  await router.push('/create/document')
}
</script>

<template>
  <v-app>
    <v-app-bar
      density="compact"
      class="navbar-area"
    >
      <v-app-bar-title>
        ドキュメント一覧
      </v-app-bar-title>
      <v-spacer class="space"></v-spacer>
      <v-btn
        variant="outlined"
        color="grey"
        @click="createDocument"
      >
        新規作成
      </v-btn>
      &nbsp;
    </v-app-bar>
    <v-main>
      <v-container>
        <div
          v-if="loading"
          class="text-center"
        >
          <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
          />
        </div>
        <v-alert
          v-if="empty"
          type="info"
          variant="outlined"
          class="alert-area"
        >
          ドキュメントがありません。
        </v-alert>
        <div>
          <p>ドキュメントフォルダ： [{{ documentFolder }}]</p>
        </div>
        <!--
        <div>
          <NuxtLink to="/initialize">初期化</NuxtLink>
        </div>
        -->
        <br/>
        <ListDocumentList
          v-if="exists"
          :documents="documentState.documents"
          class="document-list"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.navbar-area {
  -webkit-app-region: drag
}
.title {
  -webkit-app-region: drag
}
.space {
  -webkit-app-region: drag
}
.alert-area {
  margin-top: 20px;
}
.document-list {
  margin-bottom: 50px;
}
</style>
