import React, {useState} from "react";
import * as S from "./style.jsx";
import ButtonPopup from "../../button/buttonPopup/ButtonPopup.jsx";
import InputPopup from "../../input/inputPopup/InputPopup.jsx";
import WarningPopup from "../../warning/warningPopup/WarningPopup.jsx";

function PopupEmailAuth(){

  const [isWarning, setIsWarning] = useState(false);

  return (
    <S.Wrapper>

      <S.InputWrapper>
        <InputPopup placeholder={"인증번호를 입력해주세요"}></InputPopup>
      </S.InputWrapper>

      <S.WarningWrapper>
        {isWarning &&
          <WarningPopup 
            message = {"⚠️ 인증번호가 일치하지 않습니다"}
          >
          </WarningPopup>
        }
      </S.WarningWrapper>

      <S.ButtonWrapper>
        <ButtonPopup 
          title={"인증하기"} 
          buttonRole={"important"} 
        >
        </ButtonPopup>

        <ButtonPopup 
          title={"다시하기"} 
          buttonRole={"normal"} 
        >
        </ButtonPopup>
      </S.ButtonWrapper>
      
    </S.Wrapper>
  );
}

export default PopupEmailAuth;