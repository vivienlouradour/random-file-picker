<template>
  <q-page>
    <div class="column">
      <div class="row justify-center">
        <q-card class="card-pick-directory">
          <q-card-section>
            <div class="text-h6">Pick a directory</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="row">
              <div class="col">
                <q-chip
                  square
                  icon="folder"
                  size="10px"
                >
                  {{ selectedFolder.path || 'Not selected'  }}
                </q-chip>
              </div>
              <div
                v-if="this.files"
                class="col"
              >
                <div class="row">
                  {{ this.files.length }} files
                </div>
                <div class="row">
                  Excluded extensions : {{ this.unauthorizedExt.join(', ') }}
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pb-xl">
            <q-btn
              :loading="isLoading"
              class="loading float-left"
              style="width: 200px;"
              color="primary"
              v-on:click="selectPath"
            >Choose a directory</q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div
        v-if="this.files && this.files.length > 0"
        class="q-mt-lg row justify-center"
      >
        <q-btn v-on:click="pickFile">
          Pick random file
        </q-btn>
      </div>
      <div
        v-if="this.selectedFile"
        class="q-mt-lg row justify-center"
      >
        <p>{{ this.selectedFile }} </p>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
.card-pick-directory {
  width: 100%;
  max-width: 80%;
}
</style>

<script>
import { shell, ipcRenderer } from 'electron'

export default {
  name: 'PageIndex',
  data () {
    return {
      selectedFolder: {
        isSelected: false,
        name: null,
        path: null
      },
      selectedFile: null,
      files: null,
      isLoading: false,
      unauthorizedExt: null
    }
  },
  methods: {
    selectPath () {
      ipcRenderer.send('selectFolder')
      ipcRenderer.on('selectedFolder', (event, selectedFolder) => {
        this.setDirectoryPath(selectedFolder[0])
      })
    },

    setDirectoryPath (path) {
      this.selectedFolder.name = 'TodoName'
      this.selectedFolder.isSelected = true
      this.selectedFolder.path = path

      this.isLoading = true
      ipcRenderer.send('listFiles', path)
      ipcRenderer.on('listedFiles', (event, files, unauthorizedExt) => {
        this.files = files
        this.unauthorizedExt = unauthorizedExt
        this.isLoading = false
      })
    },

    pickFile () {
      let filePath = this.files[Math.floor(Math.random() * this.files.length)]
      this.selectedFile = filePath
      this.openFile(filePath)
    },

    openFile (path) {
      shell.openItem(path)
    }
  }
}
</script>
