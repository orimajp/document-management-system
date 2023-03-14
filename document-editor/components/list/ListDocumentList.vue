<script setup lang="ts">
import { DocumentListItem } from '~~/models/document';

interface Props {
  documents?: Array<DocumentListItem>
}

const props = withDefaults(defineProps<Props>(), {
  documents: () => [],
})

const {
  formatDateTime,
} = useFormatDate()

const router = useRouter()
const goViewPage = (id: string) => {
  router.push(`/views/${id}/${id}`)
}
</script>

<template>
  <v-table class="document-table">
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
        v-for="document in props.documents"
        :key="document.documentId"
        @click="goViewPage(document.documentId)"
        class="document-list"
      >
        <td>{{ document.title }}</td>
        <td>{{ formatDateTime(document.createdAt) }}</td>
        <td>{{ formatDateTime(document.updatedAt) }}</td>
      </tr>
    </tbody>    
  </v-table>
</template>

<style scoped>
.document-table {
  font-size: 80%;
}
.document-table tr:hover td {
  background-color: #424242;
}
.document-list {
  cursor: pointer;
}
</style>
