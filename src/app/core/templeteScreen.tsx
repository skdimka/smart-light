import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/headerScreen'
import ImageScreen from '../components/imageScreen'
import TextBlock from '../components/textBlock'
import { ReactSVG } from 'react-svg'
import { INewDevices } from '../interfaces/devices.interface'
import { DeviceList } from '../components/DeviceList'
import { Loader } from '../components/loader'


interface TempleteScreenProps {
    headerText?: string;
    TextBlockHeading?: string;
    TextBlockText: string;
    showImage?: boolean;
    children?: ReactNode;
    loader?: boolean;
    devices?:INewDevices[];
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
    <div className={"container" && theme}>
    {headerText && <Header
      text={headerText}
      />}

    <div className="section">
      {showImage && <ImageScreen theme={theme || 'gray'}/>}
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
