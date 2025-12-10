// app/admin/layout.jsx
"use client";

import { AdminProvider } from "@/contexts/AdminProvider";


export default function AdminLayout({ children }) {
  return  <AdminProvider>{children}</AdminProvider>;
}
