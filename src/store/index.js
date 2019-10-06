import Vue from 'vue'
import Vuex from 'vuex'

import fileStructure from './fileStructure'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      fileStructure
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
   if we want some HMR magic for it, we handle
   the hot update like below. Notice we guard this
   code with "process.env.DEV" -- so this doesn't
   get into our production build (and it shouldn't).
 */

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./fileStructure'], () => {
      const newFileStructure = require('./fileStructure').default
      Store.hotUpdate({ modules: { fileStructure: newFileStructure } })
    })
  }

  return Store
}
