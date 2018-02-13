import React, { Component } from 'react';

// Example:
// <Canvas image="imageurl.jpg" segments={[1, 2, 3, 4]}  width=320 />

class Canvas extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidUpdate(){
    this.componentDidMount()
  }

  componentDidMount(){
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      var width = this.props.width || img.width
      canvas.style.width = width + "px"
      canvas.style.height = (img.height * (width / img.width)) + "px"

      ctx.drawImage(img, 0, 0)
      var imgData = ctx.getImageData(0, 0, img.width, img.height)
      this.makeGrayscale(imgData)
      this.adjustGamma(imgData, 1.1)
      var segments = this.findSegments(imgData, 128)
      this.adjustContrast(imgData, 0.5)
      ctx.putImageData(imgData, 0, 0)
      this.drawHorizontalLines(ctx, this.findSegments(imgData), img.width)
      ctx.fillStyle = "#f00"
      ctx.font = "30px Arial"
      ctx.fillText((segments.length - 1) + " segments found", 30, 30)
    }
    img.src = this.props.image
  }

  render() {
    return (
      <canvas id="canvas"></canvas>
    );
  }

  drawHorizontalLines(ctx, heights, width){
    ctx.strokeStyle = "#f00"
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
      pixels[i] = pixels[i+1] = pixels[i+2] = grayscale
    }
  }

  adjustGamma(imgData, factor){
    var pixels = imgData.data
    for (var i = 0; i < pixels.length; i+=4){
      pixels[i] = pixels[i+1] = pixels[i+2] = Math.pow(pixels[i], factor)
    }
  }

  adjustContrast(imgData, factor){
    var pixels = imgData.data
    for (var i = 0; i < pixels.length; i+=4){
      pixels[i] = pixels[i+1] = pixels[i+2] = this.convertRange(pixels[i], [0, 255], [128 - 128 * factor, 128 + 128 * factor])
    }
  }

  convertRange( value, r1, r2 ) {
      return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
  }

  findSegments(imgData){

    var data = imgData.data
    var center = imgData.width / 2
    var freqMax = imgData.height / 15
    var freqMin = 10

    var line = verticalLine(imgData, Math.floor(imgData.width/2))
    var troughPositions = findTroughs(line)
    return troughPositions

    function verticalLine(imgData, x){
      var line = []
      for (var i = 0; i < imgData.height; i++){
        line[i] = horizontalAverage(i, 10, 10)
      }
      return line
    }

    function horizontalAverage(y, leftMargin, rightMargin){
      var span = leftMargin + rightMargin + 1
      var pixels = []
      for (var i = center - leftMargin; i < center + rightMargin; i++){
        pixels.push(pixelAt(i, y))
      }
      return pixels.reduce((acc, cur) => acc + cur) / span
    }

    function pixelAt(x, y){
      return data[y*imgData.width*4 + x*4]
    }

    function findTroughs(line, threshold = 100){
      var falling = true
      var troughPositions = []
      var interval
      for (var i = 5; i < line.length; i++){
        if (falling && line[i] > line[i-5] && line[i] < threshold){
            troughPositions.push(i-5)
          falling = false
        } else if (line[i] < line[i-5]){
          falling = true
        }
      }
      return troughPositions
    }

    function avg(arr){
      return arr.reduce((acc, cur) => acc + cur) / arr.length
    }
  }

}


export default Canvas;
