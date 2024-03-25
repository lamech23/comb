// All components mapping with path for internal routes

import { lazy, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";



const Account = lazy(() => import('../user/UserProfile'))
const Profile = lazy(() => import('../user/ChangeProfile'))
const Appointment = lazy(() => import('../user/Appointment'))
const Post = lazy(() => import('../user/AddingHouse'))
const Houses = lazy(() => import('../user/UserHouse'))
const AboutUser = lazy(() => import('../user/MoreAboutUser'))




const routes = [
  {
    path: '/',
    component: Account,
  },
  {
    path: '/profile/:id',
    component: Profile,
  },

  {
    path: '/appointment/:id',
    component: Appointment,
  },

  {
    path: '/post',
    component: Post,
  },
  {
    path: '/houses',
    component: Houses,
  },
  {
    path: '/userVerification',
    component: AboutUser,
  },
]

export default routes
