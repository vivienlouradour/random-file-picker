<template>
  <q-page>
    <div class="column">
      <!-- <div
        v-if="selectedFolder.isSelected"
        class="row justify-center"
      >
        <h5> Selected Path : <i> {{ selectedFolder.path }} </i></h5>
      </div> -->

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
              <div class="col">
                {{ selectedFolder.path }}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pb-xl">
            <!-- put 'loading' attribute when scrolling the directory -->
            <q-btn
              :loading="isLoading"
              class="loading float-left"
              style="width: 200px;"
              push
              color="primary"
              v-on:click="selectPath"
            >Choose a directory</q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div>
        {{ this.files }} test
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
      files: null,
      isLoading: false
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
      ipcRenderer.on('listedFiles', (event, files) => {
        this.files = files
        console.log(JSON.stringify(files))
        this.isLoading = false
      })
    },

    openFile (path) {
      shell.openItem(path)
    }
  }
}
</script>
