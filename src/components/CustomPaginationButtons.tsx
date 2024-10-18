import { scrollToTop } from '@/helpers/scrollToTop'
import { CustomPaginationProps } from '@/types/types'
import Link from 'next/link'
import React from 'react'




export const CustomPaginationButtons = ({href,label,icon}:CustomPaginationProps) => <Link onClick={scrollToTop} scroll={false} className='flex items-center justify-center p-[10px] rounded-lg border border-[#f1f1f1] hover:bg-[#3563e9] transition-colors duration-300' href={href}>{!icon ? <span>{label}</span>: <img className='h-6 w-6' src={label} />}</Link> 
