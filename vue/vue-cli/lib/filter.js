const match = require('minimatch')
const evaluate = require('./eval')

// 经过ask用户需求后 => metadata => 过滤掉不需要的模板配置

module.exports = (files, filters, data, done) => {
  if (!filters) {
    return done()
  }
  const fileNames = Object.keys(files)
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob]
        if (!evaluate(condition, data)) {
          // metalsmith.metadata()下condiftion表达式不成立的，就删除
          delete files[file]
        }
      }
    })
  })
  done()
}
