import React, { Component } from 'react';

// Example:
// <Canvas image="imageurl.jpg" segments={[1, 2, 3, 4]}  width=320 />

class Canvas extends Component {

  componentDidMount(){
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      var width = this.props.width || img.width
      canvas.style.width = width
      canvas.style.height = image.height * (width / image.width)
      ctx.drawImage(img, 0, 0)
      var imgData = ctx.getImageData(0, 0, img.width, img.height)
      this.makeGrayscale(imgData)
      ctx.putImageData(imgData, 0, 0)
      this.drawHorizontalLines(ctx, this.props.segments, img.width)
    }
    img.src = this.props.image
  }

  render() {
    return (
      <canvas id="canvas"></canvas>
    );
  }

  drawHorizontalLines(ctx, heights, width){
    for (var i = 0; i < heights.length; i++){
      this.drawHorizontalLine(ctx, heights[i], width)
    }
  }

  drawHorizontalLine(ctx, y, width){
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.width = 3
    ctx.stroke()
  }

  makeGrayscale(imgData){
    var pixels = imgData.data
    for (var i = 0; i < pixels.length; i+=4){
      var grayscale = pixels[i] * 0.3 + pixels[i+1] * 0.59 + pixels[i+2] * 0.11
      pixels[i] = pixels[i+1] = pixels[i+2] = 255 - Math.pow(255 - grayscale, 1.2)
    }
  }

}

export default Canvas;
