import { api } from "../../api/apiSlice";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/companies",
      providesTags: ["companies"],
    }),
    singleCompany: builder.query({
      query: (id) => `/company/${id}`,
      providesTags: ["companies"],
    }),
    postCompany: builder.mutation({
      query: (data) => ({
        url: `/add-company`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companies"],
    }),
    editCompany: builder.mutation({
      query: (data) => ({
        url: `/company`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["companies"],
    }),
    deleteCompany: builder.mutation({
      query(id) {
        return {
          url: `/company/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["companies"],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["reviews"],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useSingleCompanyQuery,
  useGetCommentQuery,
  useGetReviewsQuery,

  usePostCommentMutation,
  useDeleteCompanyMutation,
  useEditCompanyMutation,
  usePostCompanyMutation,
  usePostReviewMutation,
} = companyApi;
