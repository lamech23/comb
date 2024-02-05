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


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
  {
    path: '/app/analytics',
    icon: <ChartBarIcon className={iconClasses}/>, 
    name: 'Analytic',
  },
  {
    path: '/app/user',
    icon: <UsersIcon className={iconClasses}/>, 
    name: 'Users',
  },
  {
    path: '/app/category',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'category',
  },
  {
    path: '/app/propertyType',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: ' property Type',
  },
  {
    path: '/app/allHouses',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'AllHouses',
  },
  {
    path: '/app/newsLetter',
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'NewsLetter',
  },
  {
    path: '/app/question', // url
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'Questions', // name that appear in Sidebar
  },
  {
    path: '/app/issues', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Issues', // name that appear in Sidebar
  },
  
]

export default routes


