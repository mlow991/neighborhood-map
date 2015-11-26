module.exports = function(grunt) {
	grunt.initConfig({
		postcss : {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({browsers: ['last 2 versions']})
				]
			},
			dist: {
				src: 'css/main.css',
				dest: 'css/main.css'
			}
		},

		htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'index.html',
				}
			}
		},

		cssmin: {
			main: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css/',
					ext: '.css'
				}]
			}
		},

		uglify: {
			targets: {
				files: {
					'dist/js/app.js': ['js/app.js']
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['postcss', 'htmlmin', 'cssmin', 'uglify']);
};