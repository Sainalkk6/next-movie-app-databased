import { CustomLinkProps } from '@/types/types'
import Link from 'next/link'
import React from 'react'

export const CustomLink = ({label ,route}:CustomLinkProps) =><Link className='hover:text-[#3563e9] dark:border-white/30 flex p-[10px] items-center justify-center w-[44px] h-[44px] rounded-[90px] border border-slate-500/20' href={route}>{label}</Link>
