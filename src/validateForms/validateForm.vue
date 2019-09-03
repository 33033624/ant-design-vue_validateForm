<template lang="html">
  <a-form-item :label="valiateProps['labelName']" :labelCol="{ span: 8 }">
    <a-input
      v-decorator="decorator"
      @input="changeValue"
      @blur="changeValue"
      v-if="valiateProps['type'] === 'input'"
    />
    <a-select
      v-decorator="decorator"
      placeholder="请选择"
      @change="changeValue"
      v-if="valiateProps['type'] === 'select'"
      :allowClear="true"
    >
      <a-select-option
        v-for="(i, k) in valiateProps['selectList']"
        :key="k"
        :value="i['value']"
      >
        {{ i["name"] }}
      </a-select-option>
    </a-select>
    <a-date-picker
      v-decorator="decorator"
      v-if="valiateProps['type'] === 'datePicker'"
      @change="changeValue"
    />
    <a-range-picker
      v-decorator="decorator"
      v-if="valiateProps['type'] === 'rangePicker'"
      @change="changeValue"
    />
    <a-checkbox-group
      v-decorator="decorator"
      v-if="valiateProps['type'] === 'checkboxGroup'"
      @change="changeValue"
    >
      <a-row>
        <a-col
          :span="8"
          v-for="(item, index) in valiateProps.selectList.length"
          :key="index"
        >
          <a-checkbox :value="valiateProps.selectList[index].value">
            {{ valiateProps.selectList[index].name }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </a-form-item>
</template>

<script>
export default {
  name: "ValidateForm",
  props: {
    valiateProps: {
      type: Object,
      default: () => {
        return {
          type: "input",
          label: "",
          labelName: "",
          message: "",
          value: "",
          selectList: [
            {
              name: "测试",
              value: "2"
            }
          ]
        };
      }
    },
    form: {
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      decorator: [],
      hideValidate: false
    };
  },
  watch: {
    valiateProps: {
      deep: true,
      handler(n, o) {
        this.hideValidate = false;
        this.$nextTick(() => {
          this.decorator = [
            n["label"],
            {
              initialValue: n["value"],
              rules: [{ required: true, message: n["message"] }]
            }
          ];

          this.hideValidate = true;
        });
      }
    }
  },
  // computed: {
  //   decorator() {
  //     return [
  //       this.valiateProps['label'],
  //       { initialValue: this.valiateProps['value'], rules: [{ required: true, message: this.valiateProps['message'] }] }
  //     ]
  //   }
  // },
  created() {
    this.decorator = [
      this.valiateProps["label"],
      {
        initialValue: this.valiateProps["value"],
        rules: [{ required: true, message: this.valiateProps["message"] }]
      }
    ];
  },
  mounted() {
    this.hideValidate = true;
    const {
      form: { validateFields }
    } = this;
    validateFields([this.valiateProps["label"]], (errors, values) => {
      let validateStatus = false;
      if (errors) {
        validateStatus = false;
      } else {
        validateStatus = true;
      }
      let value = "";
      if (this.valiateProps["type"] === "input") {
        value = this.valiateProps["value"];
      } else if (this.valiateProps["type"] === "select") {
        value = this.valiateProps["value"];
      } else if (this.valiateProps["type"] === "datePicker") {
        value = this.valiateProps["value"];
      } else if (this.valiateProps["type"] === "checkboxGroup") {
        value = this.valiateProps["value"];
      } else if (this.valiateProps["type"] === "rangePicker") {
        value = [this.valiateProps["value"][0], this.valiateProps["value"][1]];
      }
      this.$emit("validate", {
        validateStatus,
        name: this.valiateProps["label"],
        value
      });
    });
  },
  methods: {
    changeValue(e, dateString) {
      const {
        form: { validateFields }
      } = this;
      // console.log(e.target.value)
      window.setTimeout(() => {
        validateFields([this.valiateProps["label"]], (errors, values) => {
          let validateStatus = false;
          if (errors) {
            validateStatus = false;
          } else {
            validateStatus = true;
          }
          let value = "";
          if (this.valiateProps["type"] === "input") {
            value = e.target.value;
          } else if (this.valiateProps["type"] === "select") {
            value = e;
          } else if (this.valiateProps["type"] === "datePicker") {
            value = e;
          } else if (this.valiateProps["type"] === "checkboxGroup") {
            value = e;
          } else if (this.valiateProps["type"] === "rangePicker") {
            value = e;
          }
          this.$emit("validate", {
            validateStatus,
            name: this.valiateProps["label"],
            value
          });
        });
      }, 10);
    }
  }
};
</script>

<style lang="css" scoped></style>
