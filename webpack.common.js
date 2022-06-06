const path = require('path');
const copyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        content: path.resolve('src/content/content.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
            {
                type: 'assets/resource',
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                },
            ],
        }),
        ...getHtmlPlugins(['popup', 'options']),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) => new HtmlPlugin({ title: 'Revin Extension', filename: `${chunk}.html`, chunks: [chunk] })
    );
}
