import React, { useEffect, useState } from 'react'
import { account } from '../appwrite/Appwrite'

const Account = () => {

  const [userinfo, setUserinfo] = useState();


  // APPWRITE CONFIGURATION
  useEffect(() => {
    const userData = account.get();
    userData.then(function (response) {
      setUserinfo(response);
    }, function (error) {
      console.log(error);
    })
  }, [])

  return (
    <>
      <div>Account</div>
      {
        userinfo ? (
          <>
            <i>{userinfo.name}</i>
            <br />
            <i>{userinfo.email}</i>
          </>
        ) : (
          <i>user info loading...</i>
        )
      }
    </>
  )
}

export default Account;