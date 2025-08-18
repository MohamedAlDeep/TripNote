import Image from "next/image";
import {SignIn} from '@/app/components/SignInC'
export default function Home() {
  return (
    <div >
      <h1 className="text-4xl">TripNote</h1>
      <p></p>
      <SignIn/>
    </div>
  );
}
