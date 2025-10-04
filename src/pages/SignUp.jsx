import React from 'react'
import Template from '../components/Template'
import signUpImg from '../assets/signup.jpeg'

const SignUp = ({setIsLoggedIn}) => {
  return <Template
            title="Complete Healthcare Transparency is just one step away"
            image={signUpImg}
            formType="signup"
            setIsLoggedIn={setIsLoggedIn}
         />
}

export default SignUp
