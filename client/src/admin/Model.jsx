import AddProduct from "./AddProduct"

export default function ModelPop( { openForm , setOpenForm } ){
   

   return(
      <div className="fixed z-40 inset-0 flex items-center justify-center">

         <div className=" absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

         <div className="relative mx-4 sm:mx-0 bg-white h-[50vh] md:h-[70vh] overflow-auto rounded-md shadow-md">
            <AddProduct />
         </div>

      </div>
   );
}