module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      initBuild: {
        src: ['public/']
      }
    },
    //copy
    copy: {
      favicoManifest: {
        files: [
          {nonull: true, src: 'frontend/favicon.ico', dest: 'public/favicon.ico'},
          {nonull: true, src: 'frontend/manifest.json', dest: 'public/manifest.json'}
        ]
      },
    },
    imagemin: {
      img: {
        options: {
          optimizationLevel: 3
        },                 // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'frontend/img/',     // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'public/img'         // Destination path prefix
        }]
      }
    },
    cssmin: {
      pre: {
        options: {keepSpecialComments: 0},
        files: {
          'public/styles/index.css': 'frontend/styles/cssRemoveAndCombine.css'
        }
      },
    },
    browserify: {
      build: {
        files: {'public/js/analyticsBase.js': 'frontend/js/analyticsBase.js'},
        options: {
          extensions: ['.js'],
          transform: [
            ['babelify', {
              presets: ['es2015', 'stage-2'],
              plugins: [
                ["add-module-exports"],
                ["transform-async-to-generator"],
                ["transform-es2015-modules-commonjs"],
                ['transform-inline-environment-variables'],
                ['transform-object-rest-spread', { useBuiltIns: true }]
              ]
            }]
          ]
        }
      }
    },
    uglify: {
      options: {},
      dist: {
        files: {
          'public/elm.js': ['frontend/elm.js'],
          'public/js/analyticsBase.js': ['public/js/analyticsBase.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', [
    'clean:initBuild',
    'copy',
    'imagemin',
    'cssmin:pre',
    'browserify',
    'uglify'
  ]);
};
