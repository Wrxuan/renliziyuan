import request from '@/utils/request'

export function login(data) {
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getEmpoyeesInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

export const saveUserDetailById = (data) => request({
  url: `/sys/user/${data.id}`,
  method: 'put',
  data
})
