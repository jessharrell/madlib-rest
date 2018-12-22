module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['ChromeHeadless'],
        singleRun: true,
        files: ['specs/**/*.spec.js'],
        port: 9875,
        frameworks: ['jasmine'],
        preprocessors: {
            'specs/**/*.spec.js': ['webpack']
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-webpack')
        ],
    });
};