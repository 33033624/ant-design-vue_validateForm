# ant-design-vue_validateForm

介绍： 基于 ant-desing-vue 的表单校验复杂度进行封装简化（目前支持非空校验和函数校验）

# 安装

npm install ant-design-vue_validateform --save

# 使用

### 1.首先引入 mixin 并且使用

```javascript
import { validateMixin } from "ant-design-vue_validateform";
export default {
  mixins: [validateMixin]
};
```

### 2.其次赋值 form 给当前引用组件的 form 元素（ant-design-vue_validateform 中已经注册了 form,直接用就可以）

```javascript
 <a-form :form="form">
```

### 3.使用校验表单组件(其中 validateInput 和 form 均以存在不需要重新注册)

```javascript
  <validateFormItem
    :form="form"
    :valiateProps="rules"
    @validate="validateInput"
  />
```

### 4.data 中注册 rules， type 类型为 input|| select || datePicker || rangePicker || checkboxGroup，rules 中的每一项的 key 必须与内部的 label 保持一致

```javascript
rules: {
        test: {
          type: 'input', // 校验的组件类型
          label: 'test', // 与key需要保持一致
          labelName: '测试', // label显示的名称
          message: '请填写', // 校验触发的时候展示的文案
          value: '', // 默认传递的值
          validateStatus: false // 默认需要传递false
        }
      }
```

### 5.获取校验后的数据, this.validateOk 是我们插件中已经注册的方法，直接使用后会返回两个回调参数 validate 是校验结果，obj 是通过传递的 rules 返回的值, 例如 4 时候的数据，obj = {grade: value, ....},这样方便我们获取 key 以及 value 来进行接口参数组装以及传递

```javascript
this.validateOk((validate, obj) => {
  if (!validate) {
    console.log("校验未通过");
  } else {
    console.log(obj); // {grade: '123'}
  }
});
```

### 6.新增回到函数校验，需要手动注册 validator 函数，然后在我们的 rules 中进行传递，那么当我们输入或者其他操作的时候将会按照新的函数执行校验操作,具体代码如下

```javascript
validater(rules, value, calllback) {
  if (/111/.test(value)) {
    calllback("错误了你"); // 将会以此文案进行提示
  } else {
    calllback(); // 使用默认文案提示
  }
}
```

```javascript
rules: {
        test: {
          type: 'input', // 校验的组件类型
          label: 'test', // 与key需要保持一致
          labelName: '测试', // label显示的名称
          message: '请填写', // 校验触发的时候展示的文案
          value: '', // 默认传递的值
          validateStatus: false, // 默认需要传递false
          validator: this.validator
        }
      }
```
