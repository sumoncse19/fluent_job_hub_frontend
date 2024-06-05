import { api } from "../../api/apiSlice"

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/signup`,
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = userApi