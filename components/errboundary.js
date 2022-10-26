import React from "react"
import Button from "./button/Button"
import ImageContainer from "./imagecontainer/ImageContainer"
import MainArea4 from "./layoutV4/MainArea4"
import { withRouter } from 'next/router'

export default withRouter(class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    console.error(error)
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <MainArea4>
          <div className="flex flex-col justify-center">
            <div className="text-center text-3xl">
              <h2>Oops, we goofed!</h2>
              <h2>Please let us know on Discord uWu</h2>
            </div>
            <p className="text-center mb-32">https://discord.gg/vR6RCxk25w</p>
              <Button 
                text={"Back"}
                onClick={() => {
                  // this.setState({ hasError: false })
                  this.props.router.push("/")
                  this.setState({ hasError: false })
                }}
              />

              <ImageContainer url="/images/image1.svg" height={32} />
            
          </div>
        </MainArea4>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
})
