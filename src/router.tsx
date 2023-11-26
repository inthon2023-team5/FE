import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router'

import SidebarLayout from 'src/layouts/SidebarLayout'
import BaseLayout from 'src/layouts/BaseLayout'

import SuspenseLoader from 'src/components/SuspenseLoader'

const Loader = Component => props =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  )

// Auth

const LoginScreen = Loader(lazy(() => import('src/content/auth/Login')))
const RegisterScreen = Loader(lazy(() => import('src/content/auth/Register')))

// Pages
const QuestionList = Loader(lazy(() => import('src/content/questionList')))

// Applications

const ChatScreen = Loader(lazy(() => import('src/content/chat')))
const UserProfile = Loader(lazy(() => import('src/content/user/profile')))

// Status
const Status404 = Loader(lazy(() => import('src/content/notfound')))

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <QuestionList />
      },
      {
        path: 'school',
        element: <QuestionList />
      },
      {
        path: 'future',
        element: <QuestionList />
      },
      {
        path: 'graduate',
        element: <QuestionList />
      },
      {
        path: 'course',
        element: <QuestionList />
      },
      {
        path: 'chat/:category',
        element: <ChatScreen />
      },
      {
        path: 'chat/:id',
        element: <ChatScreen />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'auth',
    element: <BaseLayout />,
    children: [
      {
        path: 'login',
        element: <LoginScreen />
      },
      {
        path: 'register',
        element: <RegisterScreen />
      }
    ]
  }
]

export default routes
