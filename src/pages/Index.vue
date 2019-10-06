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
                  {{ selectedDirectory.path || 'Not selected'  }}
                </q-chip>
              </div>
              <div
                v-if="selectedDirectory.isSelected"
                class="col"
              >
                <div class="row">
                  {{ selectedDirectory.files.length }} files ( {{ nbPicked }} already picked)
                </div>
                <div class="row">
                  Excluded extensions : {{ selectedDirectory.unauthorizedExtensions && selectedDirectory.unauthorizedExtensions.join(', ') }}
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
              @click="selectPath"
            >Choose a directory</q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div
        v-if="!isLoading && selectedDirectory.files.length > 0"
        class="q-mt-lg row justify-center"
      >
        <q-btn @click="pickFile">
          Pick random file
        </q-btn>
      </div>
      <div
        v-if="selectedFile.isSelected"
        class="q-mt-lg row justify-center"
      >
        <p>{{ selectedFile.path }} </p>
        <p> {{ selectedFile.name }}</p>
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
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.fileStructure.isLoading
    },
    selectedDirectory: {
      get () {
        return this.$store.state.fileStructure.selectedDirectory
      },
      set (directoryPath) {
        this.$store.dispatch('fileStructure/selectDirectory', directoryPath)
      }
    },
    selectedFile () {
      return this.$store.state.fileStructure.selectedFile
    },
    nbPicked () {
      return this.$store.state.fileStructure.nbPicked
    }
  },
  methods: {
    selectPath () {
      ipcRenderer.send('selectFolder')
      ipcRenderer.on('selectedFolder', (event, selectedFolder) => {
        this.selectedDirectory = selectedFolder[0]
      })
    },
    pickFile () {
      this.$store.dispatch('fileStructure/pickRandomFile')
      this.openFile(this.selectedFile.path)
    },

    openFile (path) {
      shell.openItem(path)
    }
  }
}
</script>
