const HtmlWebPackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, DefinePlugin } = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = () => {
    return {
        output: { publicPath: 'http://localhost:8081/' },

        entry: './src/index.tsx',

        resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']},

        devServer: {
            port: 8081,
            historyApiFallback: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            }
        },
        module: {
            unknownContextCritical: false, // suppresses a warning during compile caused by coveo's crypto polyfill which will be fixed in next major release
            rules: [
                {
                    test: /\.m?js/,
                    type: 'javascript/auto',
                    exclude: [/node_modules/],
                    resolve: {fullySpecified: false}
                },
                {
                    test: /\.css$/i,
                    loader: "css-loader"
                  },
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: [/node_modules/],
                    use: {loader: 'babel-loader'}
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.json$/,
                    type: 'json'
                }
            ]
        },

        plugins: [
            new ModuleFederationPlugin({
                name: 'scalar_remote',
                filename: 'remoteEntry.js',
                exposes: {
                    './ScalarRemote': './src/App.tsx'
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        eager: false,
                        requiredVersion: deps.react
                    },
                    'react-dom': {
                        singleton: true,
                        eager: false,
                        requiredVersion: deps['react-dom']
                    }
                }
            }),
            // Automatically imports React when needed
            new ProvidePlugin({React: 'react'}),
            new HtmlWebPackPlugin({template: './index.html'})
        ]
    };
};
