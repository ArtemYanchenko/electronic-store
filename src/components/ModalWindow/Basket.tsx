import React from 'react';
import styled from "styled-components";
import {GoodsType} from "../../Typisation";

type PropsType = {
    setModal:(modal:boolean)=>void
    goodsInBasket:GoodsType[]
    changeGoodsStatus:(goodId:string,inChecked:boolean)=>void
}

export const Basket = (props:PropsType) => {
    const onClickHandler =() => {
        props.setModal(false)
    }
    return (
        <WrapperModal>
            <ListModal>
                <ul>
                {props.goodsInBasket.map(b=>{
                    const onClickHandler = (goodId:string) => {
                        props.changeGoodsStatus(b.id,!b.inCart);
                    }
                    return (
                            <li key={b.id}>

                                <span>{b.title} - </span>
                                <span>{b.realPrice}</span>
                                <button className={'btnRemoveItem'} style={{backgroundColor: 'red'}} onClick={()=>onClickHandler(b.id)}>X</button>
                            </li>
                    )
                })}
                </ul>
                <div>
                    <span>Final Price:</span>
                    <span>{props.goodsInBasket.reduce((previousValue, current) => previousValue + Number(current.realPrice.slice(1)), 0)}</span>
                </div>
                <button className={'btnRemoveModal'} onClick={onClickHandler}>X</button>
            </ListModal>
        </WrapperModal>
    );
};

const WrapperModal = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.63);

`

const ListModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  background: rgba(0, 0, 0, 0.77);
  color: white;

  .btnRemoveModal {
    position: absolute;
    top: 0;
    right: 0;
    background: brown;
    color: white;
    border: 0;
    cursor: pointer;
  }

`