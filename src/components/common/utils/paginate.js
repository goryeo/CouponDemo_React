import _ from 'lodash';

export function paginate(items, pageSize, pageNumber) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점
  //startIndex = (2 - 1) * 10 = 10
  //pagesize = 10
  //10~20

  return _(items)
    .slice(startIndex) // 시작점부터 배열을 자르되
    .take(pageSize) // pageSize만큼의 배열을 취함
    .value(); // lodash wrapper 객체를 regular 배열로 변환
}