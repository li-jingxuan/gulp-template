# Gulp任务说明
## 注意事项
### 需要把文件放到对应的目录中，否则无法进行打包压缩
#### css 、 js 、 image 、 html

## 调试项目
```
npm install --global gulp
```
```
npm install
```
```
gulp // 启动默认任务
```

## 支持任务：
#### 压缩./src/js/**/*.js文件
```
gulp js
```
#### 压缩./src/html/**/*.html文件
```
gulp html
```
#### 压缩 ./src/image/**/*.* (jpg、png、svg、gif) 图片
```
gulp image
```
#### 压缩./src/css/**/*.css文件
```
gulp css
```
#### 默认任务：js/html/image/css/watch/browserSync 任务，启动服务并且监听文件实时刷新
```
gulp default / gulp:
```