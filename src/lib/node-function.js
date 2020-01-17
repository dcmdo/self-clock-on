import fs from 'fs'
// import {exec} from 'child_process';
import Path from 'path'
import dns from 'dns'

export default {
  // ……………………删除文件夹…………………………………………
  deleteFolder (path) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach(function (file, index) {
        let curPath = Path.resolve(path, file)
        if (fs.statSync(curPath).isDirectory()) { // recurse
          window.node_fns.deleteFolder(curPath)
        } else { // delete file
          try {
            fs.unlinkSync(curPath)
          } catch (e) {
            console.log('删除文件失败！', e)
          }
        }
      })
      try {
        fs.rmdirSync(path)
      } catch (e) {
        console.log('删除文件夹失败！', e)
      }
    }
  },
  // ……………………清空文件夹…………………………………………
  clearFolder (path, isRoot) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach(function (file, index) {
        let curPath = Path.resolve(path, file)
        if (fs.statSync(curPath).isDirectory()) { // recurse
          window.node_fns.clearFolder(curPath, false)
        } else { // delete file
          try {
            fs.unlinkSync(curPath)
          } catch (e) {
            console.log('删除文件失败！', e)
          }
        }
      })
      if (!isRoot) {
        try {
          fs.rmdirSync(path)
        } catch (e) {
          console.log('删除文件夹失败！', e)
        }
      }
    }
  },
  // ……………………拷贝文件夹…………………………………………
  copyFolder (from, to) { // 复制文件夹到指定目录
    let files = []
    if (fs.existsSync(to)) { // 文件是否存在 如果不存在则创建
      files = fs.readdirSync(from)
      files.forEach(function (file, index) {
        let targetPath = Path.resolve(to, file)
        let fromPath = Path.resolve(from, file)
        if (fs.statSync(fromPath).isDirectory()) {
          window.node_fns.copyFolder(fromPath, targetPath)
        } else {
          try {
            fs.writeFileSync(targetPath, fs.readFileSync(fromPath))
            console.log('write成功！')
          } catch (e) {
            try {
              console.log('write失败！', e)
              fs.renameSync(targetPath, targetPath + '.obj')
              fs.writeFileSync(targetPath, fs.readFileSync(fromPath))
            } catch (e) {
              console.log('write再次失败！', e)
            }
          }
        }
      })
    } else {
      fs.mkdirSync(to)
      window.node_fns.copyFolder(from, to)
    }
  },
  // ……………………文件是否存在…………………………………………
  isExistFolder (path, _callback) {
    // eslint-disable-next-line node/no-deprecated-api
    fs.exists(path, _callback)
  },
  // ……………………判断文件是否存在…………………………………………
  exist (path) {
    process.noAsar = true
    return fs.existsSync(path)
  },
  // ……………………删除文件…………………………………………
  deleteFile (path) {
    if (window.node_fns.exist(path)) {
      console.log('文件存在！')
      try {
        process.noAsar = true
        fs.unlinkSync(path)
        console.log('删除成功！')
      } catch (e) {
        console.log('删除失败！', e)
      }
    } else {
      console.log('文件不存在！')
    }
  },
  // ……………………读取文件夹…………………………………………
  readFolders (path) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      return files
    } else {
      console.log('路径不存在！')
    }
  },
  // ……………………检测网络是否连接…………………………………………
  checkNetwork (callback) {
    dns.resolve('www.baidu.com', function (err) {
      if (err) {
        // eslint-disable-next-line standard/no-callback-literal
        callback(0)
      } else {
        // eslint-disable-next-line standard/no-callback-literal
        callback(1)
      }
    })
  },
  // ……………………写入本地文件…………………………………………
  writeFile: fs.writeFileSync,
  // ……………………读取本地文件…………………………………………
  readFile: fs.readFileSync,
  // ……………………创建文件夹…………………………………………
  createFloder: fs.mkdirSync,
  // ……………………重命名…………………………………………
  rename: fs.renameSync,
  // ……………………拷贝文件…………………………………………
  copyFile (src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src))
  }
}
