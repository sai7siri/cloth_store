


const ModalOpen = ({ viewDetails }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();

    return `${year} ${month} ${day}`;
  }

  return (
    <>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {viewDetails && (
            <div className="mt-4 w-full">
              <div className="flex items-center justify-between">
                <p>Order_Id</p>
                <p>{viewDetails._id}</p>
              </div>
              <div className="flex items-center justify-between my-1">
                <p>Order_Date</p>
                <p>{formatDate(viewDetails.orderDate)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>PaymentStatus</p>
                <p>{viewDetails.paymentStatus}</p>
              </div>
              <div className="flex items-center justify-between my-2">
                <p>PaymentMethod</p>
                <p>{viewDetails.paymentMethod}</p>
              </div>
              <div className="flex items-center justify-between my-2">
                <p>TotalPrice :</p>
                <p className="font-bold ">$ {viewDetails.totalAmount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>orderStatus</p>

                <p
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    viewDetails.orderStatus == "confirmed"
                      ? "bg-blue-600 text-gray-50"
                      : viewDetails.orderStatus == "processing"
                      ? "bg-yellow-950 text-white"
                      : viewDetails.orderStatus == "shipped"
                      ? "bg-green-800 text-white"
                      : viewDetails.orderStatus == "delivered"
                      ? "bg-green-500 text-white"
                      : viewDetails.orderStatus == "cancelled"
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                >
                  {viewDetails.orderStatus}
                </p>
              </div>
              <div className="border-b text-xl font-medium min-w-full my-1">
                Product_Details
              </div>
              <div className="flex flex-col max-h-[70px] px-3 overflow-auto">
                {viewDetails &&
                  viewDetails?.cartData.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <p>Item : {item.title}</p>
                      <p>Price : $ {item.price}</p>
                    </div>
                  ))}
              </div>
              <div className="border-b text-xl font-medium min-w-full my-1">
                Shipping_Details
              </div>
              <div className="flex flex-col gap-1">
                <p>Name : {viewDetails?.address.name}</p>
                <p>City : {viewDetails?.address.city}</p>
                <p>State : {viewDetails?.address.state}</p>
                <p>Street : {viewDetails?.address.street}</p>
                <p>pinCode : {viewDetails?.address.postalCode}</p>
                <p>Phone : {viewDetails?.address.phone}</p>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};


export default ModalOpen;
