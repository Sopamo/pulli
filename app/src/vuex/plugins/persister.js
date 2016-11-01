const persister = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.set('vuex-state', JSON.stringify(state))
  })
}

export default persister
