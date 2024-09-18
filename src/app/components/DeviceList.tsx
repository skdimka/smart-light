import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import AuthStore from "../store/store";
import { Controller, useForm } from "react-hook-form";
import { Field } from "../components/field";
import { isValidInput } from "../utils/isValidInput";
import Loader from "./loader";
import { IDevices } from "../components/devices";

type FieldValues = {
  name: string;
  type: string;
  roomId: string;
};

interface DeviceProps {
  devices: IDevices[];
  loader?: boolean;
}

const DeviceList: React.FC<DeviceProps> = ({ devices, loader }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
    control,
  } = useForm<FieldValues>({ mode: "onChange" });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loaderScreen, setLoaderScreen] = useState<boolean>(false);

  const onSubmit = async (data: FieldValues) => {
    setLoaderScreen(true);
    const error = await AuthStore.addNewDevice(
      data.name,
      data.type,
      data.roomId
    );
    if (error) {
      setErrorMessage("Ошибка добавления");
    } else {
      setErrorMessage(null);
      reset();
    }
    setLoaderScreen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
        {loaderScreen ? (
          <Loader />
        ) : loader ? (
          <Loader />
        ) : (
          <>
            {devices?.map((device, index) => (
              <div className="device-list__item" key={index}>
                <div className="device-list__info device">
                  <ReactSVG
                    src={`/svg/${device.type}.svg`}
                    className="device-svg"
                  />
                  <div className="device-list__name device-name">
                    {device.name}
                  </div>
                </div>
                <div className="device-list__form">
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: true, validate: isValidInput.name }}
                    render={({ field }) => (
                      <Field
                        value={field.value}
                        onChange={field.onChange}
                        label="Введите название устройства"
                        className={`device-list__input ${
                          errors.name ? "device-list__input-error" : ""
                        }`}
                        type="name"
                      />
                    )}
                  />

                  {errors.name && (
                    <span className="device-list__error-message">
                      Минимальная длина - 2
                    </span>
                  )}

                  <input
                    type="hidden"
                    {...register("type")}
                    value={device.type}
                  />

                  <Controller
                    control={control}
                    name="roomId"
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field} className="device-list__select">
                        <option
                          value=""
                          disabled
                          className="device-list__option"
                        >
                          Комната
                        </option>
                        {AuthStore.rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />

                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
        <div className="button-group">
          <button
            className="btn__primary"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Добавить
          </button>
        </div>
      </form>
    </>
  );
};

export default DeviceList;
