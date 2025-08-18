import { signOut } from "@/app/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button className="bg-blue-800" type="submit">Sign Out</Button>
    </form>
  )
}