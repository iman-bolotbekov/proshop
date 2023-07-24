import type { RootState } from '../index'
import {
  IFilters,
  ILeaveReview,
  IProduct,
  IUpdateProductPayload,
  ProductServerResponse,
} from '../../models/models'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'product/api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LISTING_URL + 'products/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userInfo?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Product'],
  refetchOnFocus: true,
  endpoints: (build) => ({
    getProducts: build.query<ProductServerResponse, IFilters>({
      query: (filters) => ({
        url: '',
        params: {
          page: filters.page,
        },
      }),
      providesTags: (result) => ['Product'],
    }),
    getProduct: build.query<IProduct, number>({
      query: (productId) => ({
        url: `${productId}/`,
      }),
      providesTags: (result) => ['Product'],
    }),
    searchProducts: build.query<IProduct[], string>({
      query: (searchText) => ({
        url: `${searchText}/search/`,
      }),
      providesTags: (result) => ['Product'],
    }),
    getTopProduct: build.query<IProduct[], void>({
      query: () => ({
        url: `top/`,
      }),
      providesTags: (result) => ['Product'],
    }),
    updateProduct: build.mutation<IProduct, IUpdateProductPayload>({
      query: (updateProductPayload) => ({
        url: `${updateProductPayload.productId}/update/`,
        method: 'PUT',
        body: updateProductPayload.product,
      }),
    }),
    deleteProduct: build.mutation<string, number>({
      query: (productId) => ({
        url: `${productId}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    leaveReview: build.mutation<any, ILeaveReview>({
      query: (reviewPayload) => ({
        url: `${reviewPayload.productId}/reviews/`,
        method: 'POST',
        body: reviewPayload,
      }),
      invalidatesTags: ['Product'],
    }),
    createProduct: build.mutation<IProduct, FormData>({
      query: (productPayload) => ({
        url: `create/`,
        method: 'POST',
        body: productPayload,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
  useGetTopProductQuery,
  useDeleteProductMutation,
  useLeaveReviewMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi
