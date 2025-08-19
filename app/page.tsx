import Image from "next/image";
import {SignIn} from '@/app/components/SignInC'
import { redirect } from "next/navigation";
import { auth } from '@/app/auth'
import { log } from "console";
import { SignOut } from "./components/SignOutC";
import { Navbar } from "./components/Navigation/Navbar";
import { InsertNote } from "./components/Data/InsertNote";

export default async function Home() {
  const session = await auth()
  let logged = true
  if(!session){
    logged = false
  }
  if(logged == false){
    return (
      <div>
        <Navbar/>
        <div className="grid place-items-center space-y-6 mt-12">
          <img className="h-35 w-150" src="Text Content Title.svg" alt="" />
          <SignIn/>
         
        </div>
      </div>
    )
  }
  console.log(session?.user)
  return (
    <div >
      <Navbar/>
      <h1 className="text-4xl">TripNote</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <img src={session?.user?.image ?? './moch.png'} alt="User Avatar" />

      <SignOut/>
    </div>
  );
}
