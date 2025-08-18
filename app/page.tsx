import Image from "next/image";
import {SignIn} from '@/app/components/SignInC'
import { redirect } from "next/navigation";
import { auth } from '@/app/auth'
import { log } from "console";

export default async function Home() {
  const session = await auth()
  let logged = true
  if(!session){
    logged = false
  }
  if(logged == false){
    return (
      <div>
        <SignIn/>
      </div>
    )
  }
  console.log(session?.user)
  return (
    <div >
      <h1 className="text-4xl">TripNote</h1>
      
      <img src={session?.user?.image ?? './moch.png'} alt="User Avatar" />
    </div>
  );
}
