import React, { useState, useEffect } from "react";
import Pagination from './common/Pagination';
import { paginate } from './common/utils/paginate';
import axios from "axios";

const CouponPage = () => {
  const [counpons, setCoupons] = useState({ 
    couponList: "", 
    pageSize: 10, 
    currentPage: 1 
  });
  
  useEffect(() => {
    const apiurl = "http://localhost:8080/api/coupon/list";
    const object = { params: { pageNo:1, pageSize:10 } };
    axios
    .get(apiurl, object)
    .then(({ data }) => setCoupons(data));
  }, []);

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