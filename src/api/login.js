import service from "@/utils/request";


/**
 * 登录
 */
export function Login(data) {

  return service.request({
    method: "post",
    url: "/login",
    data
  })
}

/**
 * 获取登录验证码
 */
export function GetLoginSms(data) {

  return service.request({
    method: "post",
    url: "/getSms",
    data
  })
}

/**
 * 注册
 */
export function ReGister(data) {

  return service.request({
    method: "post",
    url: "/register",
    data
  })
}



