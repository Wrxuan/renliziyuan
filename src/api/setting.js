import request from '@/utils/request.js'

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

export function upaddRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
