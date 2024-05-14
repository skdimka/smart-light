import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg';
import { INewDevices } from '../interfaces/devices.interface';
import AuthStore from "../../services/store"
import {Controller, useForm} from "react-hook-form";
import { Field } from "../components/field";
import { isValidInput } from "../components/isValidInput";
import { Link } from 'react-router-dom';
import { AuthService } from '../../services/api.auth';
import { Loader } from './loader';

import { useNavigate } from "react-router-dom";

type FieldValues = {
    name: string;
    type: string;
    roomId: string;
  }

interface DeviceProps {
    devices: INewDevices[];
    loader?:boolean;
}

export const DeviceList: React.FC<DeviceProps> = ({ devices, loader }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
        reset,
        control
      } = useForm<FieldValues>({ mode: "onChange" });
    
      const onSubmit = (data: FieldValues) => {
        AuthService.addNewDevice(data.name, data.type, data.roomId)
        navigate('/add-device-success');
        reset();
      };
      
    
  return (
<>
      {loader && <Loader/>}
      <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
        {devices?.map((device, index) => (
          <div className="container-add_device" key={index}>

            <div className="add_device device">
              <ReactSVG src={`/svg/${device.type}.svg`} className="device-svg" />
              <div className="device-name">{device.name}</div>
            </div>

            <div className="add-device-info">

              <Controller
                control={control}
                name="name"
                rules={{ required: true, validate: isValidInput.name }}
                render={({ field }) =>
                  <Field
                    value={field.value}
                    onChange={field.onChange}
                    label="Введите название устройства"
                    className={`add_device-name ${errors.name ? "input__error" : ""}`}
                    type="name"
                  />}
              />

              {errors.name && <span className="error-message">Минимальная длина - 2</span>}

              <input type="hidden" {...register("type")} value={device.type} />

              <Controller
                control={control}
                name="roomId"
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <select {...field}
                    className="add_device-room"
                  >
                    <option value="" disabled className="add_device-room-option">Комната</option>
                    {AuthStore.rooms.map((room) => (
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                  </select>
                )}
              />

            </div>

          </div>
        ))}
        <div className="buttonGroup">
          <button
            className="btn__primary"
            type="submit"
            // to={"/add-device-success"}
            disabled={!isDirty || !isValid}
          >
            Добавить
          </button>
        </div>
      </form>
    </>
  )
}