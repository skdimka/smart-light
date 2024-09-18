import React from 'react'
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen'
import AuthStore from "../store/store"

const buttons = [
  { text: 'Вернуться на главную', link: '/' },
];

export const AddDeviceSuccess = () => {
  const name = AuthStore.lastAddedDeviceName;

  return (
    <TempleteScreen 
        headerText = {"Добавить устройство"}  
        TextBlockText = {`Устройство «${name}» успешно добавлено!`} 
      >
      <ButtonGroup buttons={buttons}/>
    </TempleteScreen>
  )
}
