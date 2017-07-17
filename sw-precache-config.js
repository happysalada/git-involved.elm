module.exports = {
  staticFileGlobs: [
    'public/assets/**.*',
    'public/styles/*.css',
    'public/js/*.js',
    'public/index.html',
  ],
  stripPrefix: 'public/',
  verbose: true,
  runtimeCaching: [{
    urlPattern: /index\\.html/,
    handler: 'networkFirst'
  }]
};
