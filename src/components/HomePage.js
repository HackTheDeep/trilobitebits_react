import React, { Component } from 'react'
import axios from 'axios'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.imageUpload = this.imageUpload.bind(this)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" onChange={this.onChange}/>
        <button type="submit">Upload</button>
      </form>
    )
  }

  // Sets the state to image uploaded
  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  // Will get image and send to upload
  onFormSubmit(e) {
    e.preventDefault()

    this.imageUpload(this.state.file).then(res => {
      console.log(res.data)
    })
  }

  // Uploads image to webserver
  imageUpload(file) {
    const url = 'http://example.com/handleDataExample'
    const formData = new FormData()
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post(url, formData, config)
  }

}

export default HomePage
