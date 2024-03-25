import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const user = JSON.parse(localStorage.getItem("credentials"));
const id = user.id;
const status = user.Active;

console.log(status);

// Define routes based on user status
let routes = [
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
  }
];

// Add additional routes based on user status
if (status === "active") {
  routes = [
    ...routes,
    {
      path: '/account/post',
      icon: <HomeIcon className={iconClasses}/>, 
      name: 'Post',
    },
    {
      path: '/account/houses',
      icon: <HomeIcon className={iconClasses}/>, 
      name: 'Houses',
    }
  ];
}

export default routes;
