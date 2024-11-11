import './App.css'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { routes } from './route'

function RouteLayout({ path }) {
  const element = useRoutes(path)
  return element
}

function App() {
  return (
    <>
      <HelmetProvider>
        <Suspense
          fallback={
            <div className='d-flex align-items-center justify-content-center h-100 mainLoader'>
              <Spinner variant='light' animation='border' role='status' />
            </div>
          }
        >
          <RouteLayout path={routes()} />
        </Suspense>
      </HelmetProvider>
    </>
  )
}

export default App
