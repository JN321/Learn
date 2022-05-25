import babel from "rollup-plugin-babel";
export default {
  input: './src/index.js',
  output: {
    file: './dist/vue.js', // 出口
    name: 'Vue', // global.Vue 在全局关在一个全局的变量Vue，配合`format`一起使用就会在window上挂载Vue变量
    format: 'umd', // 打包的格式 esm：es6模块 、 commonjs 、 iife 、 umd：兼容amd\commonjs
    sourcemap: true // 支持调试源代码
  },
  plugins: [
    babel({ // bebel() 默认会读取`.babelrc`文件 
      exclude: "node_modules/**" // exclude:排除 **:表示任意文件、任意文件夹
    })
  ]
}