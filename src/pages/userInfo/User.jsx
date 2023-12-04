import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/context.jsx";
import useAuth from "../../hooks/loginHook.jsx";
import axios from "../../api/axios.js";
import * as S from "./style.jsx";
import WarningInfo from "../../components/warning/warningInfo/WarningInfo.jsx";
import { useNavigate } from "react-router-dom";


function User(){

  const { user } = useContext(UserContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isCheckedEmail, setIsCheckedEmail] = useState(true);
  const [isCheckedPhone, setIsCheckedPhone] = useState(true);
  const [isCheckedAlarm, setIsCheckedAlarm] = useState(user.is_push_alarm);

  const handleCheckedChangeEmail = () => {

    setIsCheckedEmail(!isCheckedEmail);

  }

  const handleCheckedChangePhone = async() => {
    setIsCheckedPhone(!isCheckedPhone)
  }

  const handleCheckbox = async() => {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.put('/accounts/push-alarm',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      setIsCheckedAlarm(!isCheckedAlarm);
    }catch(error){
      console.error(error);
    }

  }

  useEffect(() => {
    if(!localStorage.getItem('token')){
      alert("비정상적인 접근입니다.");
      navigate('/auth');
    }
    if(user.name === undefined){
      logout();
      navigate('/auth');
    }
  },[]);

  return(
    <S.Wrapper>
      <WarningInfo message={"개인"}/>

      <S.InvalidInfoWrapper>

        <S.InfoWrapper>
          <S.InfoTitle>- 이름</S.InfoTitle>
          <S.InfoInputWrapper>
            <S.InvalidInfoInput disabled = {true} placeholder={user.name}></S.InvalidInfoInput>
          </S.InfoInputWrapper>
        </S.InfoWrapper>

        <S.InfoWrapper>
          <S.InfoTitle>- 학번</S.InfoTitle>
          <S.InfoInputWrapper>
            <S.InvalidInfoInput disabled = {true} placeholder={user.school_number}></S.InvalidInfoInput>
          </S.InfoInputWrapper>
        </S.InfoWrapper>

        <S.InfoWrapper>
          <S.InfoTitle>- 학부/학과</S.InfoTitle>
          <S.InfoInputWrapper>
            <S.InvalidInfoInput disabled = {true} placeholder={"컴퓨터학부"}></S.InvalidInfoInput>
          </S.InfoInputWrapper>
        </S.InfoWrapper>

      </S.InvalidInfoWrapper>

      <S.ValidInfoWrapper>

        <S.InfoWrapper>
          <S.InfoTitle>- 전화번호</S.InfoTitle>
          <S.InfoInputWrapper>
            <S.validInfoInput disabled = {true} placeholder={user.phone_number}
            ></S.validInfoInput>
            <S.changeButton
              onClick={handleCheckedChangePhone}
              button = {isCheckedPhone}
            >변경</S.changeButton>
          </S.InfoInputWrapper>
        </S.InfoWrapper>

        <S.InfoWrapper style={{marginBottom: "4%"}}>
          <S.InfoTitle>- 이메일</S.InfoTitle>
          <S.InfoInputWrapper>
            <S.validInfoInput disabled={true} placeholder={user.email}
            ></S.validInfoInput>
            <S.changeButton
              onClick={handleCheckedChangeEmail}
            >변경</S.changeButton>
          </S.InfoInputWrapper>
        </S.InfoWrapper>

        <S.CheckboxWrapper>
          <S.Checkbox 
            type="checkbox"
            checked={isCheckedAlarm}
            onChange={handleCheckbox}
          />
          <S.CheckboxText
            onClick={handleCheckbox}
          >
            이메일 푸시 알림에 동의합니다.
          </S.CheckboxText>
        </S.CheckboxWrapper>

        <S.InfoWrapper>
          <S.InfoTitle>- 비밀번호</S.InfoTitle>
          <S.InfoInputWrapper>
            <S.validInfoInput disabled = {true} placeholder={"**********"} type="password"></S.validInfoInput>
            <S.changeButton>변경</S.changeButton>
          </S.InfoInputWrapper>
        </S.InfoWrapper>

      </S.ValidInfoWrapper>
      
    </S.Wrapper>
  );

}

export default User;