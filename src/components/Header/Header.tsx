import styled from "styled-components";
import logo from '../../img/logo.jpg';
import basket from '../../img/basket.png'
import Button from "../Button";
import {GoodsType} from '../../Typisation';

type PropsType = {
    goodsInBasket:GoodsType[]
    setModal:(modal:boolean)=>void
}

export const Header = (props:PropsType) =>{
    const openBasket = () =>{
        props.setModal(true)
    }
    return(
        <StHeader>
            <Logo src={logo} alt="logoImg"/>
            <StTitle>Samurai will help</StTitle>
            <Button callBack={openBasket} img={basket} countBasket={props.goodsInBasket.length}/>
        </StHeader>
    )
}

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px 10px;
`
const Logo = styled.img`
  border-radius: 5px;
  width: 40px;
`
const StTitle = styled.h3`
  margin: 0;
  color: white;
`