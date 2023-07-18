import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IRegisterData,
  IRegisterPayload,
  ILoginData,
  ILoginPayload,
  IUpdateUser,
  IRegister,
  IUserServerResponse,
  IFilters,
} from '../../models/models'
import type { RootState } from '..'

export const userApi = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LISTING_URL + 'users/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userInfo?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    register: build.mutation<IRegisterData, IRegisterPayload>({
      query: (registerPayload) => ({
        url: `register/`,
        method: 'POST',
        body: registerPayload,
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation<ILoginData, ILoginPayload>({
      query: (loginPayload) => ({
        url: `login/`,
        method: 'POST',
        body: loginPayload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),
    getUserProfile: build.query<IRegisterData, void>({
      query: () => ({
        url: `profile/`,
        method: 'GET',
      }),
      providesTags: (result) => ['User'],
    }),
    updateUserProfile: build.mutation<any, IRegister>({
      query: (updateProfilePayload) => ({
        url: `profile/update/`,
        method: 'PUT',
        body: updateProfilePayload,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: build.query<IRegisterData, number>({
      query: (userId) => ({
        url: `${userId}/`,
      }),
      providesTags: (result) => ['User'],
    }),
    getUsers: build.query<IUserServerResponse, IFilters>({
      query: (filters) => ({
        url: ``,
        params: {
          page: filters.page,
        },
      }),
      providesTags: (result) => ['User'],
    }),
    deleteUser: build.mutation<string, number>({
      query: (userId) => ({
        url: `${userId}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation<any, IUpdateUser>({
      query: (updateUserPayload) => ({
        url: `${updateUserPayload.id}/update/`,
        method: 'PUT',
        body: updateUserPayload,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi
