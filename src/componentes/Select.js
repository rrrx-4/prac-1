import React from 'react'
import Wrapper from '../asset/wrappers/Select';

const Select = ({ label, value, options, onChange }) => {
    // console.log(options);
    return (
        <Wrapper>
            <label className='label'>
                {label}
                <select className='select' value={value} onChange={onChange} >
                    {
                        options.map((option) => {
                            return (<option value={option.value}>{option.label}</option>)
                        })
                    }
                    {/* <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="meat">Meat</option> */}
                </select>
            </label>
        </Wrapper>
    )
}

export default Select