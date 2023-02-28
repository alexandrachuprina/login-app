import React, { useRef, useState, useEffect } from 'react';
import '../sass/pages/home.scss'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

export default function Register() {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [matchPass, setMatchPass] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user); // regex method: tests for a match in a string. It returns true or false.

    console.log('result:')
    console.log(result)
    console.log('user:')
    console.log(user)

    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    if (result) {
      setValidPass(true);
    }

    console.log('result:')
    console.log(result)
    console.log('password:')
    console.log(password)

    const match = password === matchPass; // sets true or false
    setValidMatch(match);
  }, [password, matchPass])

  useEffect(() => {
    setErrMessage('')
  }, [user, password, matchPass])

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccess(true);
  }

  return (
    <section className='register'>
      <p ref={errorRef} aria-live='assertive' className={errorMessage ? 'error' : 'offscreen'}>{errorMessage}</p>
      <h1>Register form</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="username">
            <p>Username:</p>
          </label>
          <input
            type="text"
            id='username'
            ref={userRef}
            autoComplete='off'
            required
            onChange={(e) => setUser(e.target.value)}
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          {validName ? <p className='feedback'>Valid</p> : <p className='feedback'>Not valid</p>}
          <p id='uidnote' className={validName ? 'offscreen' : 'instructions'}>
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </span>
        <span>
          <label htmlFor="password">
            <p>Password:</p>
          </label>
          <input
            type="password"
            id='password'
            autoComplete='off'
            required
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={validPass ? 'false' : 'true'}
            aria-describedby='passnote'
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
          />
          {validPass ? <p className='feedback'>Valid</p> : <p className='feedback'>Not valid</p>}
          <p id='passnote' className={!validPass ? 'instructions' : 'offscreen'}>
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </span>
        <span>
          <label htmlFor="confirm">
            <p>Confirm password:</p>
          </label>
          <input
            type="password"
            id='confirm'
            // ref={passwordRef}
            autoComplete='off'
            required
            onChange={(e) => setMatchPass(e.target.value)}
            aria-invalid={validPass ? 'false' : 'true'}
            aria-describedby='matchnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          {matchPass ? <p className='feedback'>Match</p> : <p className='feedback'>Don't match</p>}
          <p id='matchnote' className={!validMatch ? 'instructions' : 'offscreen'}>
            Match note !validMatch = true
          </p>
        </span>
        <button disabled={!validName || !validPass || !validMatch ? true : false}>Sign up</button>
        <span className='sign-in'>
          <p>Already registered?</p>
          <p>Sign in</p>
        </span>
      </form>
    </section >
  )
}
