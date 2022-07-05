## React Native
```c++
QButton *qBtn = new QButton();
qBtn->setText("保存");

QText *qText = new QText();
qText->setText("首页");
qText->setColor(new QColor('#ff0'));

qLayout.append(qBtn);

// <span>首页</span>
// <button>保存</button>
```

### 一起写一个咨询系统。

#### 部署相关
- Node.js 12+;
- 打包
    - metro 的打包工具。Facebook 出品，类似于 webpack, 需要启动对应的项目开发。
    - expo-cli, 社区提供的沙盒。能够让你快速地进行开发。

#### RN的特点
- 有自己的标签， 比如 `<View />`, `<Text />`;
- style
```js
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
  title: {
    color: '#f00',
    fontSize: 20,
  },
});
```
- 默认，是 `flex` 布局， 而且是 `flex-col`, 一般我们也不用直接声明式 `display: flex`;

- image 必须指定宽高。

- 滚动条要用 `scrollView`,
- `Dimensions.get('window').width`;
- `PixelRatio.get()`;
- 没有 text-indent, 首行缩进要自己写;
- 没有 e.target.value -> e.nativeEvent.text;

#### DPR

在很早以前，我们的显示器。23寸 - 1920*1080px - 72像素每英寸。代表着是一种画面的细腻程度。

从iPhone 4s 开始，乔布斯搞了个 retina 屏幕。宣称我能做到，显示器的分辨率，是 144像素每英寸。

显示器厂商，就会整两个值：
- 物理像素。
- 逻辑像素。

devicePixelRatio, dpr, 屏幕像素比。

#### 1px 方案。
200% transform -> 50%

#### rem 方案。 
相对于 根元素字体的一个大小。
html {
    font-size: 16px;
}

```js
var rem = document.documentElement.clientWidth / 10;
documentELement.style.fontSize = rem + 'px';
// 1rem 就变成了 视口的1/10
// postcss rem2px px2rem
```

#### 响应式

最早是 bootstarp / antd / element
```js
<Col md={2} sm={4}></Col>
```

```css
@media (min-width: 768px) {
    .antd-col-md-2 {
        display: block;
        max-width: 8.3333%;
        flex: 0 0 8.3333%;
    }
    .antd-col-md-4 {
        display: block;
        max-width: 16.6667%;
        flex: 0 0 16.6667%;
    }
}

@media (max-width: 768px) {
    .antd-col-sm-2 {
        display: block;
        max-width: 8.3333%;
        flex: 0 0 8.3333%;
    }
    .antd-col-sm-4 {
        display: block;
        max-width: 16.6667%;
        flex: 0 0 16.6667%;
    }
}

```


## 一个APP，包含哪些部分。

### navigation
```json
{
    "@react-navigation/bottom-tabs": "^6.0.9",
    "@react-navigation/material-top-tabs": "^6.0.6",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/native-stack": "^6.2.5",
    "@react-navigation/stack": "^6.0.11",
}
```






### icon 
```json
    "react-native-vector-icons": "^9.0.0",
```

### redux
```json
"react-redux": "^7.2.6",
"redux": "^4.1.2",
"redux-thunk": "^2.4.1"
```
### charts
```json
"react-native-charts-wrapper": "^0.5.7",
```
## 参考学习链接

https://www.awesome-react-native.com/#Components-UI

https://oblador.github.io/react-native-vector-icons/

https://github.com/fangwei716/30-days-of-react-native

https://github.com/MarnoDev/react-native-eyepetizer
