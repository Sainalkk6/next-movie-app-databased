import { CustomInputType } from '@/types/types'
import React from 'react'

const CustomInput = ({type,handleChange,placeholder,value,id,error,handleBlur}:CustomInputType) => <input type={type} onChange={handleChange} onBlur={handleBlur} placeholder={placeholder} value={value} id={id} className={`border px-4 border-[#666666] w-full rounded-xl h-14 outline-none text-xl ${error ? null : "placeholder:text-red-600" } `} />

export default CustomInput
