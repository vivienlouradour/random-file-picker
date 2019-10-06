<template>
  <q-page>
    <div class="column">
      <div class="row justify-center">
        <directory-picker></directory-picker>
      </div>
      <div
        v-if="!isLoading && selectedDirectory.files.length > 0"
        class="row q-mt-lg justify-center"
      >
        <file-picker />
      </div>
    </div>
  </q-page>
</template>

<script>
import DirectoryPicker from '../components/pick/DirectoryPicker'
import FilePicker from '../components/pick/FilePicker'

export default {
  name: 'PageIndex',
  components: {
    'directory-picker': DirectoryPicker,
    'file-picker': FilePicker
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
    }
  }
}
</script>
