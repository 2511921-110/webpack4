const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// const ImageminPlugin = require("imagemin-webpack")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imagemin = require('imagemin')
const imageminGifsicle = require("imagemin-gifsicle")
const imageminJpegtran = require("imagemin-jpegtran")
const imageminOptipng = require("imagemin-optipng")
const imageminSvgo = require("imagemin-svgo")

module.exports = {

  mode: 'development', //development or production

  devtool: "source-map",

  entry: './js/app.js',// エントリーポイントの設定

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

        // {
        //   test: /\.(css|sass|scss)$/,
        //   use: [
        //     'style-loader',
        //     'css-loader',
        //     'sass-loader',
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         plugins: function () {
        //           return [
        //             require('autoprefixer')
        //           ];
        //         }
        //       }
        //     }
        //   ]
        // },

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

        // {
        //   test: /\.(sc|c|sa)ss$/,
        //   use: [
        //     // vue-style-loaderをMiniCssExtractPlugin.loaderに変更
        //     MiniCssExtractPlugin.loader,
        //     'css-loader',
        //     'sass-loader',
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         plugins: function () {
        //           return [
        //             require('autoprefixer')
        //           ];
        //         }
        //       }
        //     }
        //   ]
        // },

        

        // {
        //   test: /\.(jpe?g|png|gif|svg|ico)(\?.+)?$/,
        //   include: [
        //       path.resolve(__dirname, 'img')
        //   ],
        //   use: {
        //       loader: 'url-loader',
        //       options: {
        //           // limit: 8192,
        //           name: './assets/[name].[ext]'
        //       }
        //   }
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
      // server: { baseDir: ['../../themes'] }
      proxy: 'http://wise.local/',
      files: [
        '../css/*.css',
        '../*.php'
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
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
};