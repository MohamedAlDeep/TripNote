import Image from "next/image";
import {SignIn} from '@/app/components/SignInC'
import { redirect } from "next/navigation";
import { auth } from '@/app/auth'
import { log } from "console";
import { SignOut } from "./components/SignOutC";
import { Navbar } from "./components/Navigation/Navbar";
import { InsertNote } from "./components/Data/InsertNote";
import prisma from '@/lib/prisma'
import { cookies } from "next/headers";

export default async function Home() {
  const session = await auth()
  const cookieStore = await cookies();
  // Remove cookieStore from here; use inside userCheck if needed

  let logged = true
  
  async function userCheck(emailC: any){
    const result = await prisma.user.findUnique({
      where: {email: emailC}
    })
    const exists = !!result
    if(exists){
      const cookieExist = cookieStore.get('author');
      if(cookieExist){
        console.log("Cookies are set")
      }else{
        await fetch('/api/setauthor', {
          method: "POST",
          body: JSON.stringify({id: result.id}),
          headers: {"Content-Type": 'application/json'}
        })
      }
    }else{
      const result = await prisma.user.create({
        data:{
          email: String(session?.user?.email),
          name: String(session?.user?.name)
        }
      })
      await fetch('/api/setauthor', {
        method: "POST",
        body: JSON.stringify({id: result.id}),
        headers: {"Content-Type": 'application/json'}
      })
    }
  }
  
  if(session){
    
  }
  if(!session){
    logged = false
  }
  if(logged == false){
    return (
      <div>
        <Navbar logged={false}/>
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
      <Navbar logged={true}/>
      <h1 className="text-4xl">TripNote</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <img src={session?.user?.image ?? './moch.png'} alt="User Avatar" />

      <SignOut/>
    </div>
  );
}
