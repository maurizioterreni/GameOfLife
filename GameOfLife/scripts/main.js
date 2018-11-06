var gridOptions = {
    color: '#f2f2f2',
    GridSize: 15,
    LinesSize: 1
};
var ctx, canvas;
function displayGrid() {
    var i, Height, Width, GridSize;
    canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        var Height = canvas.height;
        var Width = canvas.width;
        ctx.strokeStyle = gridOptions.color;
        ctx.lineWidth = parseInt(gridOptions.LinesSize);
        GridSize = 0;
        GridSize = parseInt(gridOptions.GridSize);
        for (i = 0; i < Height; i += GridSize) {
            ctx.moveTo(0, i);
            ctx.lineTo(Width, i);
            ctx.stroke();
        }
        for (i = 0; i < Width; i += GridSize) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, Height);
            ctx.stroke();
        }
    }
}
function changeColor() {
    var e = document.getElementById("ddlcolor");
    var _color = e.options[e.selectedIndex].value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gridOptions.color = _color;
    ctx.strokeStyle = _color;
    ctx.stroke();
}
function changeSize() {
    var e = document.getElementById("ddlSize");
    var _size = e.options[e.selectedIndex].value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gridOptions.LinesSize = _size;
    ctx.lineWidth = _size;
    ctx.stroke();
}
function changeGridSpace() {
    var e = document.getElementById("ddlSpace");
    var _gridsize = e.options[e.selectedIndex].value;
    canvas.width = canvas.width;
    gridOptions.GridSize = _gridsize;
    displayImage();
}
