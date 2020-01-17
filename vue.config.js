const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.clocklook.app',
        productName: '打卡查看器', // 项目名，也是生成的安装文件名，即aDemo.exe
        copyright: 'Copyright © 2020', // 版权信息
        directories: {
          output: './dist_electron'// 输出文件路径
        },
        win: {
          icon: './public/app.ico'
        },
        mac: {
          icon: './public/app.png'
        },
        target: [
          {
            target: 'nsis',
            arch: [
              'x64',
              'ia32'
            ]
          }
        ],
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true // 创建开始菜单图标
        }
      }
    }
  }
}
