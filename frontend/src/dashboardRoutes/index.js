// All components mapping with path for internal routes

import { lazy } from 'react'

const Category = lazy(() => import('../Admin/Category'))
const ClientContactUs = lazy(() => import('../Admin/ClientContactUs'))
const HelpCenterAdmin = lazy(() => import('../Admin/HelpCenterAdmin'))
const NewsLetter = lazy(() => import('../Admin/NewsLetter'))
const propertyType = lazy(() => import('../Admin/PropertType'))
const AllHouses = lazy(() => import('../Renting/AllHouses'))
const AddHouses = lazy(() => import('../Admin/AddHouse'))
const Status = lazy(() => import('../Admin/Stats'))
const User = lazy(() => import('../Admin/User'))
const CreateUser = lazy(() => import('../Admin/CreateUser'))
const allPosts = lazy(() => import('../Renting/AllPosts'))
const request = lazy(() => import('../componets/AllRequest'))



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
    path: '/createUser',
    component: CreateUser
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
    path: '/addHouses',
    component: AddHouses,
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
  {
    path: '/allPosts',
    component: allPosts,
  },

  {
    path: '/request',
    component: request,
  },


]

export default routes
