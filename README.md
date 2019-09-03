# ant-design-vue_validateForm
简介：基于ant-desing-vue的表单校验复杂度进行封装简化（目前只支持非空校验）

# 安装
npm install ant-desing-vue_validateform --save

# 使用

### 1.首先引入mixin并且使用
```javascript
 import { validateMixin } from "ant-design-vue_validateform";
 export default {
  mixins: [validateMixin]
  }
```
### 2.其次赋值form给当前引用组件的form元素（ant-design-vue_validateform中已经注册了form,直接用就可以）

```javascript
 <a-form class="ant-advanced-search-form" :form="form">
```

### 3.使用校验表单组件(其中validateInput和form均以存在不需要重新注册)
```javascript
  <validateFormItem
    :form="form"
    :valiateProps="rules"
    @validate="validateInput"
  />
```
          
### 4.data中注册rules， type类型为input|| select || datePicker || rangePicker || checkboxGroup，rules中的每一项的key必须与内部的label保持一致
```javascript
rules: {
        grade: {
          type: 'input', // 校验的组件类型
          label: 'grade', // 与key需要保持一致
          labelName: '年级', // label显示的名称
          message: '请填写', // 校验触发的时候展示的文案
          value: '', // 默认传递的值
          validateStatus: false // 默认需要传递false
        }
      }
```
        
### 5.获取校验后的数据, this.validateOk是我们插件中已经注册号的方法，直接使用后会返回两个回调参数 validate是校验结果，obj是通过传递的rules返回的值, 例如4时候的数据，obj = {grade: value, ....},这样方便我们获取key以及value来进行接口参数组装以及传递
```javascript
 this.validateOk((validate, obj) => {
    if (!validate) {
      return this.$message.error('请将信息填写完整')
    }
    validate && this.$emit('add', obj['grade'])
  })
  ```
