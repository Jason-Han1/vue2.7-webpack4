import request from '@/utils/http';
export function deleteTest(id) {
  return request({
    method: 'delete',
    url: `api/test/${id}`,
  });
}
export function editTest(id, data) {
  return request({
    method: 'put',
    url: `api/test/${id}`,
    data
  });
}
export function createTest(id, data) {
  return request({
    method: 'post',
    url: `api/test/${id}`,
    data
  });
}
export function getTest(id, query) {
  return request({
    method: 'get',
    url: `api/test/${id}`,
    params: {
      ...query
    }
  });
}