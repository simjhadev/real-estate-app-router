import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './ui/Footer'
import Navbar from './ui/Navbar'
import {Providers} from "./providers";
import { cookies } from 'next/headers';
import { fetchCurrentLocation } from './utils/fetchCurrentLocation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Real Estate',
  description: 'Find Homes, Apartment and Rentals',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookieStore = cookies();
  let location : string | undefined ="";
  let lastSearchLoc : string | undefined = "";

  //location = cookieStore.get('currentLoc') === undefined ? "" : (cookieStore.get('currentLoc')?.value === undefined ? "" : cookieStore.get('currentLoc')?.value+"");
  location = cookieStore.get('currentLoc')?.value;
  lastSearchLoc = cookieStore.get('lastSearchLoc')?.value;

  if(location === "" || location === undefined ){
    try{
      const locData = await fetchCurrentLocation();
      location = locData ? (locData.city + ", " + locData.zipCode) : "USA";
    }
    catch(error){
      console.log(error);
    } 
  }

  return (
    <html lang="en">
      <body className={`overflow-x-hidden ${inter.className}`}>
        <Providers>
        
        <header>
        <Navbar location={location ? location : ""}  lastSearchLoc={lastSearchLoc ? lastSearchLoc : ""}/>
        </header>
        <main>
         {children}
        </main>
        <footer>
          <Footer />
        </footer>
          
        </Providers>
      </body>
    </html>
  )
}
