import request from '@/utils/request.js'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
