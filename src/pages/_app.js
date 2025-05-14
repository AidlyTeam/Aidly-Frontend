
// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
// ** Store Imports
import { store } from '@/store'
import { Provider } from 'react-redux'
// ** Loader Import
import NProgress from 'nprogress'
// ** Config Imports
import { defaultACLObj } from '@/configs/acl'
import themeConfig from '@/configs/themeConfig'
// ** Third Party Import
import { Toaster } from 'react-hot-toast'
// ** Spinner Import
import Spinner from '@/components/spinner'
// ** Contexts
import { AuthProvider } from '@/context/AuthContext'
// ** Styled Components
import ReactHotToast from '@/components/react-hot-toast'
// ** Component Imports
import Layout from '@/layout/Layout'
import GuestGuard from '@/layout/auth/GuestGuard'
import AuthGuard from '@/layout/auth/AuthGuard'
// ** Global css styles
import '../styles/main.css'
import ThemeComponent from '@/layout/ThemeComponent'
import WindowWrapper from '@/components/window-wrapper'
import AclGuard from '@/layout/auth/AclGuard'

// Civic
import { CivicAuthProvider } from "@civic/auth/react";
import { useState, useEffect } from 'react'

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ✅ Civic callbacks
const onSignIn = (error) => {
  if (error) {
    console.error("❌ Sign-in error:", error)
  } else {
    console.log("✅ User signed in successfully!")
  }
}

const onSignOut = () => {
  console.log("👋 User signed out")
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, pageProps } = props
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Variables
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  // Wrap content with appropriate providers based on client/server rendering
  const renderContent = () => {
    const content = (
      <AuthProvider>
        <ThemeComponent>
          <WindowWrapper>
            <Guard authGuard={authGuard} guestGuard={guestGuard}>
              <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                {getLayout(<Component {...pageProps} />)}
              </AclGuard>
            </Guard>
          </WindowWrapper>

          <ReactHotToast>
            <Toaster position={themeConfig.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
          </ReactHotToast>
        </ThemeComponent>
      </AuthProvider>
    )

    if (isClient) {
      return (
        <CivicAuthProvider
          clientId="4a81963e-17a0-4e7b-9a5a-56314748c6d7" 
          displayMode="redirect"
          onSignIn={onSignIn}
          onSignOut={onSignOut}
        >
          {content}
        </CivicAuthProvider>
      )
    }
    
    return content
  }

  return (
    <Provider store={store}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='description' content={`${themeConfig.templateName}`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      {renderContent()}
    </Provider>
  )
}

export default App
