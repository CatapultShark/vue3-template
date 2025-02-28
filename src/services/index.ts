import request from '@/utils/request';

export function handleTest(type: any) {
  return request.get('/api/paint/test', { params: { type } });
}

export function handleHttpRequest(path: string) {
  return request.post('/api/request', {
    path
  });
}

export function executeSql(sql: string) {
  return request.post('/api/sql', {
    select_query: sql
  });
}

export function joltTransformJSON(data: string) {
  return request.post('/api/transformJson', { transform: data });
}

export function convertAvroToJSON(data: any) {
  return request.post('/api/getJson', { json: data });
}

export function handleHttpResponse(response: any) {
  return request.post('/api/response', { response });
}

export function transform(data: any) {
  return request.post('/api/transform', data);
}
