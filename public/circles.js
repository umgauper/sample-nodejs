var Waves = function() {
    this.color = Waves.defaults.COLOR;
};

Waves.prototype = Object.create(Object.prototype);

Waves.defaults = {
    COLOR: "#00ED00",
    COLORS: ["crimson", "lightcoral", "gold", "yellow", "seagreen", "darkcyan", "mediumblue", "purple", "dimgrey"],
    WIDTH: 200,
    MAXITERATIONS: 1,
    INTERVAL: 1,
    RATEOFINCREASE: 1
};

Waves.prototype.init = function(){

    // build controls
    this._$box = $("<div id='box'></div>");
    this._$box.height(window.innerHeight);
    this._$box.width(window.innerWidth);

    this._$controlBox = $("<div></div>")
        .css({zIndex: 1000})
        .width(window.innerWidth);

    this._$diameterInputLabel = $("<label>Diameter</label>")
        .css({color: "#FFFFFF"});

    this._$diameterInput = $("<input type='number'/>")
        .val(Waves.defaults.WIDTH)
        .width(50);

    this._$controlBox.append(this._$diameterInputLabel);
    this._$controlBox.append(this._$diameterInput);
    
    //$("body").append(this._$controlBox);
    $("body").append(this._$box);
    
    // attach event handlers
    this._$diameterInput.on("change", function (e) {
        this.diameter = $(e.target).val();
    }.bind(this));

    this._$box.on("mousedown", function () {
        this.isMouseDown = true;
    }.bind(this));

    this._$box.on("mousemove", this.drawCircles.bind(this));
    this._$box.on("mouseup", function () {
        this.isMouseDown = false;
    }.bind(this));
};

Waves.prototype.diameter = 0;

Waves.prototype.isMouseDown = false;

Waves.prototype.drawCircles = function(e) {

    var iterations = 0;

    var createCircle = (function(width, xPos, yPos) {
        return function() {

            var marginLeft = xPos - 1/2 * width - 8;
            var marginTop = yPos - 1/2 * width - 28;

            var styles = {marginTop: marginTop, marginLeft: marginLeft, border: `2px solid ${this.color}`};
            this._$box.append($("<div></div>").addClass("circle").width(width).height(width).css(styles));

            if (iterations > Waves.defaults.MAXITERATIONS) {
                clearInterval(intervalId);
            }

            iterations++;

            width = width * Waves.defaults.RATEOFINCREASE;
        }.bind(this);

    }.bind(this))(this.diameter || Waves.defaults.WIDTH, e.pageX, e.pageY);

    if (this.isMouseDown) {
        var intervalId = setInterval(createCircle, Waves.defaults.INTERVAL);
    }
};

Waves.prototype.buildPalette = function () {

    var palette = $("<div id='palette'></div>");

    Waves.defaults.COLORS.forEach(function(color) {
        var $colorDiv = $("<div></div>");
        $colorDiv.width(20);
        $colorDiv.height(20);
        $colorDiv.css({ backgroundColor: color, display: "inline-block" });

        $colorDiv.on("click", function (e) {
            e.stopPropagation();
            this.color = e.target.style.backgroundColor;
        }.bind(this));
        palette.append($colorDiv);
    }.bind(this));

    return palette;
};

// TODO: Add controls to change color, width, speed, shape
// Fix centering of circle
// Make circles follow mouse click and drag
// Make images saveable
// Thread Art...?
// Then have Math mode
// that shows the function(s) change, as you change the controls
// Circles
// Selectable color themes (pull from Cooler)
$(document).ready(() => {
    var waves = new Waves();
    waves.init();
});