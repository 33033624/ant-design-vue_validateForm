<template lang="html">
  <a-modal
    title="新增"
    v-model="modal"
    @ok="editHandleOk"
    @cancel="editHandleCancel"
    width="40%"
  >
    <a-form class="ant-advanced-search-form" :form="form">
      <a-row :gutter="20">
        <a-col :span="10">
          <validateFormItem
            :form="form"
            :valiateProps="rules['grade']"
            @validate="validateInput"
          />
          <validateFormItem
            :form="form"
            :valiateProps="rules['test']"
            @validate="validateInput"
          />
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
// 抽离的校验文件（必须与组件一起引入）
import { validateMixin } from "ant-design-vue_validateform";
export default {
  mixins: [validateMixin],
  data() {
    return {
      modal: true,
      rules: {
        // 规则以及数据
        grade: {
          type: "input",
          label: "grade",
          labelName: "年级",
          message: "请填写",
          value: ""
        },
        test: {
          type: "select",
          label: "test",
          labelName: "测试",
          message: "请选择",
          value: "",
          selectList: [
            {
              name: "测试选项1",
              value: 1
            },
            {
              name: "测试选项2",
              value: 2
            }
          ]
        }
      }
    };
  },
  methods: {
    // 编辑弹框确定
    editHandleOk(e) {
      // **提交按钮绑定事件
      this.validateOk((validate, obj) => {
        // validate 代表校验是否通过  返回true|| false  obj为根据传递的rules构造好的数据格式  obj = {grade: 1, test: 1}
        validate && this.$emit("add", obj["grade"]);
      });
    },
    editHandleCancel() {
      this.$emit("addModalController");
    }
  }
};
</script>

<style lang="scss">
.ant-advanced-search-form .ant-form-item {
  display: flex;
  margin-top: 15px;
}
</style>
