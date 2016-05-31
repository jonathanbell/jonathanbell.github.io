module.exports = function(grunt) {

  grunt.initConfig({

    // https://www.npmjs.com/package/grunt-contrib-watch#options-spawn
    watch: {
      options: {
        spawn: false
      },
      scripts: {
        files: [
          'src/**/*.js',
          'src/**/*.css',
          'src/index.html',
          '!src/bower/**/*',
          '!src/fonts/**/*'
        ],
        tasks: ['concat', 'inline']
      }
    },

    // https://github.com/ck86/main-bower-files#usage-with-grunt
    // copies main bower files into your project 
    bower: {
      dist: {
        dest: 'src/bower',
        options: {
          checkExistence: true,
          debugging: true
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-concat#options
    concat: {
      js: {
        src: [
          'src/bower/*.js',
          'src/js/*.js'
        ],
        options: {
          separator: '\n\n//-------------------------------------------------\n'
        },
        dest: 'dist/dist.js'
      },
      css: {
        src: [
          'src/bower/*.css',
          'src/css/*.css'
        ],
        dest: 'dist/dist.css'
      },
      fonts: {
        src: [
          'src/fonts/*.css'
        ],
        dest: 'dist/fonts.css'
      },
    },

    // https://github.com/chyingp/grunt-inline
    inline: {
      dist: {
        src: 'src/index.html',
        dest: 'index.html',
        options: {
          // exts: ['jade'], // extends file extensions to behave like HTML
          cssmin: true,
          uglify: true
        },
      }
    }

  }); // grunt.initConfig

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('main-bower-files');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-inline');

  grunt.registerTask('default', ['bower', 'concat', 'inline']);

}; // wrapper function
