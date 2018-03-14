
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
    this.xBegin = 0;
    this.yBegin = 0;
    this.xEnd = 0;
    this.yEnd = 0;
    var isPressed = false;
	// Developper les 3 fonctions gérant les événements
    this.pressure = function(evt){
      isPressed = true;
      var position = getMousePosition(canvas,evt);
      this.xBegin =this. xEnd = position.x;
      this.yBegin = this.yEnd = position.y;
      interactor.onInteractionStart(this);
    }.bind(this);
    this.movement = function(evt){
      if(isPressed){
        var position = getMousePosition(canvas,evt);
        this.xEnd = position.x;
        this.yEnd = position.y;
        interactor.onInteractionUpdate(this);
      }
    }.bind(this);
    this.release = function(evt){
      if(isPressed){
        interactor.onInteractionEnd(this);
        isPressed = false;
      }
    }.bind(this);
	// Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.pressure, false);
    canvas.addEventListener('mousemove', this.movement, false);
    canvas.addEventListener('mouseup', this.release, false);
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



