import OwnedPledges from "../components/OwnedPledges"
import OwnedProjects from "../components/OwnedProjects"

import { useAuth } from "../hooks/use-auth"


const Account = () => {
  const user = useAuth()
  //saved user_id in auth object so account can display projects and pledges associated with that users id

  return (
    <div>
        <OwnedProjects user={user} />
        <OwnedPledges user={user} />
    </div>
  )
}
export default Account