"use client";

import React, { useState, useEffect } from "react";
import { SystemType } from "m/systemType";
import useStorage from "h/useStorage";
import "./request_system_type.css";

interface IConfigurationProps {}

interface initState {
  systentype: SystemType;
  pass: string;
}

const key = "systemType";

export default function RequestSystemType() {
  const init = { systemtype: SystemType.client, pass: "" };

  const [getData, setData] = useStorage();
  const [show, setShow] = useState(getData(key));
  const [state, setState] = useState(init);

  const handleClick = () => {
    const _obj = { systemtype: state.systemtype };
    setShow(_obj);
    setData(key, _obj);
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === key) {
      const _value: SystemType =
        value == SystemType.client ? SystemType.client : SystemType.checkout;

      setState(prev => {
        return { ...prev, systemtype: _value };
      });
    } else if (name === "password") {
      setState(prev => {
        return { ...prev, pass: value };
      });
    }
  };

  return (
    <>
      {!!show ?? (
        <div className='systemType-windows'>
          <div className='systemType-content'>
            <label className='systemType-title'>System Type</label>

            <div className='systemType-container'>
              <div>
                <div className='radio-container'>
                  <input
                    type='radio'
                    onChange={handleChange}
                    checked={!!!state.systemtype}
                    name={key}
                    value={SystemType.client}
                  />
                  <label>Client</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    onChange={handleChange}
                    checked={!!state.systemtype}
                    name={key}
                    value={SystemType.checkout}
                  />
                  <label>Checkout</label>
                </div>
              </div>

              {state.systemtype == SystemType.checkout && (
                <input
                  type='password'
                  onChange={handleChange}
                  placeholder='password'
                  name='password'
                  value={state.pass}
                />
              )}
            </div>
            <button
              type='button'
              className='systemType-btn none-select'
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
