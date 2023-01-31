<script setup lang="ts">
import { DocumentItem } from '~~/models/document-item';

const iDs = ref([1,2,3])

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

onMounted(() => {
  if (documentFolder.value.length > 0) {
    nextTick(async() => {
      documentState.documents = await window.electronAPI.getDocumentList(documentFolder.value)
      console.log(documentState.documents)
    })
  }
})

const router = useRouter()
const createDocument = async () => {
  await router.push('/create/document')
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
        <!--
        <div>こんにちは</div>
        <v-btn @click="openFile">開く</v-btn>
        <ul v-for="id in iDs" :key="id">
          <li>
            <NuxtLink :to="`/views/${id}`">ドキュメント{{ id }}</NuxtLink>
          </li>
        </ul>
        -->
        <div>
          <p>ドキュメントフォルダ： [{{ documentFolder }}]</p>
        </div>
        <div>
          <ul v-for="document in documentState.documents" :key="document.title">
            <li>
              <NuxtLink :to="`/views/${document.fileName}`">{{ document.title }}</NuxtLink>
            </li>
          </ul>
        </div>
        <br/>
        <div>
          <NuxtLink to="/initialize">初期化</NuxtLink>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
