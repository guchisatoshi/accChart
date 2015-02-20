module.exports = function(grunt) {
    'use strict';
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dev : {
            js : 'dev/js/*.js',
            css : 'dev/css/*.css'
        },

 
        uglify: {
            app : {
                options: {
                    banner: '/*! <%= pkg.name %> | Copyright (c) 2015 LNLY. */',
                    sourceMap: true,
                },
                files : [
                    {
                        expand : true,
                        cwd : 'dev/js',
                        dest : 'js/',
                        src : '*.js',
                        ext : '.min.js',
                        extDot : 'last'
                    }
                ]
            }
        },
        
        cssmin: {
            style : {
                expand: true,
                cwd: 'dev/css',
                src: ['*.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
 
        watch : {
            app : {
                files : '<%= dev.js %>',
                tasks : ['uglify:app']
            },
            style : {
                files : '<%= dev.css %>',
                tasks : ['cssmin:style']
            },
        }
 
    });
 
    //プラグイン読み込み
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
 
    //タスク定義
    grunt.registerTask('livebuild', [ 'watch' ]);
};