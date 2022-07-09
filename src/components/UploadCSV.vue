<template>
  <v-container grid-list-md>
    <v-card elevation="5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-file-input
              label="File input"
              filled
              multiple
              prepend-icon="mdi-file"
              v-model="files"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <CodeEditor
              key="index"
              width="100%"
              :read_only="true"
              :languages="[['json', 'json']]"
              theme="androidstudio"
              v-model="data_source"
            ></CodeEditor>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="modelName"
              label="Nombre del modelo (en singular)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-btn color="primary" @click="upload"> Subir archivo CSV </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-row
              class="fill-height"
              align-content="center"
              justify="center"
              v-if="isUploadFiles"
            >
              <v-col class="text-subtitle-1 text-center" cols="12">
                Cargando archivo
              </v-col>
              <v-col class="text-subtitle-1 text-center" cols="12">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
                ></v-progress-circular>
              </v-col>
            </v-row>

            <EditorFields
              z_index="100"
              :bdDataInfo="bdDataInfo"
              :id_document="id_document"
              :data_source="data_source"
              :modelName="modelName"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import EditorFields from "./editorFields";
import CodeEditor from "simple-code-editor";

export default {
  name: "UploadCSV",
  data: function () {
    return {
      file: null,
      files: [],
      template: 'console.log("hi")',
      data_source: JSON.stringify(
        {
          _id: "ObjectId",
          code: "textoAutogenerado",
          embera: "textoVacio",
          espanol: "textoVacio",
        },
        null,
        2
      ),
      bdDataInfo: [],
      isUploadFiles: false,
      modelName: "",
    };
  },
  props: ["id_document"],
  components: {
    CodeEditor,
    EditorFields,
  },
  methods: {
    upload: function () {
      try {
        this.isUploadFiles = true;
        if (this.files) {
          let formData = new FormData();
          // files
          for (let file of this.files) {
            formData.append("data", file, file.name);
          }

          // additional data
          formData.append("template", JSON.stringify(this.data_source));

          axios
            .post(`${this.URLServer}/csv`, formData)
            .then((response) => {
              console.log("Success!");
              console.log({ response });
              this.bdDataInfo = response.data.data;
              this.isUploadFiles = false;
            })
            .catch((error) => {
              console.log({ error });
            });
        } else {
          console.log("there are no files.");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
};
</script>
