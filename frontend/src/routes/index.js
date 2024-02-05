// All components mapping with path for internal routes

import { lazy } from 'react'

const AddAdmin = lazy(() => import('../Admin/AddAdmin'))
const Category = lazy(() => import('../Admin/Category'))
const ClientContactUs = lazy(() => import('../Admin/ClientContactUs'))
const GetAllDetails = lazy(() => import('../Admin/GetAllDetails'))
const HelpCenterAdmin = lazy(() => import('../Admin/HelpCenterAdmin'))
const NewsLetter = lazy(() => import('../Admin/NewsLetter'))
const propertyType = lazy(() => import('../Admin/PropertType'))
const AllHouses = lazy(() => import('../Renting/AllHouses'))
const Status = lazy(() => import('../Admin/Stats'))
const User = lazy(() => import('../Admin/User'))



const routes = [
  {
    path: '/analytics',
    component: Status,
  },
  {
    path: '/User',
    component: User,
  },
  {
    path: '/addAdmin',
    component: AddAdmin,
  },
  {
    path: '/Category',
    component: Category,
  },
  {
    path: '/propertyType',
    component: propertyType,
  },
  {
    path: '/AllHouses',
    component: AllHouses,
  },
  {
    path: '/newsLetter',
    component: NewsLetter,
  },
  {
    path: '/question',
    component: ClientContactUs,
  }, 
  {
    path: '/issues',
    component: HelpCenterAdmin,
  },


]

export default routes
