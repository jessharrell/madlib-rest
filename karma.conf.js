module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        singleRun: true,
        files: ['**/*.spec.js'],
        port: 9875,
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            'specs/**/*.spec.js': [ 'browserify' ]
        },
        browserify: {
            debug: true,
            transform: [ 'brfs' ]
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-browserify')
        ],
    });
};