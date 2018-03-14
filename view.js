
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Shape.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
};
Rectangle.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.rect(this.x1, this.y1, this.width, this.height);
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
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

    if(shape instanceof Line)
        li.appendChild(document.createTextNode(' Line (' + (shape.x1 | 0) +',' + (shape.y1 | 0) + ',' + (shape.y2 | 0) + ',' + (shape.y2 | 0) + ')'));
    else if(shape instanceof Rectangle)
        li.appendChild(document.createTextNode(' Rectangle (' + (shape.x1 | 0) +',' + (shape.y1 | 0) + ',' + shape.width + ',' + shape.height + ')'));
    shapeList.appendChild(li);
};

Drawing.prototype.deleteShape = function(id){
    var li = document.getElementById('shape_'+id);
    li.remove();
    this.removeShape(id);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.paint(ctx, canvas);
};
