import request from "../request";
export function Login(obj) {
  return request.post("/singleReg/wechat-check?", obj);
}
