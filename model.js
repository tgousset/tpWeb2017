
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing(){
    this.shapes = [];
    this.addShape = function (shape) {
        this.shapes.push(shape);
    }.bind(this);
    this.removeShape = function (index) {
        this.shapes.slice(index, 1);
    }.bind(this);
}

function Shape(color, thickness) {
    this.color = color;
    this.thickness = thickness;
}

function Line(xBegin, yBegin, xEnd, yEnd, color, thickness ) {
    Shape.call(this, color, thickness);
    this.xBegin = xBegin;
    this.yBegin = yBegin;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
}
Line.prototype = new Shape();

function Rectangle(xBegin, xEnd, width, height, color, thickness){
    Shape.call(this, color, thickness);
    this.xBegin = xBegin;
    this.xEnd = xEnd;
    this.height = height;
    this.width = width;
}
Rectangle.propotype = new Shape();