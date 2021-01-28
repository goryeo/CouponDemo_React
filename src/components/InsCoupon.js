import React, { useState, useEffect } from 'react';
import Joi, { validate } from "joi-browser";
import axios from "axios";

const InsCoupon = (props) => {
  const emailSchema = {
    strEmailAddr: Joi.string().email()
  };

  const [email, setEmail] = useState({
    strEmailAddr: ''
  });
  
  const inputRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
  };

  const handleChange = (e) => {
    // e.target.id: 변경이 일어난 input 태그의 id
    // e.target.value: 변경이 일어난 input 태그의 값
    const { id, value } = e.target;
    const errors = { ...email.errors };

    /* 입력받은 값 유효성 검증 */
    const obj = { [id]: value }; // 입력받은 값에 
    const schema = { [id]: emailSchema[id] }; // Joi 스키마를 적용하여
    const { error } = validate(obj, schema); // 유효성 검증

    if(error) errors[id] = error;
    else delete errors[id];

    /* 입력받은 email state 에 저장 */
    const data = email;
    data[id] = value; // 점(.) 표기법을 대괄호([]) 표기법으로 사용
    setEmail({ ...data, errors });
  };

  const buttonValidate = () => {
    const options = { abortEarly: false, allowUnknown:true };
    const { error } = Joi.validate(email, emailSchema, options);

    // 에러 미발생 시 null 반환
    if (!error) return null;

    // 에러 발생 시 에러 정보 반환
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  const handleClick = (e) => {
    e.preventDefault();
    const apiurl = "http://ec2-54-180-115-143.ap-northeast-2.compute.amazonaws.com:8080/api/coupon/create";
    const object = email;
    axios
    .post(apiurl, object)
    .then(function (response) {
        alert(response.data.message)
        //console.log(response.data);
        props.onPageUpdate();
        setEmail({ strEmailAddr: ""});
        inputRef.current.focus();
      })
      .catch(function (error) {
        alert(error)
        //console.log(error);
      });
  }
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="m-3">
      <br></br>
      <h1>Toy Project : Coupon Demo Page</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="EmailAddr">Email 을 입력해주세요.</label>{" "}
          {/* 이 label 태그는 아래 input 태그를 참조함  */}
          <input
            onChange={handleChange}
            id="strEmailAddr"
            type="text"
            className="form-control"
            placeholder="Email"
            value={email.strEmailAddr}
            ref={inputRef}
          />
        </div>
        <button 
          disabled={buttonValidate()}
          onClick={handleClick}
          className="btn btn-primary">Create Coupon</button>
      </form>
    </div>
  );
}

export default InsCoupon;