
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Shape.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
};
Rectangle.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.rect(this.xBegin, this.yBegin, this.width, this.height);
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.xBegin, this.yBegin);
    ctx.lineTo(this.xEnd, this.yEnd);
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapes.forEach(function(eltDuTableau) {
        // now fill the canvas
        eltDuTableau.paint(ctx);
    });
};

Drawing.prototype.updateShapeList = function(){
    var shapeList = document.getElementById('shapeList');
    var li = document.createElement('li');
    var button = document.createElement('button');
    var span = document.createElement('span');

    li.setAttribute('class', 'list-group-item');
    button.setAttribute('class', 'btn btn-default');
    span.setAttribute('class','glyphicon glyphicon-remove-sign');

    var index = this.shapes.length-1;
    li.setAttribute('id', 'shape_'+index);
    button.setAttribute('id', 'button_'+index);
    button.setAttribute('onClick', 'drawing.deleteShape('+index+')');
    var shape = this.shapes[index];

    button.appendChild(span);
    li.appendChild(button);

    if(shape instanceof Rectangle)
        li.appendChild(document.createTextNode(' Rectangle (' + (shape.xBegin | 0) +',' + (shape.yBegin | 0) + ',' + shape.width + ',' + shape.height + ')'));
    else if(shape instanceof Line)
        li.appendChild(document.createTextNode(' Line (' + (shape.xBegin | 0) +',' + (shape.yBegin | 0) + ',' + (shape.yEnd | 0) + ',' + (shape.yEnd | 0) + ')'));
    shapeList.appendChild(li);
};

Drawing.prototype.deleteShape = function(index){
    var li = document.getElementById('shape_'+index);
    var index = $(li).index();
    li.remove();
    this.removeShape(index);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.paint(ctx, canvas);
};