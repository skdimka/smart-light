import React from 'react';
import ButtonGroup from '../components/buttonGroup';
import { TempleteScreen } from '../core/templeteScreen';

const buttons = [
    { text: 'Войти', link: '/auth/sign-in' },
    { text: 'Регистрация', link: '/auth/sign-up', className: "btn__secondary" },
  ];

export const StartScreen = () => {
  return (
        <TempleteScreen 
          TextBlockHeading = {"Умные устройства в каждый дом"}
          TextBlockText = {"Приложение-помощник в работе со смарт-устройствами"} 
          theme = {'light'}
        >
          <ButtonGroup buttons={buttons}/>
        </TempleteScreen>
  );
};
