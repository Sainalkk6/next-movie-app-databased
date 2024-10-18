"use client";
import { useFormik } from "formik";
import Image from "next/image";
import logo from "../../public/Illustration.svg"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomLabel from "./CustomLabel";
import CustomInput from "./CustomInput";
import { CustomContainer } from "./CustomContainer";
import { basicSchema } from "@/schemas/basicSchema";


const SignupForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [proceed, setProceed] = useState(false);

  const router = useRouter();

  const { values, handleSubmit, handleChange, errors ,handleBlur} = useFormik({
    initialValues: user,
    validationSchema: basicSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.name || !values.email || !values.password) setError("All fields are mandatory");
      try {
        const resUserExist = await fetch("api/userExist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });
        const { user } = await resUserExist.json();
  
        if (user) {
          setError("User already exists");
          return;
        }
        

        const response = await fetch("api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        setUser(values);
        router.push("/login");
        resetForm();
      } catch (err: any) {
        setError(err.message);
      }
    },
  });

  useEffect(()=>{
  if(values.name.length > 0 && values.email.length > 0 && values.password.length > 7){
      setProceed(true)
    } else{
      setProceed(false)
    }
  },[values])

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex border-[#666666] border px-16 rounded-3xl gap-10 py-6 items-center">
        <div className="flex flex-col items-start gap-[15px]">
          <div className="flex flex-col items-start  justify-center">
            <h1 className="font-medium text-3xl text-[#3563e9] leading-[48px] tracking-[-0.96px]">INFINITY</h1>
            <div className="flex flex-col">
              <span className="text-3xl font-medium leading-[48px] text-[#333] dark:text-white/70">Create an account</span>
              <Link className="flex items-start gap-[10px] p-[2px] text-lg leading-6 font-normal whitespace-nowrap" href={"/login"}>
                Already have an account ? <span className="underline text-[#3563e9] cursor-pointer  hover:scale-105 transition duration-200">Log in</span>
              </Link>
            </div>
          </div>
          <form className="flex flex-col gap-4 items-start" onSubmit={handleSubmit}>
            <CustomContainer>
              <CustomLabel label="Username" labelFor="name" />
              <CustomInput handleBlur={handleBlur} error={!errors.name} id="name" handleChange={handleChange} placeholder={errors.name ? errors.name : "Enter your name.."} type="text" value={values.name} />
            </CustomContainer>

            <CustomContainer>
              <CustomLabel label="Email address" labelFor="email" />
              <CustomInput handleBlur={handleBlur} error={!errors.email} id="email" handleChange={handleChange} placeholder={errors.email ? errors.email : "Enter your email"} type="text" value={values.email} />
            </CustomContainer>

            <CustomContainer>
              <CustomLabel label="password" labelFor="password" />
              <CustomInput handleBlur={handleBlur} error={!errors.password} id="password" handleChange={handleChange} placeholder={errors.password ? errors.password : "Enter your password.."} type={showPassword ? "text" : "password"} value={values.password} />
            </CustomContainer>
            <span className="text-red-600">{error}</span>
            <div className="py-2 pr-2 items-center flex gap-2 justify-start text-[16px]">
              <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
              <label htmlFor="show">Show Password</label>
            </div>
            <div className="flex w-fit justify-start ">
              <button type="submit" className={`transition-all duration-300 disabled:bg-slate-500/35 rounded-[32px] text-white text-[22px] leading-[33px] font-medium flex items-center justify-center bg-black px-5 py-2 ${proceed ? "hover:scale-105  hover:bg-[#3563e9]" :""}`} disabled={!proceed}>
                Create an account
              </button>
            </div>
          </form>
        </div>
        <div className="hidden sm:flex items-center justify-center relative ">
           <Image className="relative -top-16" src={logo} width={285} height={301} alt="logo" /> 
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
