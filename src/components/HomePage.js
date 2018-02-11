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
      lines: 0,
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
            <button type="submit" className="upload--image btn btn-success">Upload</button>
          </form>
        </div>

        <div className="collection">
        </div>
      </div>
    )
  }

  // Sets the state to image uploaded
  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  // Will get image and send to upload
  onFormSubmit(e) {
    e.preventDefault()

    this.imageUpload(this.state.file)
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
  }
}

export default HomePage
