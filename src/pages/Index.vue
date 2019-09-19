<template>
  <q-page>
    <div class="row">
      <h1> {{ file }} </h1>
      <h1> {{ settings.data_path }} </h1>
    </div>
    <div class="row">
      <q-card
        flat
        bordered
        class="my-card"
      >
        <q-card-section>
          <div class="text-h6">Choose a directory</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="q-gutter-md row items-start">
            <q-input
              @input="val => { file = val[0] }"
              filled
              type="file"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row">
      <q-field helper="Path to data store">

        <q-input
          clearable
          v-model="settings.data_path"
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
      >Set data path</q-btn>
    </div>

    <div class="row">
      <button v-on:click="test">Test</button>
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
      settings: {
        data_path: null
      },
      file: null
    }
  },
  methods: {
    test () {
      console.log('monTestMarcheBitches')
      ipcRenderer.send('testRequest', 'This is a test')
      ipcRenderer.on('testResponse', (message) => {
        console.log('test response ok with message : ' + message)
      })
    },
    selectPath () {
      console.log('Selecting path for data store')

      this.$refs.fileInput.click()
    },

    setDataPath (file) {
      this.settings.data_path = file.target.files[0].path
    },

    openFile (path) {
      shell.openItem(path)
    }
  }
}
</script>
