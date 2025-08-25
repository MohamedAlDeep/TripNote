
import { signIn } from "@/app/auth"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"

export  function SignIn() {
  
  return (
    <form 
      action={async () => {
        "use server"
        await signIn("slack")
      }}
    >
      <Button className="bg-blue-800" type="submit">
        <img className="h-7 w-7" src="./brand-slack - iconSvg.co.svg" alt="" />
        Login with Slack</Button>
    </form>
  )
} 