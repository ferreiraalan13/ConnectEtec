import React, { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface IOwnProps {
    children: ReactNode
    label: string
    route?: string
    customFunction?(): void 
}


const ItensMenu: React.FC<IOwnProps> = ({children, label, route, customFunction} )=>{
    const navigate = useNavigate()
    function handleCallFunction(){
        if (route){
            navigate(route)
        }
        else if(customFunction){
            customFunction()
        }
        
    }

    return(
        <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg" onClick={handleCallFunction}>
        {' '}
        {children}
        {label}
            
        
      </button>
    )
}
export default ItensMenu;