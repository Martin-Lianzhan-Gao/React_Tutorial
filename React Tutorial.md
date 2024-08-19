# React Tutorial

## 创建项目

**使用Vita创建项目：**

- `npm create vite@latest`
- 选择需要的app类型（Vue, React, etc.)
- follow the instruction
  - `cd [your-app-name]`
  - `npm install` 安装项目依赖的node.js包
  - `npm run dev` 启动服务器

## 需要注意的项目结构

在初始项目中，app.jsx中的代码是sample组件，删除它们并在这里构建自己的app。

整个项目被main.jsx渲染，不需要理会。

**PS: JSX = JavaScript XML**



## React 需要注意的要点

### 1 使用花括号`{}`可以在jsx文件的Html代码中插入JavaScript表达式

```react
function Food() { 
    const food1 = 'Banana'
    const food2 = 'Orange'

    return (
        <ul>
            <li>Apple</li>
            <li>{ food1 }</li> 
            <li>{ food2.toUpperCase() }</li>
        </ul>
    );
}

export default Food;
```

### 2 应用css style的形式

#### 1）使用index.css 控制所有页面和组件（EXTERNAL）

index.css的作用域作用于全局标签。

```react
import './Card.css'
import profilePic from "./assets/profile.jpg"

function Card() {
    return (
        <div className="card">
            <img id="profile_pic" src={ profilePic } alt="profile picture"></img>
            <h2>Martin's Code</h2>
            <p>I code everyday then become better than better.</p>
        </div>
    );
}

export default Card;
```

```css
.card {
    border: 1px solid black;
}


```

如上面代码所示，如果想要使用Card.css来控制Card组件也是可行的，但是本质上它的作用和index.css一样，如果main.jsx引入了Card.css, 那么它会控制所有标签。如果Card.jsx引入了Card.css, 它的作用域除了在Card组件之外，也会影响其他组件标签：

```css
p { /* 影响全局的p标签 */
  font-style: italic; 
}

.short-para { /* Footer 和 Card组件都有这个className，影响这两个组件 */
    font-style: italic;
}

h1 { /* 影响全局 */
    font-style: italic;
}
```

#### 2）使用module css文件导入不同的css配置(MODULE)

为了避免这种情况，使用module的形式来引入css：

```
- Button
	- Button.jsx
	- Button.module.css
```

通过引入module形式的css文件，则可以避免这些问题：

```css
/* Card.module.css */ 
.button {
    background-color: hsl(200, 100%, 50%);
    color: white;
    padding: 10px, 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
}
```

```react
import styles from "./Button.module.css"

function Button() {
    return (<button className={ styles.button }>Click Me</button>);
}

export default Button;
```

在后台代码中，被引入模块化css文件的标签，其className或者id是独立的，所以不会出现上面conflict的问题。

#### 3）在jsx文件内部使用style (INTERNAL)

```react
function Button() {
  	const styles = {
      /* 注意每个值都要被引号引起来 */
      /* 注意值的结尾要替换为逗号 */
      /* 注意每个属性都要改为驼峰命名法 */
    	backgroundColor: "hsl(200, 100%, 50%)", 
    	color: "white",
    	padding: "10px 20px",
    	borderRadius: "5px",
    	border: "none",
    	cursor: "pointer",
    }
    return (<button style = {styles}>Click Me</button>);
}

export default Button;
```

这种方法同样也可以规避上面提到的问题。

### 3 class 和 className

在 React 中，使用 `"className"` 而不是 `"class"` 是因为 `"class"` 是 JavaScript 的保留字（关键字），而 `"className"` 则是 React 和 JavaScript 的一种约定，用于表示元素的 CSS 类。

在 JavaScript 中，`class` 是用于定义类的关键字，例如：

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

由于 `"class"` 已经在 JavaScript 中有了特定的用途，如果直接在 React JSX 语法中使用 `"class"` 作为属性名称，可能会引起冲突或导致混淆。为了解决这个问题，React 选择使用 `"className"` 来代替 `"class"`，从而避免与 JavaScript 关键字冲突。

因此，在 React 的 JSX 代码中，如果你想为一个元素添加 CSS 类，你需要使用 `"className"`，而不是直接使用 `"class"`，例如：

```jsx
function MyComponent() {
    return (
        <div className="my-class">
            This is my component!
        </div>
    );
}
```

这个语法糖使得 JSX 更加接近 HTML，同时避免了与 JavaScript 保留字的冲突。



## React Props

> [!NOTE]
>
> Props = read-only properties that are shared between components.
>
> A parent component can send data to a child component.

props是一个JavaScript对象，父对象通过props向子对象传输数据：
```React 
// App.jsx, Parent Component
import Student from "./Student";

function App() {
    return (
        <Student name="Spongebob" age="23" isStudent={true} />
    );
}

export default App
```

```react
// Student.jsx, Child Component
function Student(props) {
    
    return (
        <div>
            <p>Name: {props.name} </p>
            <p>Age: {props.age}</p>
        		<p>Student: { props.isStudent ? "YES" : "NO"}</p>
        </div>
    );
}

export default Student;
```

> [!WARNING]
>
> 在 React 中，当你向组件传递布尔值（Boolean）属性时，需要使用大括号 `{}` 包裹值。这是因为在 JSX 中，大括号 `{}` 用于将 JavaScript 表达式嵌入到 JSX 代码中。
>
> 在你的例子中：
>
> ```javascript
> <Student name="Spongebob" age="23" isStudent={true} />
> ```
>
> - `"Spongebob"` 和 `"23"` 是字符串，所以你可以直接用引号包裹。
> - `isStudent={true}` 则是一个布尔值，而布尔值是 JavaScript 的一种原生数据类型，不是字符串。因此，需要使用 `{}` 包裹起来，将 `true` 作为 JavaScript 表达式传递给 `isStudent` 属性。
>
> 如果你不使用 `{}`，直接写 `isStudent="true"`，React 会将 `"true"` 识别为字符串而不是布尔值，这可能会导致你在组件中无法正确地处理该属性。
>
> 使用 `{true}` 表示你传递的是一个真正的布尔值 `true`，同理，你可以传递 `false`，例如：
>
> ```javascript
> <Student name="Spongebob" age="23" isStudent={false} />
> ```
>
> 另外，如果你要传递一个 `true` 布尔值，还有一个简写方式，可以直接写属性名，不需要加 `={true}`，例如：
>
> ```javascript
> <Student name="Spongebob" age="23" isStudent />
> ```
>
> 这在 React 中被视为默认传递 `true`，等同于 `isStudent={true}`。

数字同理，如果希望输入数字类型，那么也要用`{}`包裹：

```react
// App.jsx, Parent Component
import Student from "./Student";

function App() {
    return (
        <Student name="Spongebob" age={23} isStudent={true} />
    );
}

export default App
```



### `prop-types` 专为react设计的`npm`包

使用`prop-types`来规范`prop`传递的值的类别：

```react
import propTypes from 'prop-types'

function Student(props) {
    
    return (
        <div className="student">
            <p>Name: {props.name} </p>
            <p>Age: {props.age} </p>
            <p>Student: { props.isStudent ? "YES" : "NO"}</p>
        </div>
    );
}

Student.propTypes = { 
    name: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool
}

export default Student;
```

如果传递的类别错误，则浏览器的console会报错。



### Default Props / Default Value (from JavaScript)

可以设置default props, 以防父组件没有传输数据（即将弃用）：

```react
Student.defaultProps = {
    name: "Guest",
    age: 0,
    isStudent: false
}
```

#### 最佳办法：解构赋值（destructuring assignment）

```react
import propTypes from 'prop-types'

function Student(props) {

    const { name = "Guest", age = 18, isStudent = false } = props;
    
    return (
        <div className="student">
            <p>Name: { name } </p>
            <p>Age: { age } </p>
            <p>Student: { isStudent ? "YES" : "NO" }</p>
        </div>
    );
}

Student.propTypes = { 
    name: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool
}

export default Student;
```

##### 1. 解构赋值中的默认参数

```javascript
const { name = "Default Name", age = 18, isStudent = false } = props;
```

**解释**：

- 这里使用的是解构赋值并为每个属性设置默认值。
- 当 `props` 对象中的某个属性未定义或为 `undefined` 时，解构赋值将使用你提供的默认值。例如，如果 `props` 中没有 `name` 属性，`name` 将被设置为 `"Default Name"`。
- 如果 `props` 中已经存在某个属性，它的值将不会被默认值覆盖。

**优点**：

- **局部化处理**：仅针对未定义的属性设置默认值，且保持了其他已经传递的属性值。
- **清晰和简洁**：直接在解构时定义默认值，代码更加简洁且可读性强。

##### 2. 为 `props` 对象本身设置默认值

```javascript
props = { name: "Default Name", age: 18, isStudent: false };
```

**解释**：

- 这种写法尝试直接为整个 `props` 对象设置默认值，但实际上并不常用，因为这样做在逻辑上是错误的。
- 如果你尝试这样写，JavaScript 会覆盖整个 `props` 对象，即使传递了某些属性，它们也会被替换为默认值。这样，你传递的 `props` 值会被完全忽略。

**缺点**：

- **全局覆盖**：不论 `props` 中是否传递了某些属性，整个 `props` 对象都会被覆盖。这可能导致丢失传递的有效数据。
- **不可取的方式**：不符合 JavaScript 常见的处理方式，也会导致代码的意图不清晰。

##### 为什么要用第一种方法？

- **精细控制**：第一种方法可以让你只为未定义或为 `undefined` 的属性提供默认值，而不会影响已经传递的属性。
- **惯用法**：在 JavaScript 和 React 中，使用解构赋值来设置默认值是非常普遍的做法。它能清晰地表达开发者的意图，即只为缺失的属性设置默认值。
- **安全性**：避免错误地覆盖整个 `props` 对象，保持代码的安全性和可维护性。

### 总结

使用解构赋值设置默认值 (`const { name = "Default Name", age = 18, isStudent = false } = props;`) 是一种更加安全、精细化且普遍的做法。它只会为缺少的属性设置默认值，不会覆盖已经传递的属性值，因此是推荐的方式。











