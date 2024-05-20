import React from 'react'
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen'

const buttons = [
    { text: 'Продолжить', link: '/' },
  ];

export const RegistrationSuccess = () => {
  return (
      <TempleteScreen 
        headerText = {"Приветсвие"}  
        TextBlockText = {"Поздравляем, ваша регистрация завершена! Теперь вы можете начать управлять умными устройствами."} 
      >
        <ButtonGroup buttons={buttons}/>
      </TempleteScreen>

  )
}
