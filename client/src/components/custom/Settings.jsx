import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";
import { Description } from "@radix-ui/react-dialog";

export const Settings = () => {
  const {toast} = useToast()
  const {handleErrorLogout} = useErrorLogout()

  const changeUsername = async (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const previousUsername = formData.get('previousUsername')
    const newUsername = formData.get('newUsername')

    if(!newUsername){
      return toast({
        title: "Username to change is required",
        variant: "destructive"
      })
      return
    }
    try {
      const res = axios.put(import.meta.env.VITE_API_URL + "/change-username", {
        previousUsername,
        newUsername
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      )
      
      const data = await res.data
      localStorage.setItem("user", JSON.stringify(data.user))

      e.target.reset()

      return toast({
        title: "Success",
        description: data.message
      })
    } catch (error) {
      handleErrorLogout(error)
    }
  }

  const changePassword = async (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const previousPassword = formData.get('previousPassword')
    const newPassword = formData.get('newPassword')

    if(!newPassword || !previousPassword){
      return toast({
        title: "Previous and new password is required",
        variant: "destructive"
      })
      return
    }
    try {
      const res = axios.put(import.meta.env.VITE_API_URL + "/change-password", {
        username: JSON.parse(localStorage.getItem("user")).username,
        previousPassword,
        newPassword
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      )
      
      const data = await res.data
      localStorage.setItem("user", JSON.stringify(data.user))

      e.target.reset()

      return toast({
        title: "Success",
        description: data.message
      })
    } catch (error) {
      handleErrorLogout(error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start">
      {/* CHANGE USERNAME */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Username</h2>
        <form onSubmit={changeUsername} className="grid gap-3 w-[80vw] sm:w-[30vw] ">
          <Input
            type="text"
            placeholder="Enter previous Username"
            name="previousUsername"
          />
          <Input
            type="text"
            placeholder="Enter new Username"
            name="newUsername"
          />
          <Button type="submit" className="w-full ">
            Change Username
          </Button>
        </form>
      </div>
      {/* CHANGE PASSWORD */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Password</h2>
        <form onSubmit={changePassword} className="grid gap-3 w-[80vw] sm:w-[30vw] ">
          <Input
            type="text"
            placeholder="Enter previous Password"
            name="previousPassword"
          />
          <Input
            type="text"
            placeholder="Enter new Password"
            name="newPassword"
          />
          <Button type="submit" className="w-full ">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};
