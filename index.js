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
  const PALETTE = [
    [205, 0, 0], // red
    [0, 205, 12], // green
    [23, 0, 156] // blue
  ];
  const PALETTE_NAMES = ["red", "green", "blue"];
  let colors;

  function init() {
    id("go").addEventListener("click", generateGraph);
    id("vertices").addEventListener("change", palettePopup);
  }

  function generateGraph() {
    /* I learned how to use a canvas from
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage */
    let n = parseInt(id("vertices").value);
    let p = parseFloat(id("edge-density").value);

    let graph = id("graph");
    if (graph.getContext) {
      let ctx = graph.getContext('2d');
      // Nodes will be arranged in a circle
      let radius = Math.min(graph.width, graph.height) / 2 - 10;
      let cx = graph.width / 2;
      let cy = graph.height / 2;
      let dtheta = Math.PI * 2 / n;
      // Clear canvas
      ctx.clearRect(0, 0, graph.width, graph.height);
      // Find node points
      let nodes = new Array(n);
      for (let i = 0; i < n; i++) {
        let x = cx + radius * Math.sin(i * dtheta);
        let y = cy + radius * Math.cos(i * dtheta);
        nodes[i] = [x, y];
      }
      drawEdges(ctx, nodes, p);
      drawNodes(ctx, nodes);
    }
  }

  function drawEdges(ctx, nodes, p) {
    let n = nodes.length;
    for (u = 0; u < n; u++) {
      for (v = u; v < n; v++) {
        if (Math.random() < p) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgb(' +
            ((colors[u][0] + colors[v][0]) / 2) + ', ' +
            ((colors[u][1] + colors[v][1]) / 2) + ', ' +
            ((colors[u][2] + colors[v][2]) / 2) + ')';
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
      ctx.fillStyle = 'rgb(' +
        colors[coord][0] + ', ' +
        colors[coord][1] + ', ' +
        colors[coord][2] + ')';
      ctx.arc(nodes[coord][0], nodes[coord][1], 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function palettePopup() {
    let hidden = qs(".hidden");
    if (hidden != null) {
      hidden.classList.remove("hidden");
    }
    let palette_elem = id("palette");
    let n = parseInt(id("vertices").value);
    let old_btns = palette_elem.childNodes;
    while (old_btns.length > 0) {
      palette_elem.removeChild(old_btns[0]);
    }
    colors = new Array(n);
    for (let i = 0; i < n; i++) {
      let btn = gen("button");
      btn.addEventListener("click", cycleColor);
      btn.classList.add("blue");
      colors[i] = PALETTE[indexOf("blue")];
      btn.textContent = i + 1;
      btn.type = "button";
      palette_elem.appendChild(btn);
    }
  }

  function cycleColor() {
    for (let i = 0; i < PALETTE_NAMES.length; i++) {
      if (this.classList.contains(PALETTE_NAMES[i])) {
        this.classList.remove(PALETTE_NAMES[i]);
        let next = (i + 1) % PALETTE.length;
        this.classList.add(PALETTE_NAMES[next]);
        colors[parseInt(this.textContent) - 1] = PALETTE[next];
        break;
      }
    }
  }

  function indexOf(color) {
    for (let i = 0; i < PALETTE_NAMES.length; i++) {
      if (color == PALETTE_NAMES[i]) {
        return i;
      }
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
