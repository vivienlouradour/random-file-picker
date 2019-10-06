<template>
  <q-card class="card-pick-directory">
    <q-card-section>
      <div class="text-h6">Pick a random file</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="row">
        <div class="col">
          <q-chip
            square
            icon="insert_drive_file"
            size="10px"
          >
            {{ selectedFile.name }}
          </q-chip>
        </div>
        <div
          v-if="selectedFile.isSelected"
          class="col"
        >
          <div class="row">
            {{ selectedFile.path }}
          </div>
          <div class="row">
          </div>
        </div>
      </div>

    </q-card-section>
    <q-card-section>
      <q-btn
        @click="pickFile"
        color="positive"
      >
        Pick random file
      </q-btn>
      <q-btn
        title="delete file"
        class="float-right"
        round
        color="negative"
        icon="delete"
      ></q-btn>
      <q-btn
        title="Open containing folder"
        class="float-right q-mr-sm"
        round
        color="positive"
        icon="folder_open"
        @click="openContainingFolder"
      ></q-btn>
    </q-card-section>
  </q-card>

</template>

<script>
import { shell } from 'electron'
import { getParentDirectory } from '../../helpers/fileHelper'

export default {
  name: 'FilePicker',
  computed: {
    selectedFile () {
      return this.$store.state.fileStructure.selectedFile
    }
  },
  methods: {
    pickFile () {
      this.$store.dispatch('fileStructure/pickRandomFile')
      this.openFile(this.selectedFile.path)
    },

    openFile (path) {
      shell.openItem(path)
    },

    openContainingFolder () {
      this.openFile(getParentDirectory(this.selectedFile.path))
    }
  }
}
</script>
