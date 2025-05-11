
import LoginForm from "@/components/LoginForm";
import React from "react";

const Home = () => {
  // try{
  //   const dataRes = await fetch(`${process.env.URL}`)
  //   const data = await dataRes.json()
  //   const response = await fetch(`${process.env.NEXTAUTH_URL}/api/movies`,{
  //     method:"POST",
  //     headers:{"Content-Type": "application/json"},
  //     body:JSON.stringify(data.results)
  //   })
  //   console.log(response)
  // } catch(err:any){ 
  //   console.log(err)
  // }
  
  return (
    <div>
      <LoginForm/>
    </div>
  );
};

export default Home;
