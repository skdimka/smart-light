import { action } from 'mobx';
import React from 'react'
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen'
import AuthStore  from "../../services/store"

const buttons = [
    { text: 'Продолжить', link: '/' },
  ];

export const RegistrationSuccess = () => {

  // action(() => {
  //   AuthStore.setAuth(true);
  // })();
  
  return (
      <TempleteScreen 
        headerText = {"Приветсвие"}  
        TextBlockText = {"Поздравляем, ваша регистрация завершена! Теперь вы можете начать управлять умными устройствами."} 
      >
        <ButtonGroup buttons={buttons}/>
      </TempleteScreen>

  )
}
