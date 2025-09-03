import Image from "next/image";
import {SignIn} from '@/app/components/SignInC'
import { redirect } from "next/navigation";
import { auth } from '@/app/auth'
import { SignOut } from "./components/SignOutC";
import { Navbar } from "./components/Navigation/Navbar";
import prisma from '@/lib/prisma'
import { cookies } from "next/headers";

export default async function Home() {
  const session = await auth()
  const cookieStore = cookies(); // Remove await

  if(!session) {
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

  // Only run this when session exists
  const email = session?.user?.email;
  let userId: number | undefined;
  
  if (email) {
    const result = await prisma.user.findUnique({
      where: {email}
    });
    
    if(result) {
      userId = result.id;
    } else {
      const newUser = await prisma.user.create({
        data:{
          email: String(email),
          name: String(session?.user?.name)
        }
      });
      userId = newUser.id;
    }
  }

  return (
    <div>
      <Navbar logged={true}/>
      <h1 className="text-4xl">TripNote</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <img src={session?.user?.image ?? './moch.png'} alt="User Avatar" />
      {userId && <p>User ID: {userId}</p>}
      <SignOut/>
    </div>
  );
}