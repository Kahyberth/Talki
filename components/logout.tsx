

import React from 'react'
import { signOut } from "next-auth/react"
export default function LogoutButton() {
  return (
    <button onClick={() => signOut(
        {
            redirect: true,
            callbackUrl: "/",
        }
    )}>
      Sign out
    </button>
  )
}
