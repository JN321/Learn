#### itrem2

主题：bira

#### vscode

##### 常用插件

- vue
  - Vetur
- Prettier - Code formatter
- Path Intellisense
- Code Runner
- Auto Rename Tag
- Auto Close Tag
- [Deprecated] Bracket Pair Colorizer 2

#### mac git

- 解决 mac 下每次 git pull/push 都需要输入密码的问题（配置 ssh 之后，pull、push 操作依然提示需要录入密码）
  - 1、首先执行`ssh-add -L`是否会输出`The agent has no identities.`
  - 2、如果输出则执行`ssh-add`后输入密码。
  - 原因： ssh 的代理就被自动清除
  - [点击这里查看原因](https://blog.csdn.net/a5252145/article/details/112568578)
