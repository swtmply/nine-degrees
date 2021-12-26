import React from "react";
import AdminNav from "../Dashboard/Nav/AdminNav";
import UserButton from "../Dashboard/User/UserButton";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-blue-600 p-4 min-h-screen flex overflow-hidden">
      {/* Navigation */}
      <AdminNav />

      {/* Content */}
      <div className="w-full max-h-[96vh] bg-slate-100 rounded-lg p-8 flex flex-col overflow-y-auto">
        <UserButton />

        {children}
      </div>
    </div>
  );
}
