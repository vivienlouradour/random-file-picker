<template>
  <q-page>
    <div class="column items-center">
      <div class="row">
        <h5> {{ selectedFolderPath }} </h5>
        <h5> {{ lol }} </h5>
      </div>

      <div class="row">
        <q-field helper="Path to data store">
          <q-input
            clearable
            v-model="selectedFolderPath"
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
.my-card {
  width: 100%;
  max-width: 350px;
  text-align: center;
}
</style>

<script>
import { shell, ipcRenderer } from 'electron'

export default {
  name: 'PageIndex',
  data () {
    return {
      selectedFolderPath: null,
      lol: 'lol'
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
      ipc
      this.selectedFolderPath = path
    },

    openFile (path) {
      shell.openItem(path)
    }
  }
}
</script>
