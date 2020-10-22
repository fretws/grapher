"use-strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    let go = id("go");
    // go.addEventListener("click", generateGraph);
    go.addEventListener("click", genLine);
  }

  function genLine() {
    let svg = qs("svg");
    let line = gen("line");
    let x1 = "0";
    let y1 = "0";
    let x2 = "50";
    let y2 = "100";
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    // line.style.transformOrigin = "0px 0px";
    svg.appendChild(line);
  }

  function generateGraph() {
    let n = parseInt(id("vertices").value);
    let p = parseFloat(id("edge density").value);

    let graph = id("graph");
    let nodes = graph.childNodes;
    while (nodes.length > 0) { // For now, 'nodes' is a misnomer since it likely contain edges too
      graph.removeChild(nodes[0]);
    }
    let svg = gen("svg");
    graph.appendChild(svg);
    for (i = 0; i < n; i++) {
      let node = gen("div");
      node.classList.add("node");
      // This is breaking the separation of concerns, but in this case it is necessary, since CSS
      // cannot know how many nodes are in the graph at any given time (as far as I know).
      node.style.margin = 0; // 25.0 / Math.sqrt(n) + "%";
      graph.appendChild(node);
    }

    for (u = 0; u < n; u++) {
      for (v = u; v < n; v++) {
        if (Math.random() < p) {
          drawLine(svg, nodes[u], nodes[v]);
        }
      }
    }

  }

  function drawLine(svg, u, v) {
    let line = gen("line");
    let x1 = "0";
    let y1 = "0";
    let x2 = "100";
    let y2 = "100";
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    svg.appendChild(line);
    // let x1 = u.offsetLeft;
    // let y1 = u.offsetTop;
    // let x2 = v.offsetLeft;
    // let y2 = v.offsetTop;
    // svg.setAttribute("width", Math.abs(x1 - x2));
    // svg.setAttribute("height", Math.abs(y1 - y2));
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
