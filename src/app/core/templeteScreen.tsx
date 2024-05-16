import React, { ReactNode } from 'react'
import { Header } from '../components/headerTemplate'
import ImageScreen from '../components/imageScreen'
import TextBlock from '../components/textBlock'
import { INewDevices } from '../interfaces/devices.interface'
import { DeviceList } from '../components/DeviceList'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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
    <div className={`container ${theme}`}>

    {headerText && <Header
      text={headerText}
      />}

    <div className="section">
       { showImage && <ImageScreen theme={theme || 'gray'}/>}
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
