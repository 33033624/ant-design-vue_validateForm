export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  components: {
    validateFormItem: () => import('./validateForm')
  },
  methods: {
    // 时时刷新rules
    validateInput(opts) {
      const { validateStatus, value, name } = opts
      this.rules[name]['value'] = value
      this.rules[name]['validateStatus'] = validateStatus
    },
    // 是否可以校验通过
    validateOk(callback) {
      let validate = true
      let validateObj = {}
      Object.keys(this.rules).map(i => {
        if (!this.rules[i]['validateStatus']) {
          validate = false
          validateObj[i] = this.rules[i]['value']
        } else {
          validateObj[i] = this.rules[i]['value']
        }
      })
      callback(validate, validateObj)
    }
  }
}
