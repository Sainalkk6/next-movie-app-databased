import { CustomContainerProps } from '@/types/types'
import React from 'react'

export const CustomContainer = ({children}:CustomContainerProps) => <div className='flex flex-col items-start gap-1  w-full'>{children}</div>
