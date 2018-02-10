import React, { Component } from 'react'
import axios from 'axios'

class ImageUpload extends Component {
  constructor() {
    super()
    this.state = {
      file:null
    }
  }

  // Sets the state to image uploaded
  onChange(e) {
    this.setState({file: e.state.files[0]})
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

export default ImageUpload
