import type { RootState } from '../index'
import {
  IOrderData,
  IOrderPayload,
  IOrderServerResponse,
  IFilters,
} from '../../models/models'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'order/api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LISTING_URL + 'orders/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userInfo?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Order'],
  refetchOnFocus: true,
  endpoints: (build) => ({
    createOrder: build.mutation<IOrderData, IOrderPayload>({
      query: (orderPayload) => ({
        url: `add/`,
        method: 'POST',
        body: orderPayload.order,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: build.query<IOrderServerResponse, IFilters>({
      query: (filters) => ({
        url: ``,
        params: {
          page: filters.page,
        },
      }),
      providesTags: (result) => ['Order'],
    }),
    getOrder: build.query<IOrderData, number>({
      query: (orderId) => ({
        url: `${orderId}/`,
      }),
      providesTags: (result) => ['Order'],
    }),
    getMyOrders: build.query<IOrderData[], void>({
      query: () => ({
        url: `myorders/`,
      }),
      providesTags: (result) => ['Order'],
    }),
    payOrder: build.mutation<string, number>({
      query: (orderId) => ({
        url: `${orderId}/pay/`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
    deliverOrder: build.mutation<string, number>({
      query: (orderId) => ({
        url: `${orderId}/deliver/`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = orderApi
