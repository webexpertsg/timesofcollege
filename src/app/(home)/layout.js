'use client'
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
// import StoreProvider from "./storeProvider";
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

import "@/styles/globals.css";

export default function HomeLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
      </head>
      <body className={`dark:bg-gray-900`}>
         <Provider store={store}>
            <Header />
              <div className="website-wrapper">
                <div className="main-contents w-full">
                  {children}                
                </div>
              </div>            
          <Footer />
         </Provider>
      </body>
    </html>
  )
}