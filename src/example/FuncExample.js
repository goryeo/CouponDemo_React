import React, { useEffect, useState } from 'react';

/*
1.hook의 탄생 sebastian markbage 가 props state 제어하는 함수형 컴포넌트 제안
=> 리액트팀이 아이디어를 참고하여 안전성 검증 후 완성
2.hook이란? 기존의 클래스로 관리되던 컴포넌트를 function을 통해 만들 수 있도록 제공해주는 API
3.useState()  => state 관리
4.useEffect() => lifecycle 관리(componentDidMount, componentDidUpdate)
5.hook의 장점
 1)가독성 : this, render(), state설정 등
 2)재사용성 : useEffect() 활용
 3)단위테스트/디버깅에 용의함
 => state를 관리하는 로직들을 각 state 별로 나뉘어 관리하고 변경
*/

function FuncExample() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const updateValue = (e) =>{
    const {
        target : {value}
    } = e;
    setName(value);
  }

  useEffect(() => {
    document.title = count;
    console.log(name);
  })

  return (
    <div><br></br>
      <h1>Function Style</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
      Increament Click me
      </button>
      &nbsp;
      <button onClick={() => setCount(count - 1)}>
      Decrement Click me
      </button>
      &nbsp;
      <input placeholder="Name" value={name} onChange={updateValue}></input>
    </div>
  );
}

export default FuncExample;