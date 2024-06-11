import React from 'react'

import {Select, SelectItem} from "@nextui-org/react";


const SelectPersonal = ({value, label, placeholder, handleChange, items}) => {
  return (
    
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            value={value}
            label={label}
            placeholder={placeholder}
            className="max-w-xs"
            onChange={handleChange}
          >
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      
  )
}

export default SelectPersonal
