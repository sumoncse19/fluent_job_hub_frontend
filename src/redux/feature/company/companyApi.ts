import { api } from "../../api/apiSlice";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Handle company API
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

    // Handle employee API
    getEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: ["employees"],
    }),
    postEmployee: builder.mutation({
      query: (data) => ({
        url: `/employee`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employees"],
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `/employee`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["employees"],
    }),
    deleteEmployee: builder.mutation({
      query(id) {
        return {
          url: `/employee/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["employees"],
    }),

    // Handle review API
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["reviews"],
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    // Handle comments API
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ["reviews"],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useSingleCompanyQuery,
  usePostCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,

  useGetEmployeeQuery,
  usePostEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,

  useGetReviewsQuery,
  usePostReviewMutation,

  useGetCommentQuery,
  usePostCommentMutation,
} = companyApi;
