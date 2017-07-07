importScripts('workbox-sw.prod.v1.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/assets/favicon.ico",
    "revision": "437d9580a62f42c1ebaa355456174879"
  },
  {
    "url": "/assets/launcher_icon_2x.png",
    "revision": "b1003bde6748cf0dafedbd8dd4dce38b"
  },
  {
    "url": "/assets/launcher_icon_3x.png",
    "revision": "437d9580a62f42c1ebaa355456174879"
  },
  {
    "url": "/assets/launcher_icon.png",
    "revision": "5e5956232b98810da18c8251d01b1c6e"
  },
  {
    "url": "/assets/manifest-7bd529.json",
    "revision": "696b7dfd4302a7c0b05b5940452eb6c7"
  },
  {
    "url": "/index.html",
    "revision": "0dc313ff37812b1033c2c3347c0630ae"
  },
  {
    "url": "/js/analytics.js.map",
    "revision": "20ac60dfc53ccc2c10d14844b4180f0a"
  },
  {
    "url": "/js/analyticsBase-eb017c.js",
    "revision": "10b7f79b785020e3e47d4bd875755b47"
  },
  {
    "url": "/js/elm-666605.js",
    "revision": "e17edbcf718ed8556284494839f60f18"
  },
  {
    "url": "/robots.txt",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "/sitemap.xml",
    "revision": "88bd28f9f7dec1f1e6ddbd739b17c838"
  },
  {
    "url": "/styles/index-c3112e.css",
    "revision": "034655a40c0b15719a32198bfa7587a4"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
