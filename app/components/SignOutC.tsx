import { signOut } from "@/app/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className="bg-blue-800" type="submit">Sign Out</button>
    </form>
  )
}