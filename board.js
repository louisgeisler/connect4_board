const board = document.getElementById("board");
const colors = ["yellow", "red"];
let i = 0;

board.onload = () => {

    let svgDoc = board.contentDocument;
    let svg_el = svgDoc.getElementsByTagName('svg')[0]
    svg_el.style.width = "100%";
    svg_el.style.height = "100%";

    let columns = svgDoc.getElementById("columns");
    
    columns.onclick = function(e) {
        e = e || window.event;
        let column_num = parseInt(e.target.attributes['inkscape:label'].nodeValue);
        add_pawn(column_num);
    };

    let dict_column2element = {};
    let dict_column2pawn_number = {};
    for(let e of columns.children) {
        dict_column2element[parseInt(e.attributes['inkscape:label'].nodeValue)] = e;
        dict_column2pawn_number[parseInt(e.attributes['inkscape:label'].nodeValue)] = 0;
    }

    function add_pawn(column, color = null) {

        if (dict_column2pawn_number[column] >= 6) 
            return;
        color = color || colors[i];
        i = (1 - i);
        let e = dict_column2element[column];
        let bb = e.getBBox();
        
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
        let d = bb.width
        let r = d / 2
        let cy = bb.y + bb.height - d * (dict_column2pawn_number[column]) - r;
        newElement.setAttribute("cx", bb.x + r);
        newElement.setAttribute("r", r);
        newElement.setAttribute("fill", color);
        columns.appendChild(newElement);

        var animate = document.createElementNS("http://www.w3.org/2000/svg", 'animate'); //Create a path in SVG's namespace
        animate.setAttribute("attributeName", "cy");
        animate.setAttribute("fill", "freeze");
        animate.setAttribute("from", "0");
        animate.setAttribute("to", cy);
        animate.setAttribute("dur", "1s");
        animate.setAttribute("repeatCount", "1");
        animate.setAttribute("values", "0; "+Math.round(cy));
        animate.setAttribute("calcMode", "spline");
        animate.setAttribute("keySplines", "0.5 0 0.7 0.2");
        newElement.appendChild(animate);
        animate.beginElement();

        dict_column2pawn_number[column] += 1;
    };
};