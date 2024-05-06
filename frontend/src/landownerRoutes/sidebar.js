/** Icons are imported separatly to reduce build time */

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import { isAdmin } from '../utils/Decoded'


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const  admin = isAdmin()

const routes = [
  {
    path: '/admin/analytics',
    icon: <ChartBarIcon className={iconClasses}/>, 
    name: 'Analytic',
  },
  {
    path: '/admin/createUser',
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Create User ',
  },
  {
    
    path: '/admin/user',
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Users',
  },
  {
    path: '/admin/category',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'category',
  },
  {
    path: '/admin/propertyType',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
  </svg>
  , 
    name: ' property Type',
  },
  {
    path: '/admin/addHouses',
    icon: <HomeIcon className={iconClasses}/>, 
    name: 'AddHouses',
  },
  {
    path: '/admin/allHouses',
    icon: <HomeIcon className={iconClasses}/>, 
    name: 'AllHouses',
  },
  {
    path: '/admin/allPosts', 
    icon: <WalletIcon className={iconClasses}/>, 
    name: 'Posts', 
  },
  {
    path: '/admin/newsLetter',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>, 
    name: 'NewsLetter',
  },
  {
    path: '/admin/question',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>, 
    name: 'Questions',
  },
  {
    path: '/admin/issues', // url
    icon: <WalletIcon className={iconClasses}/>, 
    name: 'Issues', 
  },
 

  
]



export default routes


