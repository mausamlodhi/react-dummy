import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { UserHeader, UserFooter } from '../../components'
import AppLayout from '../App/index.layout'
// import AppLayout from "../Auth/index.layout";
// import { Footer, Header } from "../../components";
// import { moduleRoutesList } from "../../routes";
// import AppLayout from "../Auth/index.layout";

function PublicLayout() {
  const location = useLocation()

  // const getmoduleRoutesList = moduleRoutesList();
  // let user = "user";

  // let userRole = userData?.user_type ?? user;
  const navigate = useNavigate()
  const [redirectpath, setRedirectPath] = useState('')

  useEffect(() => {
    if (redirectpath) {
      navigate(redirectpath)
    }
  }, [redirectpath])

  const checkURL = [
    '/signup',
    '/loops-join',
    '/loops-request',
    '/login',
    '/video-call'
  ]

  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      {!checkURL?.includes(location?.pathname) ? (
        <>
          {/* <UserHeader /> */}
          <Outlet />
          {/* <UserFooter /> */}
        </>
      ) : (
        <Outlet />
      )}
    </AppLayout>
  )
}

export default PublicLayout
