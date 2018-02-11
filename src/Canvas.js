import React, { Component } from 'react';

class Canvas extends Component {
  componentDidMount(){
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      imgData = ctx.getImageData(0, 0, image.width, image.height)
      makeGrayscale(imgData)
      ctx.putImageData(imgData, 0, 0)
      drawHorizontalLines(this.props.lines)
    }
    img.src = this.props.image
  }

  render() {
    return (
      <canvas id="canvas"></canvas>
    );
  }

  drawHorizontalLines(heights){
    for (var i = 0; i < heights.length; i++){
      drawHorizontalLine(heights[i])
    }
  }

  drawHorizontalLine(y){
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(imageWidth, y)
    ctx.width = 3
    ctx.stroke()
  }

  makeGrayscale(imgData){
    var pixels = imgData.data
    for (var i = 0; i < pixels.length; i+=4){
      var grayscale = pixels[i] * 0.3 + pixels[i+1] * 0.59 + pixels[i+2] * 0.11
      pixels[i] = pixels[i+1] = pixels[i+2] = Math.pow(grayscale, 1.2)
    }
  }

}

export default Canvas;
