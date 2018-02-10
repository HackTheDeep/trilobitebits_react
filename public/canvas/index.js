var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var imageWidth
var image = new Image()
image.onload = () => {
  imageWidth = image.width
  canvas.width = imageWidth
  ctx.drawImage(image, 0, 0)
  var imgData = ctx.getImageData(0, 0, image.width, image.height)
  makeGrayscale(imgData)
  ctx.putImageData(imgData, 0, 0)
  drawLines([10, 70, 150, 200, 300])
}

image.src = "trilobite.jpg"

function drawLines(heights){
  for (var i = 0; i < heights.length; i++){
    drawLine(heights[i])
  }
}

function drawLine(y){
  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(imageWidth, y)
  ctx.stroke()
}

function makeGrayscale(imgData){
  var pixels = imgData.data
  for (var i = 0; i < pixels.length; i+= 4){
    var grayscale = pixels[i] * 0.3 + pixels[i+1] * 0.59 + pixels[i+2] * 0.11
    grayscale = Math.pow(grayscale, 1.2)
    pixels[i] = pixels[i+1] = pixels[i+2] = grayscale
  }
}