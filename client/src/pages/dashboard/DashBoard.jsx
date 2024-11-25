import Links from './Links';
import { Outlet } from "react-router-dom"

export default function DashBoard(){

   return(
      <div className="flex border p-1 my-3 gap-4 h-[85vh]">

         <div className="border w-1/5 h-full">
         <Links />
         </div>

         <div className="border w-4/5 h-full overflow-auto">
         <Outlet />
         </div>

      </div>
   );
}