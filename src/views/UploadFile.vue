<template>
  <v-container>
    <div v-if="type === 'image'">
      <UploadImage :id_document="id_document" />
    </div>
    <div v-else-if="type === 'csv'">
      <UploadCSV :id_document="id_document" />
    </div>
  </v-container>
</template>

<script>
import UploadImage from "@/components/UploadImage";
import UploadCSV from "@/components/UploadCSV";

export default {
  name: "UploadFile",
  props: ["id_document", "type"],

  components: {
    UploadImage,
    UploadCSV,
  },
};
</script>

