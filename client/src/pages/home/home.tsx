import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isValid } from '../../validation/isValid';
import logo from '../../assets/images/logo.png';
import arrow from '../../assets/images/arrow.svg';
import facebook from '../../assets/images/facebook.png';
import facebookw from '../../assets/images/facebook_white.png';
import instagram from '../../assets/images/instagram.png';
import instagramw from '../../assets/images/instagram_white.png';
import twitter from '../../assets/images/twitter.png';
import twitterw from '../../assets/images/twitter_white.png';
import youtube from '../../assets/images/youtube.png';
import youtubew from '../../assets/images/youtube_white.png';
import success from '../../assets/images/success.png';
import styles from './home.module.scss';

const Home = () => {

  const today = new Date(),
    date = today
      .getFullYear() + '-' + (today
        .getMonth() + 1) + '-' + today
          .getDate()
          .toString()

  const [email, setEmail] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [checked, setChecked] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [subscribe, setSubscribe] = useState<boolean>(false)

  const onCheck = () => {
    if (checked === false) {
      setError('You must accept the terms and conditions')
      setIsDisabled(true)
    } else if (isValid(email) !== '') {
      setError(isValid(email))
      setIsDisabled(true)
    } else {
      setError('')
      setIsDisabled(false)
    }
  }

  useEffect(() => {
    onCheck()
  })

  const onSubmit = () => {
    axios.post('/api/insert', {
      email: email,
      provider: (email
        .replace(/.*@/, ""))
        .replace(/\..+/, ""),
      date: date
    })
    setSubscribe(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.base}>
        <div className={styles.bar}>
          <div
            className={styles.logo_wrapper}
            onClick={() => setSubscribe(false)}
          >
            <img
              src={logo}
              alt="logo"
            />
          </div>
          <div className={styles.links}>
            <a className={styles.link} href="#">About</a>
            <a className={styles.link} href="#">How it works</a>
            <a className={styles.link} href="#">Contact</a>
          </div>
        </div>
        <div className={styles.subscribe}>
          {subscribe === false ? (
            <>
              <h3 className={styles.heading}>
                Subscribe to newsletter
                </h3>
              <div className={styles.subheading}>
                Subscribe to our newsletter and get 10% discount on pineapple glasses.
                </div>
              <div className="form">
                <div className={styles.subscribe_wrapper}>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={email}
                    className={styles.input}
                    placeholder="Type your email address here…"
                  />
                  <div className={styles.button_wrapper}>
                    <button
                      disabled={isDisabled}
                      className={styles.button}
                      onClick={onSubmit}
                    >
                      <img
                        className={styles.button_arrow}
                        src={arrow}
                        alt="arrow"
                      />
                    </button>
                  </div>
                </div>
                <div
                  className={styles.error}
                >
                  {error}
                </div>
                <br />
                <input
                  className={styles.checkbox}
                  id="checkbox"
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <span
                  className={styles.agree}
                >
                  <label htmlFor="checkbox">I agree to </label>
                </span>
                <a
                  className={styles.sub_link}
                  href="#">terms of service
                </a>
              </div>
            </>
          ) : (
            <div className={styles.subscribed}>
              <div
                className={styles.image_wrapper}>
                <img
                  src={success}
                  alt="subscribed"
                />
              </div>
              <h3 className={styles.heading}>
                Thanks for subscribing!
                  </h3>
              <div className={styles.subheading}>
                You have successfully subscribed to our email listing.
                Check your email for the discount code.
                  </div>
            </div>
          )}
          <hr className={styles.line} />
          <div className={styles.social}>
            <div className={styles.facebook}>
              <img
                src={facebook}
                alt="facebook"
              />
              <img
                src={facebookw}
                alt="facebook"
              />
            </div>
            <div className={styles.instagram}>
              <img
                src={instagram}
                alt="instagram"
              />
              <img
                src={instagramw}
                alt="instagram"
              />
            </div>
            <div className={styles.twitter}>
              <img
                src={twitter}
                alt="twitter"
              />
              <img
                src={twitterw}
                alt="twitter"
              />
            </div>
            <div className={styles.youtube}>
              <img
                src={youtube}
                alt="youtube"
              />
              <img
                src={youtubew}
                alt="youtube"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  )
}

export default Home;
