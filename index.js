"use-strict";
// Shane Fretwell
// October 20, 2020
// Section AE, Dylan McKone and Josie Lee
//
// This script handles the drawing of graph generation in reaction to user input and window size.
// The goal, to restate, is to have a graph generator that is faster and more useful to me than
// the generator currently employed by Wolfram Alpha.

(function() {
  window.addEventListener("load", init);
  const palette = [
    [205, 0, 0], // red
    [0, 205, 12], // green
    [23, 0, 156] // blue
  ];
  const palette_names = ["red", "green", "blue"];
  let colors = 0;
  let nodes;

  function init() {
    let go = id("go");
    go.addEventListener("click", generateGraph);

  }

  function generateGraph() {
    /* I learned how to use a canvas from
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage */
    let n = parseInt(id("vertices").value);
    let p = parseFloat(id("edge density").value);

    let graph = id("graph");
    if (graph.getContext) {
      let ctx = graph.getContext('2d');
      /* I learned how to get the element height from
      https://www.javascripttutorial.net/javascript-dom/javascript-width-height/ */
      let radius = Math.min(graph.width, graph.height) / 2 - 10;
      let cx = graph.width / 2;
      let cy = graph.height / 2;
      let dtheta = Math.PI * 2 / n;
      // Draw nodes in circle

      // Clear graph
      ctx.clearRect(0, 0, graph.width, graph.height);

      // Find node points
      let nodes = new Array(n);
      // colors = new Array(n);
      // let color_selectors = qsa("#palette > button");
      let palette_elem = id("palette");
      for (i = 0; i < n; i++) {
        let x = cx + radius * Math.sin(i * dtheta);
        let y = cy + radius * Math.cos(i * dtheta);
        nodes[i] = [x, y];
        let btn = gen("button");
        btn.addEventListener("click", cycleColor);
        btn.addEventListener("click", drawGraph);
        btn.classList.add("blue");
        btn.textContent = i + 1;
        btn.type = "button";
        palette_elem.appendChild(btn);
      }
      drawEdges(ctx, nodes, p);
      drawNodes(ctx, nodes);
    }
  }

  function drawGraph() {

  }

  function cycleColor() {
    for (i = 0; i < palette_names.length; i++) {
      if (this.classList.contains(palette_names[i])) {
        this.classList.remove(palette_names[i]);
        this.classList.add(palette_names[(i + 1) % palette_names.length]);
        break;
      }
    }
  }

  function drawEdges(ctx, nodes, p) {
    let n = nodes.length;
    for (u = 0; u < n; u++) {
      for (v = u; v < n; v++) {
        if (Math.random() < p) {
          ctx.beginPath();
          if (colors == 0) {
            ctx.strokeStyle = 'rgb(0, 0, 0)';
          } else {
            ctx.strokeStyle = 'rgb(' +
              ((colors[u][0] + colors[v][0]) / 2) + ', ' +
              ((colors[u][1] + colors[v][1]) / 2) + ', ' +
              ((colors[u][2] + colors[v][2]) / 2) + ')';
          }
          ctx.moveTo(nodes[u][0], nodes[u][1]);
          ctx.lineTo(nodes[v][0], nodes[v][1]);
          ctx.stroke();
        }
      }
    }
  }

  function drawNodes(ctx, nodes) {
    let n = nodes.length;
    for (coord = 0; coord < n; coord++) {
      ctx.beginPath();
      if (colors == 0) {
        ctx.fillStyle = 'rgb(23, 0, 156)';
      } else {
        ctx.fillStyle = 'rgb(' +
          colors[coord][0] + ', ' +
          colors[coord][1] + ', ' +
          colors[coord][2] + ')';
      }
      ctx.arc(nodes[coord][0], nodes[coord][1], 5, 0, Math.PI * 2);
      ctx.fill();
    }
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
