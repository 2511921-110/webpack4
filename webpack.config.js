const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// const ImageminPlugin = require("imagemin-webpack")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imagemin = require('imagemin')
const imageminGifsicle = require("imagemin-gifsicle")
const imageminJpegtran = require("imagemin-jpegtran")
const imageminOptipng = require("imagemin-optipng")
const imageminSvgo = require("imagemin-svgo")

const MODE = "development";
const enabledSourceMap = MODE === "development";

module.exports = [

  {

    mode: MODE, //development or production

    // devtool: "source-map",

    entry: [
      './js/app.js',
    ],// エントリーポイントの設定

    output: {// 出力する内容
        path: path.resolve(__dirname, '../dist'),
        // path: path.join(__dirname, 'js'),
        filename: 'bundle.js'// 出力するファイル名
    },
    
    module: {
      // babel-loaderの設定
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },

        // {
        //   test: /\.svg$/,
        //   loader: 'vue-svg-loader'
        // },

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

        // SASS取り込み設定
        // {
        //   test: /\.scss/,
        //   use: [
        //     'vue-style-loader',
        //     'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         url: false
        //       },
        //     },
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMap: true,
        //       }
        //     }
        //   ]
        // }

          {
            test: /\.scss/, // 対象となるファイルの拡張子
            use: [
              // linkタグに出力する機能
              "style-loader",
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
                loader: "sass-loader",
                options: {
                  // ソースマップの利用有無
                  sourceMap: enabledSourceMap
                }
              }
            ]
          },

          // {
          //   test: /\.(sa|sc|c)ss$/,
          //   use: [
          //     // MiniCssExtractPlugin.loader,
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         url: false,
          //         // minimize: true,
          //         sourceMap: true
          //       }
          //     },
          //     {
          //       loader: 'postcss-loader',
          //       options: {
          //         sourceMap: true,
          //         plugins: [
          //             require('cssnano')({ // cssnanoを導入
          //                 preset: 'default',
          //             }),
          //             require('autoprefixer')({
          //               grid: true, // CSS Grid Layout
          //               "browsers": [
          //                 "> 1%",
          //                 "IE 10"
          //               ]
          //           })
          //         ]
          //       }
          //     },
          //     {
          //       loader: 'sass-loader',//SASSをCSSに変換
          //       options: {
          //         sourceMap: true//ソースマップツールを有効
          //       }
          //     }
          //   ]
          // },


          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                // loader: 'url-loader?limit=8192&name=assets/[name].[ext]',
                loader: 'url-loader',
                // options: {
                //   limit: 8192,
                //   name: '../assets/[name].[ext]'
                // }
              },
            ],
            // loader: "file-loader?limit=100000&name=/wp-content/themes/origin-theme/assets/[name].[ext]"
            // loader: "file-loader"
          },

          {
            test: /\.(eot|otf|ttf|woff2?|svg)(\?.+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
            // include: [
            //     path.resolve(__dirname, 'node_modules')
            // ],
            // use: {
            //     loader: 'file-loader',
            //     options: {
            //         name: './fonts/[name].[ext]'
            //     }
            // }
          }
      ]
    },

    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['../../bebo-lab/'] },
        // proxy: 'http://wise.local/',
        files: [
          '../css/*.css',
          '../*.php',
          '../*.html'
        ]
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'assets/'),
          to: path.resolve(__dirname, '../assets/'),
        },
      ]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: '95-100',
        },
      }),
      // new MiniCssExtractPlugin({
      //   filename: 'style.css',
      // }),
      new VueLoaderPlugin()
    ]
  },

  {

    mode: MODE, //development or production

    devtool: "source-map",

    entry: [
      './scss/front.scss'
    ],// エントリーポイントの設定

    output: {// 出力する内容
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]'
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

        // SASS取り込み設定

          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  // minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: [
                      require('cssnano')({ // cssnanoを導入
                          preset: 'default',
                      }),
                      require('autoprefixer')({
                        grid: true, // CSS Grid Layout
                        "browsers": [
                          "> 1%",
                          "IE 10"
                        ]
                    })
                  ]
                }
              },
              {
                loader: 'sass-loader',//SASSをCSSに変換
                options: {
                  sourceMap: true//ソースマップツールを有効
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
            include: [
                path.resolve(__dirname, 'node_modules')
            ],
            use: {
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]'
                }
            }
          }
      ]
    },

    plugins: [
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['../../bebo-lab/'] },
        // proxy: 'http://wise.local/',
        files: [
          '../css/*.css',
          '../*.php',
          '../*.html'
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'front.css',
      }),
    ]
  }
]