"use client"
import { CustomButtonProps } from '@/types/types'

import React from 'react'


export const CustomButton = ({value,Icon,size,handleClick,id,email}:CustomButtonProps) =><button className='flex items-center justify-center' value={value} onClick={()=>handleClick(id,email)}>{<Icon size={size}/>}</button>
  



