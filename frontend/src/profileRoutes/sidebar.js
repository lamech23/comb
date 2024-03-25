/** Icons are imported separatly to reduce build time */

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'



const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`


const user = JSON.parse(localStorage.getItem("credentials"));
let id = user.id;
let status = user.Active;
const routes = [
  {
    path: '/account/',
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Account',
  },
  {
    path: `/account/profile/${id}`,
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Profile',
  },
  {
    path: `/account/appointment/${id}`,
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Appointment',
  },
  {
    path: '/account/post',
    icon: <HomeIcon className={iconClasses}/>, 
    name: 'Post',
  },
  
  {
    path: '/account/houses',
    icon: <HomeIcon className={iconClasses}/>, 
    name: 'Houses',
  },
  {
    path: '/account/userVerification',
    icon: <HomeIcon className={iconClasses}/>, 
    name: 'Verify',
  }
]

export default routes


