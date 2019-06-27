## webpack4

### 開発環境
- node 8.11.0

### 制作環境
- srcフォルダ直下のファイルを編集(style.cssは削除しない)
- distフォルダ直下のファイルをアップロードする
- ファーストビュー内のCSSをHTMLファイルにインラインで自動記入する

### srcフォルダの説明
- assetsフォルダ
-- フォルダ内部の画像を自動で圧縮して、distフォルダ内にあるassetsフォルダへコピーする

- scssフォルダ
-- scssが入っている

- jsフォルダ
-- ES6での記述が可能
-- babelでES5に変換
-- このapp.jsが起点になって、各SCSSをコンパイルする

### htmlファイルに関して
- webpack.config.jsにある[ HtmlWebpackPlugin ]にて作成するhtmlを記述しないといけない。
