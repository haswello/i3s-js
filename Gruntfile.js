module.exports = function(grunt) {

	
	///////////////////////////////////////////////////////////////////////////////
	// DEPENDENCIES & TASK SETUP
	///////////////////////////////////////////////////////////////////////////////
	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
	};

	// Jasmine options
	gruntConfig.jasmine_node = {

		options: {
			forceExit: true,
			match: '.',
			matchall: false,
			extensions: 'js',
			specNameMatcher: 'spec',
			jUnit: {
				report: true,
				savePath : "./build/reports/jasmine/",
				useDotNotation: true,
				consolidate: true
			}
		},
		all: ['spec/']
	};

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks('grunt-jasmine-node');

	grunt.registerTask('test', ['jasmine_node']);

};
