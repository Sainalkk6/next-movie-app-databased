"use client"
import { CustomContainer } from '@/components/CustomContainer'
import CustomInput from '@/components/CustomInput'
import CustomLabel from '@/components/CustomLabel'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'

const LoginForm = () => {
    const router = useRouter()
    const [showPassword,setShowPassword] = useState(false)
    const [disabled,setDisabled] = useState(false)
    const [error,setError] = useState("")
  const {handleSubmit,handleBlur,handleChange,values} = useFormik({
    initialValues:{email:"",password:""},
    onSubmit:async (values)=>{
      try{
        const res = await signIn("credentials",{
            email:values.email,password:values.password,redirect:false
        })  
        if(res?.error){
            setError("Invalid Credentials")
            return
        }
        router.replace('/home')
      } catch(err:any){
      }
    }
  })

  useEffect(()=>{
    if(values.email.length > 0 && values.password.length > 7){
        setDisabled(false)
    } else{
        setDisabled(true)
    }
  },[values])

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='flex items-center justify-center flex-col gap-3'>
          <h1 className='text-[32px] font-bold leading-[48px] tracking-[-0.96px] text-[#2563e9]'>INFINITY</h1>
          <div className='flex flex-col items-start px-14 pb-10 pt-2 border border-[#66666680] rounded-3xl'>
            <div className='flex flex-col justify-center items-center gap-9'>
              <h1 className='text-[#333] text-center text-[32px] font-medium dark:text-white transition-colors duration-100'>Sign in</h1>
              <form onSubmit={handleSubmit} className='flex flex-col items-start gap-6'> 
                <CustomContainer>
                  <CustomLabel labelFor='email' label='Email'/>
                  <CustomInput error handleBlur={handleBlur} handleChange={handleChange} id='email' placeholder='' type='text' value={values.email} />
                </CustomContainer>
                <CustomContainer>
                  <div className='flex w-full pr-3 justify-between items-center'>
                  <CustomLabel labelFor='password' label='Your password'/>
                  <button className='gap-2 flex items-center justify-center outline-none' onClick={()=> setShowPassword(!showPassword)}>
                    {showPassword ? <BiHide size={20}/> : <BiShow size={20} />}
                    <span className='text-[#666666cc] text-right font-poppins text-[18px]'>{showPassword  ? 'Hide' : 'Show'}</span>
                  </button>
                  </div>
                  <CustomInput error handleBlur={handleBlur} handleChange={handleChange} id='password' placeholder ="" type={showPassword ? "text" : "password"} value={values.password} />
                </CustomContainer>
                <button type='submit' disabled={disabled} className={`transition duration-300 ${disabled ? null : "hover:scale-105"} hover:bg-blue-800 text-lg flex w-full items-center justify-center text-white disabled:bg-slate-500/35 pt-[15px] py-[16px] rounded-[40px] bg-black`}>Login</button>
                <span className='text-red-500 text-lg'>{error}</span>
                <p className='text-[#666] text-base'>By continuing, you agree to the <span className='underline text-[#111] dark:text-white'>Terms of use</span> and <span className='text-[#111] dark:text-white underline'>Privacy Policy</span></p>
              </form>
            </div>
            <div className='flex w-full items-center gap-[23px] mt-5 mb-5'>
              <span className='h-[2px] flex-1 bg-slate-500'></span>
              <span className='text-[#666] text-[22px]'>New to our community</span>
              <span className='h-[2px] flex-1 bg-slate-500'></span>
            </div>
            <Link href={"/signup"} className='transition-all duration-300 hover:scale-105 hover:bg-blue-900 hover:text-white flex w-full items-center justify-center pt-[16.5px] pb-[17.5px] rounded-[40px] border'>Create an account</Link>
          </div>
        </div>
    </div>
  )
}

export default LoginForm
