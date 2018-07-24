module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{js,html,ico,json,css,png,jpg}",
    "src/images/*.{jpg,png}"
  ],
  "swSrc": "public/sw-base.js",
  "swDest": "public/service-worker.js",
  "globIgnores": [
    "help/**"
  ]
};