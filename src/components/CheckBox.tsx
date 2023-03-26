import React, {ChangeEvent} from 'react';
type PropsType={
    checked:boolean
    callBack:(e:ChangeEvent<HTMLInputElement>)=>void
}
const CheckBox = (props:PropsType) => {
    return (
        <input type={'checkbox'} checked={props.checked} onChange={props.callBack}/>
    );
};

export default CheckBox;