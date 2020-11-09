import React from "react"
import { Header } from "../Header"
import Crea from "../../assets/Crea.svg"
// import TimeIcon from "../../assets/time.svg"
// import { Link } from "gatsby"

export const Hero = () => (
  <div className="hero">
    <div className="container ">
      <Header />
      <main>
        <div>
          <h1> State Of Dev In Morocco 2020 </h1>
          <p>
            Take part in the survey and let us know what the developer’s job
            really looks like in Morocco 🇲🇦
          </p>
          <div className="actions">
            <a
              className="primary"
              href="https://tinyletter.com/geeksBlabla/"
              target="_blank"
            >
              Get Notified About The Survey
              {/* Take Part In The Survey */}
            </a>
            {/* <p>
              <TimeIcon /> 5 min
            </p> */}
          </div>
        </div>
        <Crea />
      </main>
    </div>
  </div>
)
