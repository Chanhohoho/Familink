import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import { setFamilyAccess, setFamilyRefresh } from '../../modules/user'
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { SET_TOKEN } from "../../store/Auth";
// import { setRefreshToken } from "../../storage/Cookie";
// import { loginUser } from "../../lib/api/users";

const LoginForm = ({ history }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user, fatoken, } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
    fatoken: user.fatoken,
  }));

//   const onValid = async({ email, pw}) => {
//     setValue("pw","");
    
//     const response = await loginUser({ email, pw});
    
//   if (response.status) {
//     setRefreshToken(response.json.refresh_token);
//     dispatch(SET_TOKEN(response.json.access_token));

//     return navigate("/");
//   } else {
//     console.log(response.json);
//   }
// }
//인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  //폼 등록 이벤트 핸들러

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, pw } = form;
    dispatch(login({ email, pw }));
    
    if (
      [
        email,
        pw,
      ].includes("")
    ) {
      setError("빈 칸을 모두 입력하세요.");
    }

  //axios 요청
    axios.post('http://i8a208.p.ssafy.io:3000/account/login', {
      email: email,
      pw: pw,
    }).then((res) => {
      console.log(res)
      dispatch(setFamilyAccess(res.data['access-token']))
      if(res.data['result']) {
        navigate('/')
      }
    }).catch((err) => {
      console.log(err)
    })
  };

  //컴포넌트가 처음 랜더링될 때 form 을 초기화

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);


  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
