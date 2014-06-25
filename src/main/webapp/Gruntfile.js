module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['**/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: {
          'dest/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      },
      css: {
        files: {
          'dest/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', '**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', , 'concat', 'uglify']);

};