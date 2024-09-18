import React, { ReactNode, useEffect, useState } from 'react'
import Header  from '../components/headerTemplate'
import ImageScreen from '../components/imageScreen'
import TextBlock from '../components/textBlock'
import { IDevices } from '../components/devices'
import DeviceList from '../components/DeviceList'
interface TempleteScreenProps {
    headerText?: string;
    TextBlockHeading?: string;
    TextBlockText: string;
    showImage?: boolean;
    children?: ReactNode;
    loader?: boolean;
    devices?:IDevices[];
    theme?: 'gray' | 'light';
}

export const TempleteScreen : React.FC<TempleteScreenProps> = ({
    headerText, 
    TextBlockHeading, 
    TextBlockText, 
    showImage = true,
    children,
    loader,
    devices,
    theme 
} ) => {
  return (
    <div className={`container ${theme}`}>

    {headerText && <Header
      text={headerText}
      />}

    <div className="section">
       { showImage && <ImageScreen />}
      <TextBlock
        heading = {TextBlockHeading} 
        text = {TextBlockText} 
        />
    
    {( devices && <DeviceList devices={devices} loader={loader}/>)}

    </div>
    {children}
  </div>
  )
}
