import { User } from "lucide-react"
import { useDispatch } from "react-redux"
import { useToast } from "./use-toast"
import { setUserLogout } from "@/redux/slices/authSlice"
import { Description } from "@radix-ui/react-dialog"

const useErrorLogout = () => {
    const dispatch = useDispatch()
    const {toast} = useToast()

    const handleErrorLogout = (error, otherTitle = "Error Occured") => {        
        if(error.response.status === 401){
            dispatch(setUserLogout())
            toast({
                title: "Session expired",
                description: "Please login again to continue",
                variant: "destructive"
            })
        }else{
            toast({
                title: otherTitle,
                description: error.response.data.message, 
                variant: "destructive"
            })
        }
    }
    return {handleErrorLogout}
}

export default useErrorLogout