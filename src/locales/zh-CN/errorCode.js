export default {
  'app.custom.error.USERNAME_OR_PASSWORD_INCORRECT': '用户名或者密码不对，请检查！',
  'app.custom.error.INVALID_TOKEN': '会话过期，请重新登录',  // 鉴权出现错误，请检查请求 Token！
  'app.custom.error.UNAUTHORIZED': '用户没有权限，请重新登录',  // 鉴权出现错误，请检查请求 Token！
  'app.custom.error.Forbidden': '用户没有权限，请重新登录',  // 鉴权出现错误，请检查请求 Token！
  'app.custom.error.AUTH_EXCEPTION': '认证授权出错，请联系管理员！',
  'app.custom.error.SESSION_EXPIRED': '会话过期，请重新登录！',
  'app.custom.error.OLD_PASSWORD_INCORRECT': '原密码不正确，请重新输入',
  'app.custom.error.CREATE_LOGIN_NAME_ALREADY_EXIST': '用户名已经存在，请选择其他的用户名',
  'app.custom.error.INVALID_LICENSE': '该软件未激活，请联系管理员',
  'app.custom.error.Internal-Server-Error': '服务器有点不在状态，请刷新重试',  // 服务内部错误，请联系管理员(适用于CODE === 500)
  'app.custom.error.DELETE_STUDY_ERROR': '删除研究失败',  // (适用于删除study时 CODE === 500的情况)
  'app.custom.error.DEVICE_NAME_ALREADY_EXIST': '设备名称已存在，请修改',  // (适用于修改设备时时 CODE === 500的情况)
  'app.custom.error.TITLE_EXISTS': '模板名称已存在，请修改',  // (适用于修改知识库模板title时 CODE === 400的情况)
  'app.custom.error.USER_GROUP_NAME_EXISTS': '用户组名称已存在，请修改',  // (适用于修改用户组名时 CODE === 400的情况)
  'app.custom.error.ROOT_DIRECTORY_CANNOT_BE_EMPTY': '根目录不能为空',  // (适用于知识库管理-》导入模板 报错)
  'app.custom.error.FILE_IS_EMPTY': '文件不能为空',  // (适用于知识库管理-》导入模板 报错)
  'app.custom.error.IMAGING_FINDINGS_OR_DIAGNOSTIC_ADVICE_IS_EMPTY': '影像所见或建议不能为空',  // (适用于知识库管理-》导入模板 报错)
};
