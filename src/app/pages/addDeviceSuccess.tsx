import React from 'react'
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen'
import AuthStore from "../../services/store"

export const AddDeviceSuccess = () => {
  const name = AuthStore.lastAddedDeviceName;

  const buttons = [
      { text: 'Вернуться на главную', link: '/' },
    ];

  return (
    <TempleteScreen 
        headerText = {"Добавить устройство"}  
        TextBlockText = {`Устройство «${name}» успешно добавлено!`} 
      >
      <ButtonGroup buttons={buttons}/>
    </TempleteScreen>
  )
}
