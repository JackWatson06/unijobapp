import React, { useState, useEffect } from "react";
import fs from "@lib/form/FormStateTracker"

import style from "@styles/Input.module.css";

export default function TextInput ({ id, name, type, label, validators, formState }) {

    const [isFocused, setIsFocused] = useState(false);
    
    const error = fs.getError( name, formState.form )
    const value = fs.getValue( name, formState.form )

    useEffect(() => {
        fs.initInput(name, validators, formState)
    }, [])

    console.log(error);
    console.log(value);

    return (
        <div className={style.text_input}>
            {/* Below here we also had the isTouched or'd with the isFocus variable. */}
            <div className={error != undefined ? `${style.error_border} ${style.default_border}` : (isFocused === true) ? `${style.focused_border} ${style.default_border}` : `${style.default_border}`}>
                <div className={isFocused === true ? `${style.text_input_wrapper} ${style.focus_wrapper}` : `${style.text_input_wrapper}`}>
                    <span className={value != "" ? `${style.active_label} ${style.label}` : `${style.label}`}>{label}</span>
                    <input
                        id       = { id }
                        type     = { type ? type : "text" }

                        value = { value }
                        onChange={ (e) => fs.setValue(e.target.value, name, formState) }
                        onFocus={() => { setIsFocused(true); }}
                        onBlur={() => { setIsFocused(false); }}
                    />
                </div>
            </div >
            <span className={style.error_msg}>{error != undefined ? error : null}</span>
        </div >

    )
};