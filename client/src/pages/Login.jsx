import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { setUserLogin } from '@/redux/slices/authSlice'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {

  const {toast} = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const {email,password} = e.target.elements

    if(email.value.trim() === "" ||
       password.value.trim() === ""){
        toast({
        title:  "Please fill all fields",
        variant: "destructive"
        })
    }

    try {

      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email: email.value,
        password: password.value
      })
      const data = await res.data
      dispatch(setUserLogin(data))

      toast({
        title: data.message
      })
      navigate("/")
      
    } catch (error) {
      toast({
        title: error.response.data.message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3 ">
    <h1 className="text-2xl font-bold">Login into your account</h1>
    <form onSubmit={handleSubmit} className="grid gap-3">
      <Input placeholder="Enter Your Email" type="email" name="email" />
      <Input
        placeholder="Enter Your Password"
        type="password"
        name="password"
      />
    
    <Button >Log In</Button>
    <div className="flex gap-2 items-center">
    <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Don't have an account?
      </label>
      <Link to={"/signup"}>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        <strong>Sign up</strong>
      </label>
      </Link>
    </div>
    </form>
    <div className='flex items-center gap-2'>
      
    <label
        htmlFor="terms"
        className="text-xs  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Only for admins!
      </label>
    <Link to={"/admin/login"}>
      <label
        htmlFor="terms"
        className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        <strong> Admin Login</strong>
      </label>
      </Link>
    </div>
  </div>
  )
}
