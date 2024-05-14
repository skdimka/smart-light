import React from 'react'
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen'

export const AddDeviceSuccess = () => {
    const buttons = [
        { text: 'Вернуться на главную', link: '/' },
      ];

  return (
    <TempleteScreen 
        headerText = {"Добавить устройство"}  
        TextBlockText = {"Устройство «Моя любимая лампочка» успешно добавлено!"} 
      >
      <ButtonGroup buttons={buttons}/>
    </TempleteScreen>
  )
}
