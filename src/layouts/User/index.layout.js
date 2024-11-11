import React, { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
// import { AppLayout } from "..";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../styles/scss/frontend/frontend.scss"
// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss"
import "lightgallery/scss/lg-zoom.scss"

import SocketProvider from "context/socket.context"

// import { decodeQueryData, navigateWithParam } from "../../utils";

function UserLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  useEffect(() => {
    let pathPattern = /[ ]$/g
    if (pathPattern.test(pathname)) {
      navigate(pathname.replace(pathPattern, ""), { replace: true })
    }
  }, [pathname])

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  )
}

export default UserLayout
