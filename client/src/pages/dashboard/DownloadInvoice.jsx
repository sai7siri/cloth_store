import React from "react";
import { jsPDF } from "jspdf";
import { IoDownloadOutline } from "react-icons/io5";

const DownloadInvoice = ({ order }) => {

    console.log(order?.paymentStatus);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${year} ${month} ${day}`;
  }

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Set custom fonts and styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Invoice", 105, 15, { align: "center" });

    // Add invoice metadata
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${order._id}`, 10, 30);
    doc.text(`Order Date: ${formatDate(order.orderDate)}`, 10, 40);
    doc.text(`Customer Name: ${order.address.name}`, 10, 50);
    doc.text(`Phone: ${order.address.phone}`, 10, 60);

    // Shipping Address
    doc.setFont("helvetica", "bold");
    doc.text("Shipping Address:", 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.postalCode}`,
      10,
      80
    );

    // Draw a separator line
    doc.line(10, 90, 200, 90);

    // Add product details table
    doc.setFont("helvetica", "bold");
    doc.text("Product Details:", 10, 100);

    // Table Header
    const startX = 10;
    const startY = 110;
    const columnWidths = [10, 120, 40, 30]; // Adjust widths for columns
    const headers = ["#", "Product Name", "Price", "Quantity"];

    headers.forEach((header, index) => {
      doc.text(
        header,
        startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
        startY
      );
    });

    // Table Rows
    doc.setFont("helvetica", "normal");
    order.cartData.forEach((item, rowIndex) => {
      const rowY = startY + 10 + rowIndex * 10;
      doc.text(`${rowIndex + 1}`, startX, rowY); // Index
      doc.text(item.title, startX + columnWidths[0], rowY); // Product Name
      doc.text(`$${item.price}`, startX + columnWidths[0] + columnWidths[1], rowY); // Price
      doc.text(
        `${item.quantity || 1}`,
        startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
        rowY
      ); // Quantity
    });

    // Add total amount
    const totalY =
      startY + 10 + order.cartData.length * 10 + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: $${order.totalAmount}`, startX, totalY);

    // Save the PDF
    doc.save(`Invoice_${order._id}.pdf`);
  };

  return (
    <button
      className="px-3 py-1 bg-emerald-800 text-white rounded-full flex gap-1 items-center"
      onClick={handleDownloadInvoice}
    >
      Invoice <span><IoDownloadOutline /></span>
    </button>
  );
};

export default DownloadInvoice;
