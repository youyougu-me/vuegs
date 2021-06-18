import service from "@/utils/request";

export function QueryAllPerson(data) {

  return service.request({
    method: "post",
    url: "/queryAllPerson",
    data
  })
}