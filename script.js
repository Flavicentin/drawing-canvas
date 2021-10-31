//passo a passo para desenhar no canvas
// 1 - Click no mouse -> ativar o modo desenho
// 2 - Movimento do mouse, quando click no mouse for verdadeiro -> desenhar
// 3 - Quando soltar o click -> desativar o modo desenho


//initial data
let currentColor = 'black';

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0; 

//events
document.querySelectorAll('.colorArea .color').forEach(item =>{
  item.addEventListener('click', colorClickEvent);
});
//monitorar os eventos do mouse
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

//botão limpa tela
document.querySelector('.clear').addEventListener('click', clearScreen);

//functions
function colorClickEvent(event){
  //verificar que cor peguei
  let color = event.target.getAttribute('data-color');
  // console.log(color);
  currentColor = color;
  //tirar a classe (Active) da cor preta, e colocar na cor selecionada
  //quem tiver com a classe (active), sera removida => .remove
  document.querySelector('.color.active').classList.remove('active');
  //adicionando a classse (Active) na cor selecionada
  event.target.classList.add('active');
}

function mouseDownEvent(event) {
  // console.log("Clicou no mouse");
  canDraw = true;
  mouseX = event.pageX - screen.offsetLeft;
  mouseY = event.pageY - screen.offsetTop;
}

function mouseMoveEvent(event) {
  // console.log("Moveu o mouse");
  if (canDraw){
    console.log(mouseX, mouseY);
    draw(event.pageX, event.pageY);
  }
}

function mouseUpEvent() {
  // console.log("Largou o mouse");
  canDraw = false;
  
}

function draw(x, y) {
  console.log("ta vindo na parte de draw");
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  // desenhar 
  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
}