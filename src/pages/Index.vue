<template>
  <q-page>
    <div class="column">
      <div
        v-if="selectedFolder.isSelected"
        class="row justify-center"
      >
        <h5> Path : {{ selectedFolder }} </h5>
        <h5> {{ selectedFolder.name }} </h5>
      </div>

      <div class="row justify-center">
        <q-field helper="Path to data store">
          <q-input
            clearable
            v-model="selectedFolder.path"
            stack-label="Data storage"
          />

          <input
            type="file"
            id="dataPath"
            v-on:change="setDataPath"
            ref="fileInput"
            hidden
          />
        </q-field>
        <q-btn
          color="primary"
          v-on:click="selectPath"
        >Choose a directory</q-btn>
      </div>
    </div>

  </q-page>
</template>

<style>
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
      }
    }
  },
  methods: {
    selectPath () {
      ipcRenderer.send('selectFolder')
      ipcRenderer.on('selectedFolder', (event, selectedFolder) => {
        this.setDataPath(selectedFolder[0])
      })
    },

    setDataPath (path) {
      this.selectedFolder.name = 'TodoName'
      this.selectedFolder.isSelected = true
      this.selectedFolder.path = path
    },

    openFile (path) {
      shell.openItem(path)
    }
  }
}
</script>
