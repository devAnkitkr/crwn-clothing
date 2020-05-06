import React, { Component } from 'react'
import './sign-in.styles.scss'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import { auth, SignInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })

    }
    handleSubmit = (event) => {
        event.preventDefault()

        const { email, password } = this.state

        auth.signInWithEmailAndPassword(email, password).then(() => {
            this.setState({
                email: '',
                password: ''                       
            })
        }).catch(error=>alert(error.message))
    }
    render() {
        const {email,password} = this.state
        return (
            <div className='sign-in'>
                <h3>I already have an account</h3>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        handleChange={this.handleChange}
                        label='Email'
                        value={email} required />
                    <FormInput
                        type='password'
                        name='password'
                        handleChange={this.handleChange}
                        label='Password'
                        value={password} required />
                    <div className='buttons'>
                        <CustomButton type='submit'> SIGN IN</CustomButton>
                        <CustomButton type='button' isGoogleSignIn onClick={SignInWithGoogle}>SIGN IN with GOOGLE</CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignIn
