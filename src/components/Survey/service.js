import firebase from "gatsby-plugin-firebase"
import { useLayoutEffect } from "react"
import * as Sentry from "@sentry/gatsby"

export const logIn = async () => {
  await firebase?.auth().signInAnonymously()
}

export const saveAnswers = async (recaptcha_token, data) => {
  const userToken = await firebase.auth().currentUser.getIdToken()
  // console.log({ userToken, recaptcha_token })

  const response = await fetch("/.netlify/functions/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-recaptcha-token": recaptcha_token,
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    Sentry.captureMessage(error.message || error)
    throw new Error(error)
  }

  return await response.json()
}

export const startSurvey = async recaptcha_token => {
  const startTime = Date.now()
  await saveAnswers(recaptcha_token, { startTime })
}
// TODO we should await here too
export const setAnswers = async (recaptcha_token, data) => {
  const lastSubmit = Date.now()
  await saveAnswers(recaptcha_token, { lastSubmit, ...data })
}

export const useAuth = (clk, deps = []) => {
  useLayoutEffect(() => {
    if (!firebase.auth) return
    logIn()
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        clk(user)
      }
    })
  }, [firebase, ...deps])
}
