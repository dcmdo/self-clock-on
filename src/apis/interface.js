import http from './http.js'

// 定义接口

// 在这里定义了一个登陆的接口，把登陆的接口暴露出去给组件使用
export const Login = params => http('get', '/sys/login/doLogin', {
  user: params.user,
  pwd: params.pwd,
  sys_type: 6,
  sso_type: 0
});

export const ClockIn = params => http('get', '/clockin/getPersonDetailedClockInInfo', {
  bureau_id: params.bureau_id,
  person_id: params.person_id,
  year: params.year,
  month: params.month
});
