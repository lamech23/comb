import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import { isAdmin, isUser } from "../utils/Decoded";


const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const user = isUser()?.userId;
const id = user?.id;

// Define routes based on user status
let routes = [
  {
    path: "/account/",
    icon: <UsersIcon className={iconClasses} />,
    name: "Account",
  },
  {
    path: `/account/profile/`,
    icon: <UsersIcon className={iconClasses} />,
    name: "Profile",
  },
  {
    path: `/account/appointment/${id}`,
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Appointment",
  },
  {
    path: "/account/post",
    icon: <HomeIcon className={iconClasses} />,
    name: "Post",
  },

  {
    path: "/account/houses",
    icon: <HomeIcon className={iconClasses} />,
    name: "Houses",
  },
  {
    path: "/account/userVerification",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>,
  
    name: "Verify",
  },
  {
    path: "/account/payment-request",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
    ),

    name: "payments",
  },
];

// Add additional routes based on user status
// if (status === "active") {
//   routes = [
//     ...routes,
//     {
//       path: '/account/post',
//       icon: <HomeIcon className={iconClasses}/>,
//       name: 'Post',
//     },
//     {
//       path: '/account/houses',
//       icon: <HomeIcon className={iconClasses}/>,
//       name: 'Houses',
//     }
//   ];
// }

export default routes;
