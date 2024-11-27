import Links from './Links';
import { Outlet } from "react-router-dom"

export default function DashBoard(){

   return(
      <div className="flex flex-col-reverse sm:flex-row border p-1 my-3 gap-4 h-[85vh]">

         <div className="border sm:w-1/5 w-full h-[50px] sm:h-full">
         <Links />
         </div>

         <div className="border w-full sm:w-4/5  h-full overflow-auto">
         <Outlet />
         </div>

      </div>
   );
}