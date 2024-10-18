import { CustomLabelProps } from '@/types/types'
import React from 'react'

const CustomLabel = ({label,labelFor}:CustomLabelProps) => <label className='text-lg text-[#666666] leading-6 font-normal' htmlFor={labelFor}>{label}</label>

export default CustomLabel
