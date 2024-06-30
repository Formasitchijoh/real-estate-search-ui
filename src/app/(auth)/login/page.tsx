"use client";
import React,{useState} from "react";
import { cn } from "@/app/lib/utils";
import FacebookIcon from "@/app/icons/FacebookIcon";
import { UserEntity } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const SignIn = () => {

    const router = useRouter()
    const notify = () => toast.success('Here is your toast.',{
        duration: 4000,
        position: 'top-center',
      
        // Styling
        style: {},
        className: '',
      
        // Custom Icon
        icon: '👏',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });

  const [user, setUser] = useState<Partial<UserEntity>>({
    email:'',
    password:'',
  })

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    
    setUser((prev) => (
      {...prev,[e.target.name]:e.target.value}
    ))
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try {
        fetch('http://127.0.0.1:8000/api/accounts/auth/login/', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(
              {
                  username:user?.userName?.replaceAll(' ', '_'),
                  password: user.password,
              }
            )
          }).then( async(response) => {
              const result = await response.json()
              if(response.status == 200){
                localStorage.setItem('user', JSON.stringify(result))
                router.push("/home");
              }              
          })    
    } catch (error) {
        throw new Error(error);
        
    }
  }
  return (
    <div className="w-[100vw] md:h-[100vh] flex flex-col justify-center items-center ">
        <button onClick={notify}>Make me a toast</button>
        <Toaster />
      <div
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        className="lg:w-[80%] w-full 2xl:h-[95vh] bg-[#f5f5f7] py-8 md:gap-4 lg:gap-6 flex justify-center items-center rounded-2xl shadow-2xl mx-auto  lg:px-8  lg:py-16"
      >
          <div
          className={`h-full w-full px-4 lg:w-[40%] font-serif flex p-2 flex-col justify-center items-center md:w-[50%]`}
        >
          <h2 className="text-2xl lg:text-4xl text-black font-medium  tracking-tight leading-snug">
            SignIn{" "}
          </h2>
         <form className="w-full" action="" onSubmit={handleSubmit}>
         <ul className="py-8 w-full  list-none flex flex-col place-content-center gap-4 md:gap-6">
         <li>
              <label htmlFor="username" className="mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleInputChange}
                className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
              />
            </li>
            <li>
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
              />
            </li>
          </ul>
          <button className=" w-full py-4 bg-[#5138ED] rounded-lg text-white">
             Login
            </button>
          <div className="flex w-full flex-col gap-4 justify-center items-center">

            <div className="flex w-full pt-4 flex-row justify-between items-center">
              <hr className="w-[45%]" />
              <p className="px-2">or</p>
              <hr className="w-[45%]" />
            </div>
            <button
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
              className="flex w-full py-4 bg-[#ffffff] rounded-lg shadow-xl gap-2  flex-row justify-center items-center "
            >
              <FacebookIcon />
              <span className=" text-xl md:text-2xl font-medium"> Google</span>
            </button>
          </div>

          <div className="flex w-full flex-col justify-start items-start pt-10">
            <p className="text-sm md:text-md">
              Dont have an Account?{" "}
              <span className="text-[#5138ED] text-md lg:text-lg">SignIn</span>
            </p>
          </div>
         </form>
        </div>
        <div className="hidden sm:block h-full bg-[url(/agent.avif)] rounded-2xl w-[50%] lg:w-[60%] bg-no-repeat bg-cover aspect-auto"></div>
        <Toaster />
      </div>
    </div>
  );
};

export default SignIn;
