import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlluserOrders } from "../../context/orderSlice";
import ModalOpen from "../../admin/ModalViewOrder";
import DownloadInvoice from "./DownloadInvoice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.orders);
  const [viewDetails, setViewDetails] = useState(null);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();

    return `${year} ${month} ${day}`;
  }

  useEffect(() => {
    dispatch(getAlluserOrders());
  }, [dispatch]);

  const handleViewDetails = (data) => {
    document.getElementById("modal").showModal();
    setViewDetails(data);
  };

  // const handleDownloadInvoice = async (order) => {
  //   const doc = new jsPDF();

  //   // Create a basic invoice format
  //   doc.text("Invoice", 105, 10, { align: "center" });
  //   doc.text(`Order ID: ${order._id}`, 10, 20);
  //   doc.text(`Order Date: ${formatDate(order.orderDate)}`, 10, 30);
  //   doc.text(`Customer Name: ${order.address.name}`, 10, 40);
  //   doc.text(`Shipping Address:`, 10, 50);
  //   doc.text(
  //     `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.postalCode}`,
  //     10,
  //     60
  //   );
  //   doc.text(`Phone: ${order.address.phone}`, 10, 70);

  //   // Add product details
  //   doc.text("Product Details:", 10, 80);
  //   order.cartData.forEach((item, index) => {
  //     doc.text(`${index + 1}. ${item.title} - $${item.price}`, 10, 90 + index * 10);
  //   });

  //   doc.text(`Total Amount: $${order.totalAmount}`, 10, 120);

  //   // Save the PDF
  //   doc.save(`Invoice_${order._id}.pdf`);
  // };

  return (
    <div className="overflow-x-auto">
      {orderList && orderList.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product_Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order_Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order_Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderList.map((order, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id.slice(0, 6)}...
                </td>
                <td
                  key={idx}
                  className="px-6 py-4 whitespace-nowrap text-sm font-mono text-yellow-800"
                >
                  {order?.cartData[0].title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.orderDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.orderStatus == "confirmed"
                        ? "bg-blue-600 text-gray-50"
                        : order.orderStatus == "processing"
                        ? "bg-yellow-950 text-white"
                        : order.orderStatus == "shipped"
                        ? "bg-green-800 text-white"
                        : order.orderStatus == "delivered"
                        ? "bg-green-500 text-white"
                        : order.orderStatus == "cancelled"
                        ? "bg-red-600 text-white"
                        : order.orderStatus == "pending" ? "bg-yellow-400 text-white" : ""
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="flex gap-2 text-center mt-3">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="px-3 py-1 bg-black text-white rounded-full"
                  >
                    viewOrder
                  </button>
                  <DownloadInvoice order={order}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-[60vh] text-xl">
          {" "}
          <p className="font-bold text-red-700 ">No orders found</p>{" "}
        </div>
      )}
      <ModalOpen viewDetails={viewDetails} />
    </div>
  );
};


export default Orders;
