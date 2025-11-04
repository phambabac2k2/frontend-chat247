import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/useAuthStore"

const ChatAppPage = () => {
 const user = useAuthStore((s) => s.user);
 console.log(user);

 const { logOut } = useAuthStore();


  return (
    <div>
      <Button>Logout</Button>
    </div>
  )
}

export default ChatAppPage