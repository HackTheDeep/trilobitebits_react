import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// All components for homepage
import NavBar from './NavBar'
import DisplayImages from './DisplayImages'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      lines: 0,
      ready: false,
    }

    this.components = {
      ComponentOne: <DisplayImages />
    }

    // Adds binding to all functions
    this.onChange = this.onChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.imageUpload = this.imageUpload.bind(this)
    this.displayPanel = this.displayPanel.bind(this)
  }

  render() {
    return (
      <div className="main--header" data-reset-cookie-tab>
        <NavBar />

        <div className="upload--panel">
          <h3 className="text-primary text--submit">Please submit specimen</h3>
          <form onSubmit={this.onFormSubmit}>
            <input className="choose--file" type="file" onChange={this.onChange}/>
          </form>
        </div>

        <div className="collection">
              <DisplayImages originalImg={this.state.imagePreviewUrl} lines={[22,56,81,112,161,183,225,254,276,297,323,366,394]} />
        </div>
      </div>
    )
  }

  // Sets the state to image uploaded
  onChange(e) {
    e.preventDefault();
    // this.setState({ready: false})

    let reader = new FileReader()
    let file   = e.target.files[0]
    // setTimeout(() => {
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result,
      //   ready: true,
      // })
    // }, 1000)
    reader.addEventListener("load", () => this.setState({file: file, imagePreviewUrl: reader.result, ready: true}))
    reader.readAsDataURL(file)
  }

  // Will get image and send to upload
  onFormSubmit(e) {
    // e.preventDefault()

    // if(this.state.ready) {
      // this.imageUpload(this.state.file)
      // console.log(e.target)
      // this.setState({ready: false})
    // }

    // this.displayPanel()
  }

  // Uploads image to webserver
  imageUpload(file) {
    const url = 'http://localhost:5000/upload'
    const formData = new FormData()
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post(url, formData, config).then((res) => {
      this.displayPanel(res.data)
    })
  }

  // TODO
  // Append component to the collection class
  // Give it components to render
  displayPanel(data) {
    ReactDOM.render(<DisplayImages originalImg={this.state.imagePreviewUrl} lines={[22,56,81,112,161,183,225,254,276,297,323,366,394]} />, document.querySelector('.collection'))

    this.setState({ready: true})
  }
}

export default HomePage
