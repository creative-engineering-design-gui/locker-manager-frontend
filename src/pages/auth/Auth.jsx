import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/loginHook.jsx"
import axios from "../../api/axios.js";
import * as S from "./style.jsx";
import InputLogin from "../../components/input/InputLogin/InputLogin.jsx";
import ButtonLogin from "../../components/button/buttonLogin/ButtonLogin.jsx";
import WarningPopup from "../../components/warning/warningPopup/WarningPopup.jsx";

function Auth(){
  const [isWarning, setIsWarning] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async(studentId, password) => {
    try{
      const response = await axios.post("/auth/login", {
        school_number : studentId,
        password : password
      });

      if (response.status === 200){
        localStorage.setItem('user', JSON.stringify(response.data.response.body));
        login(response.data.response.body.token.access_token);
        navigate('/');
        
        if (response.data.response.body.is_first_login === true) {
          alert("최초 로그인 감지됨.");
        }
      }
    } catch(error) {
      console.log(error);
      setIsWarning(true);
    }

  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/');
    }
  });

  const handleCheckboxChange = () => {

    setIsChecked(!isChecked);

  }

  

  return(
    <S.Wrapper>

        <S.TitleWrapper>
          <S.Title>로그인</S.Title>
        </S.TitleWrapper>

      <S.ContentWrapper>
        <S.InputWrapper>
          <InputLogin 
            placeholder="학번을 입력해주세요" 
            type="text"
            value={studentId}
            isWarning = {isWarning}
            onChange={(e) => {
              setStudentId(e.target.value);
            }}
            />
          <InputLogin 
            placeholder="비밀번호를 입력해주세요" 
            type="password"
            value={password}
            isWarning = {isWarning}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            />
        </S.InputWrapper>

        <S.UtilWrapper>
          <S.UtilSaveWrapper>
            <S.UtilSave
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            ></S.UtilSave>

            <S.UtilSaveText
              onClick={handleCheckboxChange}
            >로그인 저장</S.UtilSaveText>
          </S.UtilSaveWrapper>

          <S.UtilFindWrapper>
            <S.UtilFind>
              비밀번호 찾기
            </S.UtilFind>
          </S.UtilFindWrapper>
        </S.UtilWrapper>

        <S.WarningWrapper>
          <WarningPopup
            message = {isWarning ? "⚠️ 사용자 정보가 일치하지 않습니다" : "💡 초기 비밀번호는 전화번호 8자리 입니다." }
          />
        </S.WarningWrapper>

        <S.ButtonWrapper>
          <ButtonLogin 
            title="로그인" buttonRole="important"
            onClick={() => {
              handleLogin(studentId, password);
            }}
          />
        </S.ButtonWrapper>

      </S.ContentWrapper>
    </S.Wrapper>
    
  )
}

export default Auth;