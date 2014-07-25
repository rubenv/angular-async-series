module.exports = function (config) {
    return config.set({
        basePath: '../..',
        frameworks: ['mocha', 'chai'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'dist/angular-async-series.js',
            'test/*.js'
        ],
        port: 9877
    });
};
