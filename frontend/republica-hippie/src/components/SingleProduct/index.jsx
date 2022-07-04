import React, { useState, useEffect } from "react";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import IconReturn from "../../assets/IconReturn.svg";
import IconLikeBlank from "../../assets/IconLikeBlank.svg";
import IconLikeFilled from "../../assets/IconLikeFilled.svg";
import { SliderData } from "./SliderData";
import RightArrow from "../../assets/arrow/RightArrow.svg";
import LeftArrow from "../../assets/arrow/LeftArrow.svg";
import { baseUrl, getProductsById } from "../../services/api";
import { toast } from "react-toastify"; 
import { useParams } from "react-router-dom";
import * as S from "./styled";
import style from "./style.css";

const SingleProduct = ({ slides }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductsById(id);
        setProduct(response.data);
      } catch (error) {
        toast.error(`Erro ao carregar o produto: ${error}`);
      }
    }
    loadProduct();
  }, [setProduct]);


  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const length = slides.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  
  const [like, setLike] = useState(false);

  return (
    <S.Container>
      <S.ReturnContainer>
        <S.Return onClick={() => navigate(-1)}>
          <S.Icon src={IconReturn}></S.Icon>
        </S.Return>
      </S.ReturnContainer>

      <S.LeftContainer>
        {/* Carousel */}
        <section className="slider">
          {SliderData.map((slide, index) => {
            return (
              <div
                className={`${
                  index === current ? "slide active" : "slide"
                } containerImg`}
                key={index}
              >
                {index === current && (
                  <img src={slide.image} alt="travel image" className="image" />
                )}
              </div>
            );
          })}
          <div className="arrow">
            <img src={LeftArrow} className="left-arrow" onClick={prevSlide} />
            <span className="sliderCounter">
              {current + 1} de {length}
            </span>
            <img src={RightArrow} className="right-arrow" onClick={nextSlide} />
          </div>
        </section>
        {/* Carousel */}

        <S.ProductText>{product.description}</S.ProductText>
      </S.LeftContainer>

      <S.RightContainer>
        <S.ProductTitle>{product.name}</S.ProductTitle>
        <S.ProductExpositor>
          Expositor:
          <S.LinkExpositor to="/"> {product.exhibitor?.name}</S.LinkExpositor>{/*MUDAR O LINK AO CRIAR PÁGINA DE EXPOSITOR*/}
        </S.ProductExpositor>

        <S.PriceLikeContainer>
          <S.Price>R$ {product.price?.replace(".", ",")}</S.Price>
          {like == false ? (
            <S.IconLike
              src={IconLikeBlank}
              onClick={() => setLike(true)}
            ></S.IconLike>
          ) : (
            <S.IconLike
              src={IconLikeFilled}
              onClick={() => setLike(false)}
            ></S.IconLike>
          )}
        </S.PriceLikeContainer>

        <S.BtnContainer>
          <S.BtnComprar>Comprar agora</S.BtnComprar>
          <S.BtnCarrinho>Adicionar ao carrinho</S.BtnCarrinho>
        </S.BtnContainer>

        <S.ProductDescription>
          <S.DescriptionButton title="Características">
            <Dropdown.ItemText>
              Tamanho: 7 cm de altura e 15 cm de comprimento
              <br /> Peso: 110 g
            </Dropdown.ItemText>
          </S.DescriptionButton>
          <S.DescriptionButton title="Materiais">
            <Dropdown.ItemText>
              Argila, porcelana, tinta acrílica
            </Dropdown.ItemText>
          </S.DescriptionButton>
          <S.DescriptionButton title="Observações">
            <Dropdown.ItemText>
              Produto frágil, manusear com cuidado. Recomendado limpar com um
              pano úmido. Usar coisas ásperas podem causar arranhões no produto
            </Dropdown.ItemText>
          </S.DescriptionButton>
        </S.ProductDescription>
      </S.RightContainer>
    </S.Container>
  );
};

export default SingleProduct;
