module.exports = {
  staticFileGlobs: [
    'public/assets/**.*',
    'public/styles/*.css',
    'public/js/*.js',
  ],
  stripPrefix: 'public/',
  verbose: true,
  runtimeCaching: [{
    urlPattern: /index\\.html/,
    handler: 'networkFirst'
  }]
};
