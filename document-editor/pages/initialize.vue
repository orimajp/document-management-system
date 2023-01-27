<script setup lang="ts">
import { DocumentItem } from '~~/models/document-item';

const { documentFolder } = useDocumentFolder()
/*
const documentState = reactive({
  documents: [] as Array<DocumentItem>
})*/

const selectDirectory = async () => {
  const result = await window.electronAPI.selectDirectory()
  if (result) {
    const { dirPath } = result
    console.log(`dirPath=${dirPath}`)
//    documentState.documents = window.electronAPI.getDocumentList(dirPath)
//    console.log(documentState.documents)
    documentFolder.value = dirPath
  } else {
    console.log('not selected.')
  }
}

</script>

<template>
  <v-app>
    <v-container>
      <h1>初期化</h1>
      <v-btn @click="selectDirectory">ドキュメントフォルダ選択</v-btn>
      <div>
        <NuxtLink to="/">トップへ</NuxtLink>
      </div>
    </v-container>
  </v-app>
</template>