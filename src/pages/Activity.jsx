import './styles/Account.css'

import OwnedPledges from "../components/OwnedPledges"
import OwnedProjects from "../components/OwnedProjects"

const Activity = () => {
  return (
    <section className='activity'>
        <OwnedProjects />
        <OwnedPledges />
    </section>
  )
}
export default Activity