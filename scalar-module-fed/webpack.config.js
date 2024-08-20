const HtmlWebPackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, DefinePlugin } = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = (env) => {
    return {
        output: { publicPath: 'http://localhost:8080/' },

        resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']},

        devServer: {
            port: 8080,
            historyApiFallback: true
        },

        module: {
            rules: [
                {
                    test: /\.m?js/,
                    type: 'javascript/auto',
                    resolve: {fullySpecified: false}
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {loader: 'babel-loader'}
                },
                {
                    test: /\.json$/,
                    type: 'json'
                }
            ]
        },

        plugins: [
            new ModuleFederationPlugin({
                name: 'shell',
                filename: 'remoteEntry.js',
                exposes: {},
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: deps['react-dom']
                    }
                }
            }),
            // Automatically imports React when needed
            new ProvidePlugin({React: 'react'}),
            new HtmlWebPackPlugin({template: './src/index.html'})
        ]
    };
};
