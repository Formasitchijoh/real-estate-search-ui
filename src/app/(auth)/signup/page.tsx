"use client";
import React, { useState } from "react";
import { cn } from "@/app/lib/utils";
import FacebookIcon from "@/app/icons/FacebookIcon";
import { UserEntity } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserEntity>({
    userName: "",
    email: "",
    role: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (userName: string, password: string) => {
    fetch("http://127.0.0.1:8000/api/accounts/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName?.replaceAll(" ", "_"),
        password: password,
      }),
    }).then(async (response) => {
      const result = await response.json();
      if (response.status == 200) {
        localStorage.setItem("token", result.token);
        router.push("/home");
        return response.status;
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    fetch("http://127.0.0.1:8000/api/accounts/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.userName.replaceAll(" ", "_"),
        email: user.email,
        password: user.password,
        role: user.role,
      }),
    }).then((response) => {
      if (response.status == 201) {
        handleLogin(user.userName, user.password);
      }
    });
  };
  return (
    <div className="W-[100vw] md:h-[100vh] flex flex-col justify-center items-center ">
      <div
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        className="lg:w-[80%] w-full 2xl:h-[95vh] bg-[#f5f5f7] py-8 md:gap-4 lg:gap-6 flex justify-center items-center rounded-2xl shadow-2xl mx-auto  lg:px-8  lg:py-16"
      >
        <div
          className={`h-full w-full  px-4 lg:w-[40%] font-serif flex p-2 flex-col justify-center items-center md:w-[50%]`}
        >
          <h2 className="text-2xl lg:text-4xl text-black font-medium  tracking-tight leading-snug">
            Create Your Account{" "}
          </h2>
          <p className="text-sm  text-[#7D8BA2]">start your 30 free trial</p>

          <form action="" className="w-full" onSubmit={handleSubmit}>
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
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
                />
              </li>
              <li className="">
                <label htmlFor="role" className="mb-2">
                  Role
                </label>
                <select
                  className="border-[0.1px] border-[#7D8BA2] px-2 focus-visible:no-underline rounded-md h-12 w-full"
                  name="role"
                  value={user.role}
                  onChange={handleInputChange}
                >
                  <option value="agent">Agent</option>
                  <option value="client">Client</option>
                </select>
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
              <li>
                <label htmlFor="confirmpassword" className="mb-2">
                  ConfirmPassword
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  value={user.confirmpassword}
                  onChange={handleInputChange}
                  className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md h-12 px-2 w-full"
                />
              </li>
              <li className="flex  w-full gap-2">
                <input
                  type="checkbox"
                  id="password"
                  className="border-[0.1px] border-[#7D8BA2] focus-visible:no-underline rounded-md px-2 w-6 h-6"
                />
                <p className="text-sm lg:text-md text-[#7D8BA2]">
                  I agree with the{" "}
                  <span className="text-[#5138ED] text-md lg:text-lg">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#5138ED] text-md lg:text-lg">
                    Privacy Policy
                  </span>
                </p>
              </li>
            </ul>
            <button className=" w-full py-4 bg-[#5138ED] rounded-lg text-white">
              Continue With Email
            </button>
          </form>
          <div className="flex w-full flex-col gap-4 justify-center items-center">
            <div className="flex w-full flex-row justify-between items-center">
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
              <span className=" text-xl md:text-2xl font-medium">Google</span>
            </button>
          </div>

          <div className="flex w-full flex-col justify-start items-start pt-10">
            <p className="text-sm md:text-md">
              Already have an Account?{" "}
              <span className="text-[#5138ED] text-md lg:text-lg">Login</span>
            </p>
          </div>
        </div>
        <div className="hidden sm:block h-full bg-[url(/agent.avif)] rounded-2xl w-[50%] lg:w-[60%] bg-no-repeat bg-cover aspect-auto"></div>
      </div>
    </div>
  );
};

export default SignUp;
