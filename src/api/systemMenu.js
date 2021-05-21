import service from "@/utils/request";

export function AddsystemMenu(data) {

  return service.request({
    method: "post",
    url: "/addSystemMenu",
    data
  })
}

export function QuerySystemMenu(data) {

  return service.request({
    method: "post",
    url: "/querySystemMenu",
    data
  })
}