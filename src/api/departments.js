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
/**
 * 编辑部门
 * @param {*} data
 * @returns
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
/**
 * 删除
 * @param {*} id
 * @returns
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'

  })
}
