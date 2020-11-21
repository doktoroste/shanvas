// create canvas element and append it to document body
let canvas = document.getElementById('shanvas')

// colour and size settings
let lineWidth = 5
let lineCap = 'round'
let strokeStyle = '#000'
let globalCompositeOperation = 'source-over'
let pos = { x: 0, y: 0 }
let drawContent = {
    type: 'draw',
    lineWidth: lineWidth,
    lineCap: lineCap,
    strokeStyle: strokeStyle,
    globalCompositeOperation: globalCompositeOperation,
    fromX: pos.x,
    fromY: pos.y,
    toX: pos.x,
    toY: pos.y,
    canvasHeight: canvas.height,
    canvasWidth: canvas.width,
}

// get canvas 2D context and set him correct size
let ctx = canvas.getContext('2d')
resize()

window.addEventListener('resize', resize)

canvas.addEventListener('mousemove', function (e) {
    if (e.buttons === 1) {
        draw(e.clientX, e.clientY)
    }
})
canvas.addEventListener('mousedown', function (e) {
    setPosition(e.clientX, e.clientY)
})
canvas.addEventListener('mouseenter', function (e) {
    setPosition(e.clientX, e.clientY)
})

canvas.addEventListener('touchmove', function (e) {
    draw(e.touches[0].clientX, e.touches[0].clientY)
})
canvas.addEventListener('touchstart', function (e) {
    setPosition(e.touches[0].clientX, e.touches[0].clientY)
})
canvas.addEventListener('touchend', function (e) {
    setPosition(pos.x, pos.y)
})

function setColour(colour, setButton = false) {
    strokeStyle = colour
    if (setButton) {
        document
            .getElementById('pen')
            .setAttribute('style', 'background-color:' + colour + ';border-color:' + colour)
    }
}

function setWidth(width) {
    lineWidth = width
}

function setOperation(operation) {
    globalCompositeOperation = operation
}

// new position from mouse event
function setPosition(x, y) {
    pos.x = x
    pos.y = y
}

function updateDrawContent(type, fromX = 0, fromY = 0, toX = 0, toY = 0) {
    drawContent.type = type
    drawContent.lineWidth = lineWidth
    drawContent.lineCap = lineCap
    drawContent.strokeStyle = strokeStyle
    drawContent.globalCompositeOperation = globalCompositeOperation
    drawContent.fromX = fromX
    drawContent.fromY = fromY
    drawContent.toX = toX
    drawContent.toY = toY
    drawContent.canvasHeight = canvas.height
    drawContent.canvasWidth = canvas.width
    webSocketSend(shanvasId, drawContent)
}

// resize canvas
function resize() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    updateDrawContent('resize')
    console.log(drawContent)
}

function draw(x, y) {
    ctx.beginPath() // begin

    ctx.lineWidth = lineWidth
    ctx.lineCap = lineCap
    ctx.strokeStyle = strokeStyle
    ctx.globalCompositeOperation = globalCompositeOperation

    ctx.moveTo(pos.x, pos.y) // from
    updateDrawContent('draw', pos.x, pos.y, x, y)
    setPosition(x, y)
    ctx.lineTo(pos.x, pos.y) // to

    ctx.stroke() // draw it!
}

function pen() {
    setColour('#000')
    setWidth(5)
    setOperation('source-over')
    canvas.classList.remove('erase')
    canvas.classList.remove('highlight')
}

function highlight() {
    setColour('#ffff00')
    setWidth(24)
    setOperation('multiply')
    canvas.classList.add('highlight')
    canvas.classList.remove('erase')
}

function erase() {
    setColour('#FFF')
    setWidth(50)
    setOperation('source-over')
    canvas.classList.add('erase')
    canvas.classList.remove('highlight')
}
