const px2vw = require('postcss-px-to-viewport');

module.exports = {
     // 获取数据
     devServer: {
        proxy: {
          // 调用mock.js的数据
          '/api': {
            //  目标路径 ()
            target: 'http://localhost:6666',
            changeOrigin: true
          }
        }
      },

    // 响应式布局
    css: {
        loaderOptions: {
            postcss: {
                plugins: [new px2vw({
                    unitToConvert: 'px',
                    viewportWidth: 375,
                    unitPrecision: 5,
                    propList: ['*'],
                    viewportUnit: 'vw',
                    fontViewportUnit: 'vw',
                    selectorBlackList: [],
                    minPixelValue: 1,
                    mediaQuery: false,
                    replace: true,
                    //忽略某些文件夹下的文件
                    exclude: /node_modules/,
                    // 要修改的文件
                    include:undefined,
                    landscape: false,
                    landscapeUnit: 'vw',
                    landscapeWidth: 568
                })]
            }
        }
    }
}