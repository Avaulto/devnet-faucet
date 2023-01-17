const { ProvidePlugin } = require('webpack');

module.exports = function (config, env) {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.m?[jt]sx?$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.m?[jt]sx?$/,
                    resolve: {
                        fullySpecified: false,
                    },
                },
            ],
        },
        plugins: [
            ...config.plugins,
            new ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            ...config.resolve,
            fallback: {
                path: false,
                fs: false,
                os: false,
                crypto: false,
                process: false,
                util: false,
                assert: false,
                stream: false,
                zlib: false,
                url: false,
                https: false,
                http: false
            },
        },
        ignoreWarnings: [/Failed to parse source map/],
    };
};
