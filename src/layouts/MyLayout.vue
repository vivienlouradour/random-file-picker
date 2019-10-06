<template>
  <q-layout view="hHh Lpr lFf">

    <q-header elevated>
      <q-bar class="q-electron-drag">
        <q-icon name="shuffle" />
        <div>Random File Picker</div>

        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          @click="minimize"
        />
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximize"
        />
        <q-btn
          dense
          flat
          icon="close"
          @click="closeApp"
        />
      </q-bar>

    </q-header>

    <q-page-container>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-2 text-teal"
      >
        <q-route-tab
          name="pick"
          icon="shuffle"
          to="/"
          label="Pick"
        />
        <q-route-tab
          name="settings"
          icon="settings_applications"
          to="/settings"
          label="Settings"
        />
      </q-tabs>
      <div class="q-mt-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
