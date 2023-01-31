<script setup lang="ts">
import { DocumentItem } from '~~/models/document-item';

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
  documents: [] as Array<DocumentItem>
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
  }
})

const router = useRouter()
const createDocument = async () => {
  await router.push('/create/document')
}

const goViewPage = (id: string) => {
  router.push(`/views/${id}`)
}
</script>

<template>
  <v-app>
    <v-app-bar title="ナブバー" density="compact">
      <v-spacer></v-spacer>
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
        <h1>ドキュメント一覧</h1>
        <div v-if="loading" class="text-center">
          <v-progress-circular :size="100" color="primary" indeterminate />
        </div>
        <v-alert
          v-if="empty"
          type="info"
          variant="outlined"
          class="alert-area"
        >
          ドキュメントがありません。
        </v-alert>
        <v-table v-if="exists">
          <thead>
            <tr>
              <th class="text-left">
                ドキュメント名
              </th>
              <th class="text-left">
                作成日時
              </th>
              <th class="text-left">
                更新日時
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="document in documentState.documents"
              :key="document.title"
              @click="goViewPage(document.id)"
              class="document-list"
            >
              <td>{{ document.title }}</td>
              <td>{{ document.createdAt }}</td>
              <td>{{ document.updatedAt }}</td>
            </tr>
          </tbody>    
        </v-table>
        <br/>
        <div>
          <p>ドキュメントフォルダ： [{{ documentFolder }}]</p>
        </div>
        <div>
          <NuxtLink to="/initialize">初期化</NuxtLink>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.alert-area {
  margin-top: 20px;
}
.document-list {
  cursor: pointer;
}
</style>
