<template>
  <q-card class="card-pick-directory">
    <!-- dialog confirm delete -->
    <q-dialog
      v-model="showConfirmDeleteDialog"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <b class="q-ml-sm">Are you shure you want to delete this file ?</b>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Open containing folder"
            color="primary"
            @click="openContainingFolder"
          />
          <q-btn
            flat
            label="Yes"
            color="negative"
            v-close-popup
            @click="deleteFile"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- end dialog confirm delete -->

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
        class="float-right"
        round
        color="negative"
        icon="delete"
        :disable="!selectedFile.isSelected"
        @click="showConfirmDeleteDialog = true"
      >
        <q-tooltip>
          Delete file
        </q-tooltip>
      </q-btn>
      <q-btn
        class="float-right q-mr-sm"
        round
        color="positive"
        icon="folder_open"
        :disable="!selectedFile.isSelected"
        @click="openContainingFolder"
      >
        <q-tooltip>
          Open containing folder
        </q-tooltip>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { shell } from 'electron'

export default {
  name: 'FilePicker',
  data () {
    return {
      showConfirmDeleteDialog: false,
      seamless: true
    }
  },
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
      shell.showItemInFolder(this.selectedFile.path)
    },

    deleteFile () {
      this.$store.dispatch('fileStructure/deleteSelectedFile')
    }
  }
}
</script>
