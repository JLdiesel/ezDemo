export const REG_CONFIG = {
  telephone: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
  mobilePhone: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
  allPhone: /^[0-9]{8,12}$/,
  phone: /(^[1][2,3,4,5,6,7,8,9][0-9]{9}$)|(^0\d{2,3}-\d{6,8})|(^\d{6,8})/,
  qq: /[1-9][0-9]{4,14}/,
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  wechat: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
  name: / /,
  certificateNo: / /,
  netWork: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
  num: /^\d+$/,

  // 正整数
  positiveInteger: /^[0-9]+$/,

  // 验证正数、负数和小数
  number: /^(\-|\+)?\d+(\.\d+)?$/,
};

export default {
  mobilePhone(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.mobilePhone.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的手机号'));
    }

    return callback();
  },
  allPhone(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.allPhone.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的号码'));
    }

    return callback();
  },
  phone(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.phone.test(value)) {
        return callback();
      }

      return callback(new Error('请输入电正确的话号码'));
    }

    return callback();
  },
  qq(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.qq.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的QQ号'));
    }

    return callback();
  },
  email(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.email.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的邮箱'));
    }

    return callback();
  },
  wechat(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.wechat.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的微信号'));
    }

    return callback();
  },
  name(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.name.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的手机号'));
    }

    return callback();
  },
  certificateNo(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.certificateNo.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的证件号'));
    }

    return callback();
  },
  addr(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.addr.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的手机号'));
    }

    return callback();
  },
  netWork(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.netWork.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正确的网址'));
    }

    return callback();
  },
  num(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.num.test(value)) {
        return callback();
      }

      return callback(new Error('请输入数字'));
    }

    return callback();
  },
  positiveInteger(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.positiveInteger.test(value)) {
        return callback();
      }

      return callback(new Error('请输入正整数'));
    }

    return callback();
  },
  isPositiveInteger(val) {
    // if (!val) {
    //   return {
    //     type: false,
    //     message: '请输入一个小于24的正整数'
    //   }
    // }
    if (!REG_CONFIG.positiveInteger.test(val)) {
      return {
        type: false,
        message: '请输入一个小于24的正整数',
      };
    }
    if (parseInt(val) > 24) {
      return {
        type: false,
        message: '请输入一个小于24的正整数',
      };
    }

    return {
      type: true,
      message: '',
    };
  },

  // 验证正数、负数和小数
  number(rule, value, callback) {
    if (value) {
      if (REG_CONFIG.number.test(value)) {
        return callback();
      }

      return callback(new Error('请输入数字'));
    }

    return callback();
  },
};
