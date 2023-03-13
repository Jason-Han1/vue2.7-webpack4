export function MixinsResEntity() {
  const ResponseEntity = {};
  window.RE = ResponseEntity;

  // NODE自定义错误
  ResponseEntity.SUCCESS = {
    code: 0,
    message: '处理成功'
  };

  ResponseEntity.USER_NOT_LOGIN = {
    code: 401,
    message: '用户未登录异常'
  };

  ResponseEntity.VALIDATE_CODE_ERROR = {
    code: 402,
    message: '图形验证码输入错误'
  };

  ResponseEntity.FORM_VALIDATE_FAILED = {
    code: 422,
    message: '表单校验失败'
  };

  ResponseEntity.GLOBAL_ERROR = {
    code: 500,
    message: '系统异常'
  };

  ResponseEntity.MESSAGE_NOT_FOUND = {
    code: 900,
    message: '您查找的信息不存在'
  };

  ResponseEntity.REQUEST_ERROR = {
    code: 901,
    message: '错误的请求'
  };


  ResponseEntity.NO_AUTH = {
    code: 902,
    message: '非主帐号没有权限'
  };

  ResponseEntity.OP_FAIL = {
    code: 903,
    message: '操作失败'
  };

  // 与PHP业务同步状态码表
  ResponseEntity.USER_PHONE_NOT_FOUND_ERROR = {
    code: 1001,
    message: '您的手机没有注册过'
  };

  ResponseEntity.USER_NOT_FOUND_ERROR = {
    code: 1002,
    message: '用户名不存在'
  };

  ResponseEntity.USER_EXIST_ERROR = {
    code: 1004,
    message: '用户名已存在'
  };

  ResponseEntity.USER_OR_PASSWORD_ERROR = {
    code: 1005,
    message: '用户名或密码错误'
  };

  ResponseEntity.USER_PHONE_FAIL = {
    code: 1006,
    message: '用户手机号不一致'
  };

  ResponseEntity.USER_PWD_ERROR = {
    code: 1007,
    message: '原密码错误'
  };

  // 手机验证码
  ResponseEntity.MOBILE_VERICODE_PAST_ERROR = {
    code: 1010,
    message: '手机验证码错误或者已经过期'
  };

  ResponseEntity.MOBILE_VERICODE_SEND_FAIL = {
    code: 1011,
    message: '手机验证码发送失败'
  };

  ResponseEntity.MOBILE_VERICODE_SEND_EXIST = {
    code: 1012,
    message: '验证码已经发送，请耐心等待查收'
  };

  ResponseEntity.MOBILE_VERICODE_LIMIT_ERROR = {
    code: 1013,
    message: '手机验证码发送太频繁'
  };

  ResponseEntity.MOBILE_NOT_EXIT = {
    code: 1014,
    message: '手机号未注册'
  };

  // 认证
  ResponseEntity.USER_AUTH_STATUS = {
    code: 1020,
    message: '用户状态不符合'
  };

  ResponseEntity.AUTH_TIME_PASS = {
    code: 1024,
    message: '您尝试填写金额的次数已经超过'
  };

  ResponseEntity.PRICE_ERROR = {
    code: 1025,
    message: '1_您输入的金额不正确'
  };

  // 系统设置
  ResponseEntity.AUTH_SITE_NO_EXIST = {
    code: 1021,
    message: '无权授权此站点'
  };

  ResponseEntity.NOT_AUTH_OP_CHILD_ACOUNT = {
    code: 1022,
    message: '您没有权限操作此用户'
  };

  ResponseEntity.USER_NAME_NOT_CHANGE = {
    code: 1023,
    message: '用户名不能发生更改'
  };

  // 发票
  ResponseEntity.BASE_INVOICE = {
    code: 1030,
    message: '发票基本信息已存在'
  };

  ResponseEntity.MONEY_NOT_ENOUGH = {
    code: 1031,
    message: '金额不足'
  };

  ResponseEntity.LINKS_OVERFLOW = {
    code: 4001,
    message: '链接数量超限'
  };

  ResponseEntity.LIMIT_FILE_SIZE = {
    code: 4002,
    message: '文件大小超限'
  };
  ResponseEntity.LIMIT_PIC_MIME_TYPE = {
    code: 4003,
    message: '文件类型错误'
  };
}
