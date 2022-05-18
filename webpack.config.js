const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    // モジュールのバンドルを行うための起点となるファイルを宣言。エントリーポイントに名前をつけて、それ用のファイルを宣言する
    entry: {
        'main': path.join(__dirname, './js/index.js'),
        'main.css': path.join(__dirname, './sass/main.scss')
    },
    // バンドル(一つにまとめた)したファイルをどこに出力するか。
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js', // [name]にはentry:で指定したキーが入る
    },
    // モジュールをimportする際に、指定ファイルの拡張子を省略できる
    resolve: {
        extensions: ['.js', '.scss']
    },
    devServer: {
        // webpack dev serverが参照するフォルダ
        static: {
            directory: path.join(__dirname, 'dist')
        },
        open: true,
        port: 7070
    },
    module: {
        // モジュールに適用するルールを設定
        rules: [
            // sassのコンパイル指定
            {
                test: /\.(sa|sc|c)ss$/, // 対象にするファイルを指定
                use: [
                    MiniCssExtractPlugin.loader, // JSとCSSを別々に出力する
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(), // CSS別出力時の不要JSファイルを削除
        new MiniCssExtractPlugin({ // cssの出力先
            filename: 'css/[name]' // 出力ファイル名を相対パスで指定（[name]にはentry:で指定したキーが入る）
        })
    ],
    // node_modulesを監視（watch）対象から除外
    watchOptions: {
        ignored: /node_modules/
    }
}