// All components mapping with path for internal routes

import { lazy } from 'react'


const Account = lazy(() => import('../user/UserProfile'))
const Profile = lazy(() => import('../user/ChangeProfile'))
const Appointment = lazy(() => import('../user/Appointment'))
const Post = lazy(() => import('../user/AddingHouse'))
const Houses = lazy(() => import('../user/UserHouse'))




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
]

export default routes