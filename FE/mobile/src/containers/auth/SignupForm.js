import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, signup } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = ({ history }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signup,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "signup",
        key: name,
        value,
      })
    );
  };

  //폼 등록 이벤트 핸들러

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      address,
      pw,
      pwConfirm,
      nickname,
      phone,
    } = form;

    //하나라도 비어있으면
    if (
      [
        email,
        address,
        pw,
        pwConfirm,
        nickname,
        phone,
      ].includes("")
    ) {
      setError("빈 칸을 모두 입력하세요.");
    }

    //비밀번호 불일치
    if (pw !== pwConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "signup", key: "pw", value: "" }));
      dispatch(
        changeField({ form: "signup", key: "pwConfirm", value: "" })
      );
      return;
    }
    dispatch(signup({ email, pw, nickname, address, phone }));

    //axios 요청
    axios.post('http://i8a208.p.ssafy.io:3000/account/signup', {
      email: email,
      pw: pw,
      nickname: nickname,
      phone: phone,
      address: address
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  //컴포넌트가 처음 랜더링될 때 form 을 초기화

  useEffect(() => {
    dispatch(initializeForm("signup"));
  }, [dispatch]);

  // 회원가입 성공/실패 처리

  // useEffect(() => {
  //   if (authError) {
  //     // 계정명이 이미 존재할 때
  //     if (authError.response.status === 409) {
  //       setError("이미 존재하는 계정입니다.");
  //       return;
  //     }

  //     //기타이유
  //     setError("회원가입 실패");
  //     return;
  //   }

  //   if (auth) {
  //     console.log("회원가입 성공");
  //     console.log(auth);
  //     dispatch(check());
  //   }
  // }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  // useEffect(() => {
  //   if (user) {
  //     console.log("check API 성공");
  //     console.log(user);
  //     navigate("/");
  //   }
  //   }
  ;

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default SignupForm;