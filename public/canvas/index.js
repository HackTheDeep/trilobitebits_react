var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var imageWidth
var imgData
var data
var center
var freqMax
var freqMin
var image = new Image()
image.onload = () => {
  imageWidth = image.width
  canvas.width = imageWidth
  canvas.height = image.height
  center = Math.floor(imageWidth/2)
  freqMax = image.height / 15
  freqMin = 10
  ctx.drawImage(image, 0, 0)
  imgData = ctx.getImageData(0, 0, image.width, image.height)
  data = imgData.data
  makeGrayscale(imgData)
  ctx.putImageData(imgData, 0, 0)
  var line = verticalLine(imgData, Math.floor(imageWidth/2))
  var troughPositions = findTroughs(line)
  ctx.beginPath()
  ctx.moveTo(center, 0)
  ctx.lineTo(center, image.height)
  ctx.width = 5
  ctx.stroke()
  ctx.strokeStyle = "#f00"
  drawHorizontalLines(troughPositions)
}

image.src = "trilobite.jpg"

function drawHorizontalLines(heights){
  for (var i = 0; i < heights.length; i++){
    drawHorizontalLine(heights[i])
  }
}

function drawHorizontalLine(y){
  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(imageWidth, y)
  ctx.width = 3
  ctx.stroke()
}

function makeGrayscale(imgData){
  var pixels = imgData.data
  for (var i = 0; i < pixels.length; i+=4){
    var grayscale = pixels[i] * 0.3 + pixels[i+1] * 0.59 + pixels[i+2] * 0.11
    pixels[i] = pixels[i+1] = pixels[i+2] = Math.pow(grayscale, 1.2)
  }
}

function verticalLine(imgData, x){
  var line = []
  for (var i = 0; i < image.height; i++){
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
  return data[y*imageWidth*4 + x*4]
}

function findTroughs(line){
  var falling = true
  var troughPositions = []
  var interval
  for (var i = 5; i < line.length; i++){
    if (falling && line[i] > line[i-5]){
      // interval = (i-5) - troughPositions[troughPositions.length - 1]
      // if ((freqMin < interval && interval < freqMax) || troughPositions.length == 0){
        troughPositions.push(i-5)
      // }
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