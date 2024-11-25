
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { captureOrder } from '../../context/orderSlice';

function PaypalReturn() {
   const dispatch= useDispatch();
   const location = useLocation();
  
   const params = new URLSearchParams(location.search);
   const paymentId = params.get('paymentId');
   const payerId = params.get('PayerID');

   useEffect( ()=>{
    if(paymentId && payerId){
     const orderId = JSON.parse(sessionStorage.getItem('currOrderId'));

      dispatch(captureOrder({paymentId , payerId , orderId})).then( (data)=>{
        if(data.payload.success){
          sessionStorage.removeItem('currOrderId');
          window.location.href = '/payment-success'
        }
      })
    }
   } , [paymentId ,payerId , dispatch]);

  return (
    <div className='flex items-center justify-center h-[80vh]'>
      <div className='text-xl font-semibold text-emerald-700'>
        Payment is processing....! please wait!
      </div>
    </div>
  )
}

export default PaypalReturn;
