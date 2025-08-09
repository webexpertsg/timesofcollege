'use client'
import StoreProvider from "../storeProvider";
import { Provider } from 'react-redux'
import Link from 'next/link'
import Image from "next/image"; 

import logo from "@/public/images/logo.png";

import { store } from '@/lib/store'
import AdminSideBar from "@/components/admin/adminSideBar";

import "@/styles/admin.css";


export default function AdminLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`dark:bg-gray-900`}>
         <Provider store={store}>
            <header className="bg-white shadow-md">
                <div className="logo">
                    <Image 
                        src={logo}
                        alt="Edu Potal"            
                    />
                </div>
                <div className="profile">
                    <Link href="/login">Logout</Link>
                </div>
            </header>
            <section className="website-wrapper admin flex">
                <AdminSideBar />
                <div className="main-contents">
                    {children}           
                </div>
            </section>                      
         </Provider>
      </body>
    </html>
  )
}