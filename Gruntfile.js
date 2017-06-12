module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      initBuild: {
        src: ['public/']
      }
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
          'public/js/elm.js': ['frontend/js/elm.js'],
          'public/js/analyticsBase.js': ['public/js/analyticsBase.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', [
    'imagemin',
    'browserify'
  ]);
};
