const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin")
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imagemin = require('imagemin')
const imageminGifsicle = require("imagemin-gifsicle")
const imageminJpegtran = require("imagemin-jpegtran")
const imageminOptipng = require("imagemin-optipng")
const imageminSvgo = require("imagemin-svgo")

const MODE = "development";//development or production
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: "./src/js/app.js",
  output: {
    filename: 'js/bundle.js',// 出力するファイル名
    path: path.resolve(__dirname, "dist")
  },
  module: {
    // babel-loaderの設定
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         url: false,
      //         minimize: true,
      //       }
      //     },
      //     {
      //       loader: 'sass-loader'
      //     }
      //   ]
      // },
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          "style-loader",
          MiniCssExtractPlugin.loader,
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: true,
              // ソースマップの利用有無
              // sourceMap: true,
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true, //ソースマップを有効
              plugins: [
                require('autoprefixer')({
                  grid: true, // CSS Grid Layout を使いたいんだ
                  "browsers": [
                    "> 1%",
                    "IE 10"
                  ]
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff2?|svg)(\?.+)?$/,
        loader: 'file-loader?name=../fonts/[name].[ext]'
      }
      ,{
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./dist/'] },
      // proxy: 'http://wise.local/',
      files: [
        '../dist/css/*.css',
        '../dist/*.php',
        '../dist/*.html'
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/'),
        to: path.resolve(__dirname, 'dist/assets/'),
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-80'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      inject: true
    }),
    /* new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/info/index.html"),
      filename: "info/index.html",
      inject: true
    }), */
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css"
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.join(path.resolve(__dirname), "dist/"),
      src: "index.html",
      dest: "index.html",
      inline: true,
      width: 1280,
      height: 768,
      penthouse: {
        blockJSRequests: false
      }
    })
  ]
};