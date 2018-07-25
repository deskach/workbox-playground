importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js')
importScripts('src/js/idb.js')
importScripts('src/js/utility.js')

workbox.routing.registerRoute(new RegExp(/.*(?:googleapis|gstatic)\.com.*$/), workbox.strategies.staleWhileRevalidate({
  cacheName: 'google-fonts',
  plugins: [
    new workbox.expiration.Plugin({
      // Only cache requests for a week
      maxAgeSeconds: 7 * 24 * 60 * 60,
      // Only cache 10 requests.
      maxEntries: 10,
    })
  ]
}))

workbox.routing.registerRoute(
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'material-css'
  }))

workbox.routing.registerRoute(new RegExp(/.*firebasestorage\.googleapis\.com.*$/), workbox.strategies.staleWhileRevalidate({
  cacheName: 'post-images'
}))

workbox.routing.registerRoute(
  "https://pwagram-99adf.firebaseio.com/subscriptions.json",
  function (args) {
    return fetch(args.event.request)
      .then(function (res) {
        var clonedRes = res.clone()
        
        clearAllData('posts')
          .then(function () {
            return clonedRes.json()
          })
          .then(function (data) {
            for (var key in data) {
              writeData('posts', data[key])
            }
          })
        
        return res
      })
  }
)

workbox.routing.registerRoute(new RegExp('/images/'), workbox.strategies.cacheFirst({cacheName: 'image-cache'}))

workbox.precaching.precacheAndRoute([])
