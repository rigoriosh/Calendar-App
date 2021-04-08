import { useState } from "react"


export const useForm = (initialState) => {

    //console.log(initialState)
    
    const [fields, setfields] = useState(initialState)

    const resetFields = () => {
        setfields(initialState);
    }

    const handledInputChange = ({target}) => {
        //console.log(target.value)
        setfields(
            {
                ...fields, [target.name]: target.value
            }
        )
        
    }


    return [fields, handledInputChange, resetFields]
}