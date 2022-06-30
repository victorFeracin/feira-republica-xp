import React from "react";
import * as S from "./styled";

const PageIntro = (props) => {
  return (
    <>
      <S.IntroSection>
        <S.TitleContainer>
          <img src={props.titleIcon} alt='Icon cerâmica' />
          <S.Title>{props.title}</S.Title>
          <img src={props.titleIcon} alt='Icon cerâmica' />
        </S.TitleContainer>
          
        <S.TitleContent>{props.introContent}</S.TitleContent>
      </S.IntroSection>
    </>
  );
}

export default PageIntro;