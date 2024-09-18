import React from 'react'
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen'

const buttons = [
  { text: 'Включить Bluetooth', link: '/add-device-bluetooth' },
];

export const AddDevice = () => {
  return (
    <TempleteScreen 
        headerText = {"Добавить устройство"}  
        TextBlockText = {"Для подключения устройства необходимо включить Bluetooth на вашем смартфоне, чтобы обнаружить устройство"} 
        theme = {'gray'}
    >
      <ButtonGroup buttons={buttons}/>
    </TempleteScreen>
  )
}