import React, { useState, useEffect } from "react";
import Pagination from './common/Pagination';
import { paginate } from './common/utils/paginate';
import axios from "axios";

// POST 요청 전송
const CouponPage = () => {

  // const apiEndpoint = "http://localhost:8080/api/coupon/list";
  // const getCoupons = async () => {
  //   // 백엔드로 보낼 데이터 생성
  //   const obj = { pageNo: '1', pageSize: '100' }; 
  //   // 백엔드로 데이터 전송. 이 때 새롭게 추가한 데이터에 대한 응답이 돌아옴
  //   const response = await axios.post(apiEndpoint, obj); 
  //   //console.log(response.data.couponList);
  //   return response.data.couponList;
  // }
  
  // const [counpons, setCoupons] = useState({ // 쿠폰 정보를 담는 state
  //   data: getCoupons(), // 쿠폰 정보
  //   pageSize: 5, // 한 페이지에 보여줄 아이템(쿠폰목록) 개수
  //   currentPage: 1 // 현재 활성화된 페이지 위치
  // });

  const [counpons, setCoupons] = useState({});

  const getCoupons = async () => {
    const apiEndpoint = "http://localhost:8080/api/coupon/list";
    const obj = { pageNo: '1', pageSize: '100' }; 
    await axios.post(apiEndpoint, obj).then(response => {
      const getData = response.data;
      setCoupons(response.data);
    });
  }
  getCoupons();
  console.log(counpons);
  
  const handlePageChange = (page) => {
    setCoupons({ ...counpons, currentPage: page });
  };

  const { couponList, pageSize, currentPage } = counpons;
  const pagedCoupons = paginate(couponList, currentPage, pageSize); // 페이지 별로 아이템이 속한 배열을 얻어옴

  const { length: count } = counpons.couponList;
  if (count === 0) 
    return <p>쿠폰 정보가 없습니다.</p>;

  return (
    <>
      <p>{count} 개의 쿠폰 정보가 있습니다.</p>

      <table className="table">
        <thead>
          <tr>
            <th>intCouponID</th>
            <th>strCouponNo</th>
            <th>strEmailAddr</th>
            <th>strRegDate</th>
          </tr>
        </thead>
        <tbody>
          {pagedCoupons.map((coupon) => (
            <tr key={coupon.intCouponID}>
              <td>{coupon.intCouponID}</td>
              <td>{coupon.strCouponNo}</td>
              <td>{coupon.strEmailAddr}</td>
              <td>{coupon.strRegDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageSize={pageSize}
        itemsCount={count}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CouponPage;