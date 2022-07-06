import React, { useState, useEffect } from "react";
import * as S from "./styled";
import foto from "../../assets/Rectangle 130.svg";
import { baseUrl, getExpositores } from "../../services/api";
import { toast } from "react-toastify";

const ExpositoresList = () => {
  const { expositores, setExpositores } = useState([]);

  useEffect(() => {
    const loadExpositores = async () => {
      try {
        const response = await getExpositores();
        setExpositores(response.data);
      } catch (error) {
        toast.warn(`Erro ao carregar expositores`);
      }
    };
    loadExpositores();
  }, [setExpositores]);

  console.log(`Expositores ${expositores}`);
  return (
    <S.ExpositoresContainer>
      <S.ImgContainer>
        <img src={foto} alt="Expositor" />
      </S.ImgContainer>

      <S.InfoExpositores>
        <S.TitleExpositores>expositores</S.TitleExpositores>
        <p>
          Pintor - Pintura em azulejos <br />
          76 anos
        </p>
        <p>
          Contato: (11) 91234-5678 <br />
          <S.LinkInfo to="/">Mais sobre José Carlos</S.LinkInfo>
        </p>
      </S.InfoExpositores>
    </S.ExpositoresContainer>
  );
};

export default ExpositoresList;
