import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fluent-job-hub-backend.onrender.com",
  }),
  tagTypes: ["companies", "employees", "reviews"],
  endpoints: () => ({}),
});
