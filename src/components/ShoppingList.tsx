import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {ShoppingListPropsType} from "../Typisation";
import Input from "./Input";
import CheckBox from "./CheckBox";
import styled from "styled-components";

export const ShoppingList = (props: ShoppingListPropsType) => {

    const mappedGoods = props.goods.map((el, index) => {

        const changeGoodsStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeGoodsStatus(el.id, e.currentTarget.checked)
        }

        const expectedPriceToNumber = Number(el.expectedPrice.replace('$', '')) // '$5'(какое-то значнение expectedPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после replace) -> 5(конечный результат после Number)
        const realPriceToNumber = +el.realPrice.slice(1) /// '$5'(какое-то значнение realPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после splice(1)) -> 5(конечный результат унарного плюса - +)
        const styleForPrice = expectedPriceToNumber >= realPriceToNumber ? 'goodPrice' : 'badPrice';

        return (
            <li key={el.id} className={el.inCart ? 'inCart' : ''}>
                <div className="topLi">
                    <b>{el.title}</b>
                    <DelBtn onClick={() => props.deleteGoods(el.id)}>x</DelBtn>
                </div>
                <BoxLi>

                </BoxLi>
                <div className={styleForPrice}>expected price: {el.expectedPrice}</div>
                <div className={styleForPrice}>real price: {el.realPrice}</div>
                <span>in cart: </span>
                <CheckBox checked={el.inCart} callBack={changeGoodsStatusOnChangeHandler}/>
            </li>
        )
    })

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean | string>(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addGoodsOnClickHandler = () => {
        if (title.trim() !== '') {
            props.addGoods(title.trim())
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }

    const addGoodsOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' ) {
            if (title.trim() !== '') {
                props.addGoods(title)
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }

    const sumOfGoodsInCart = props.goods
        .filter(el => el.inCart === true)
        .reduce((previousValue, current) => previousValue + Number(current.realPrice.slice(1)), 0);

    return (
        <List>
            <h3>{props.title}</h3>
            <div>
                <BoxInput>
                    <Input title={title} callBack={onChangeInputHandler} onKeyDown={addGoodsOnKeyDownHandler}/>
                    <button
                        onClick={addGoodsOnClickHandler}
                        disabled={title.trim() === '' || title.length > 15}>
                        add
                    </button>
                </BoxInput>

                {error && <RedText >{error}</RedText>}
                {title.length > 15 && <div>
                    The length is more than 15 letters.<br/>
                    Current length - <strong>{title.length}</strong>
                </div>}
                {sumOfGoodsInCart
                    ? <div>Sum of items in the cart - <strong>{sumOfGoodsInCart}</strong></div>
                    : <div>Please add item in the cart</div>
                }
            </div>
            <StUl>
                {mappedGoods}
            </StUl>
            <BtnBox>
                <button className={props.filter === "All" ? "activeButton" : ""}
                        onClick={() => props.changeFilterValue("All")} disabled={props.filter === "All"}>All
                </button>
                <button className={props.filter === "Not to buy" ? "activeButton" : ""}
                        onClick={() => props.changeFilterValue("Not to buy")}
                        disabled={props.filter === "Not to buy"}>Not to buy
                </button>
                <button className={props.filter === "Bought" ? "activeButton" : ""}
                        onClick={() => props.changeFilterValue("Bought")}
                        disabled={props.filter === "Bought"}>Bought
                </button>
            </BtnBox>
        </List>
    )
}
const RedText = styled.div`
  color: red;
`;

const List = styled.div`
  width: 300px;
  margin: 10px;
  background: rgba(0, 0, 0, 0.49);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px black;
  color: white;
`
const StUl = styled.ul`
  height: 400px;
  overflow: auto;
  box-shadow: inset 0px 0px 5px black;
  padding: 10px;
  /*добавим фон*/

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: inset 0 0 2.5px 2px rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #48000a, #00ffff, #48000a);
    border-radius: 15px;
  }

  li {
    list-style-type: none;
    background: #003B3D;

    .topLi {
      display: flex;
      justify-content: space-between;
      background: black;
    }
  }
`
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  background: black;

  button {
    width: 100px;
    height: 30px;
    cursor: pointer;
    border: 0;
    color: white;
    background: #000000;
  }

  .activeButton {
    background: brown;
  }
`

const DelBtn = styled.button`
  background: brown;
  border: 0;
  color: white;
  cursor: pointer;
`

const BoxLi = styled.div`
  
`

const BoxInput = styled.div`
  input{
    width: 80%;
    height: 24px;
  }
  button{
    width: 16%;
    background: brown;
    color: white;
    border: 0;
    height: 30px;
    cursor: pointer;
  }
  
`