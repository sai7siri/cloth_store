import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";

export const createOrder = createAsyncThunk(
  "/create/order",
  async (orderData) => {
    // console.log(orderData);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/order/createorder`,
        orderData,
        { withCredentials: true }
      );

      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const captureOrder = createAsyncThunk(
  "/capture/order",
  async ({ paymentId, payerId, orderId }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/order/captureorder`,
        { paymentId, payerId, orderId },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const getAlluserOrders = createAsyncThunk("/alluser/order", async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/order/getorders`, {
      withCredentials: true,
    });

    return data?.data;
  } catch (err) {
    throw err;
  }
});

export const updateUserStatus = createAsyncThunk(
  "/userStatus/update",
  async ({ id, newStatus }) => {
    try {
     const {data} =  await axios.put(`${baseUrl}/api/admin/updatestatus/${id}`, 
         {newStatus},
         {withCredentials : true}
      )
      return data;
    } catch (err) {
      toast.error('failed to update')
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    approval_url: null,
    orderId: null,
    orderList: [],
    orderDetials: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        (state.loading = false),
          (state.approval_url = action.payload?.approvalURL);
        state.orderId = action.payload?.orderId;
        sessionStorage.setItem(
          "currOrderId",
          JSON.stringify(action.payload?.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        (state.loading = false), (state.approval_url = null);
        state.orderId = null;
      });
    builder
      .addCase(getAlluserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlluserOrders.fulfilled, (state, action) => {
        (state.loading = false), (state.orderList = action.payload);
      })
      .addCase(getAlluserOrders.rejected, (state) => {
        (state.loading = false), (state.orderList = []);
      });
  },
});

export default orderSlice.reducer;
