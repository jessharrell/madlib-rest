module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ],
        singleRun: true,
        files: ['**/*.spec.js', 'index.js'],
        port: 9875,
    });
};