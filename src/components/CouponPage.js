import React, { useState, useEffect } from "react";
import InsCoupon from './InsCoupon';
import Pagination from './common/Pagination';
import { paginate } from './common/utils/paginate';
import axios from "axios";

const CouponPage = () => {
  const [counpons, setCoupons] = useState({ 
    couponList: "", 
    pageSize: 10, 
    currentPage: 1 
  });
  
  const getCounponList = () =>{
    const apiurl = "http://localhost:8080/api/coupon/list";
    const object = { params: { pageNo:1, pageSize:10 } };
    axios
    .get(apiurl, object)
    .then(({ data }) => setCoupons(data));
  }

  useEffect(() => {
    getCounponList();
  }, []);

  const handlePageChange = (page) => {
    setCoupons({ ...counpons, currentPage: page });
  };

  const { couponList, pageSize, currentPage } = counpons;
  const pagedCoupons = paginate(couponList, currentPage, pageSize); // 페이지 별로 아이템이 속한 배열을 얻어옴
  const { length: count } = counpons.couponList;

  return (
    <>
      <InsCoupon
        onPageUpdate={getCounponList}
      />
      <div className="m-3">
      <p className="text-right font-weight-bold">Total : {count} 개</p>
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th>CouponID</th>
            <th>CouponNo</th>
            <th>EmailAddr</th>
            <th>RegDate</th>
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
      </div>
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