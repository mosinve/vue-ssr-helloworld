import { createApp } from './main'

export default context => {
  return new Promise(((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      try {
        await Promise.all(matchedComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        }))
        context.state = store.state
        resolve(app)
      } catch (e) {
        reject(e)
      }
    }, reject)
  }))
}
