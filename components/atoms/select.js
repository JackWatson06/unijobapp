/**
 * Original Author: Jack Watson
 * Created Date: 10/22/2021
 * Purpose: This class represents a select field. We can use both options we pass in from the context of where we use 
 * this component or we can pass in a url which is then used to pull out data from some sort of external source. We will
 * have to make this component searchable sometime soon.
 */

import fs from "@lib/form/FormStateTracker"
import { useEffect } from "react"
import { useState } from 'react'
import axios from "axios";

/**
 * Property object for react.
 * @param {object} props Reacts properties object
 */
export default function Select( {id, name, formState, validators, endpoint}  )
{
    let error = fs.getError( name, formState.form )
    let [ options, setOptions ] = useState([]);

    useEffect(() => {
        fs.initInput(name, validators, formState)
    }, [])

    useEffect(() => {
        if(endpoint)
        {
            axios.get(`${endpoint}`)
                .then(function (response) {
                    setOptions( response.data.map( (responseData) => ({
                                value: responseData.id,
                                name: responseData.name
                            })
                        )
                    );
                });
        }
    }, [ props.endpoint ])

    return <>
        
        <select 
            id={ id } 
            value={ fs.getValue( name, formState.form) }  
            onChange={ (e) => fs.setValue(e.target.value, name, formState) } 
            >
            {options.map((option) =>
                <option key={option.value} value={option.value} >{option.name}</option>
            )}
        </select>
        { error != "" && <p> { error } </p>}
    </>
}