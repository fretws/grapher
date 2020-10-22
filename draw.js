"use-strict";

(function() {
  window.addEventListener("load", init);

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
      for (i = 0; i < n; i++) {
        let x = cx + radius * Math.sin(i * dtheta);
        let y = cy + radius * Math.cos(i * dtheta);
        nodes[i] = [x, y];
      }
      // Draw edges
      for (u = 0; u < n; u++) {
        for (v = u; v < n; v++) {
          if (Math.random() < p) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.moveTo(nodes[u][0], nodes[u][1]);
            ctx.lineTo(nodes[v][0], nodes[v][1]);
            ctx.stroke();
          }
        }
      }
      // Draw nodes
      for (coord = 0; coord < n; coord++) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(23, 0, 156)';
        ctx.arc(nodes[coord][0], nodes[coord][1], 5, 0, Math.PI * 2);
        ctx.fill();
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
