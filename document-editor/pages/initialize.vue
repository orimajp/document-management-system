<script setup lang="ts">
const { documentFolder } = useDocumentFolder()
const router = useRouter()

const selectDirectory = async () => {
  const result = await window.electronAPI.selectDirectory()
  if (result) {
    const { dirPath } = result
    console.log(`dirPath=${dirPath}`)
    documentFolder.value = dirPath
    router.push('/')
  } else {
    console.log('not selected.')
  }
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-alert
          type="info"
          variant="outlined"
          class="alert-area"
        >
          ドキュメント格納フォルダを選択してください。
        </v-alert>
        <div class="button-area">
          <v-btn @click="selectDirectory">フォルダ選択</v-btn>
        </div>
        <!--
        <div>
          <br/>
          <NuxtLink to="/">トップへ</NuxtLink>
        </div>
        -->
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.alert-area {
  margin-top: 50px;
}
.button-area {
  margin-top: 30px;
  text-align: center;
}
</style>