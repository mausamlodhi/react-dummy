import { Login, Signup, LoopsJoin, LoopsRequest } from '../../../pages'
import routesMap from '../../../routeControl/userRouteMap'

export default function route() {
  return [
    {
      path: routesMap.LOGIN.path,
      name: '',
      key: routesMap.LOGIN.path,
      commonRoute: true,
      private: false,
      element: <Login />
    },
    {
      path: routesMap.SIGNUP.path,
      name: '',
      key: routesMap.SIGNUP.path,
      commonRoute: true,
      private: false,
      element: <Signup />
    },
    {
      path: routesMap.LOOPSJOIN.path,
      name: '',
      key: routesMap.LOOPSJOIN.path,
      commonRoute: true,
      private: false,
      element: <LoopsJoin />
    },
    {
      path: routesMap.LOOPSREQUEST.path,
      name: '',
      key: routesMap.LOOPSREQUEST.path,
      commonRoute: true,
      private: true,
      element: <LoopsRequest />
    },
    {
      path: routesMap.LANDING_PAGE.path,
      name: '',
      key: routesMap.LANDING_PAGE.path,
      commonRoute: true,
      private: false,
      element: <Login />
      // element: (
      //   <div className="mainContent">
      //     <h1>Landing Page</h1>
      //   </div>
      // ),
    }
  ]
}
