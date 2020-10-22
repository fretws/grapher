"use-strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    let go = id("go");
    go.addEventListener("click", generateGraph);
    // go.addEventListener("click", genLine);
  }

  function genLine() {
    let graph = id("graph");
    if (graph.getContext) {
      let ctx = graph.getContext('2d');

      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(150, 10, 250, 50);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(150, 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(150, 0);
      ctx.lineTo(0, 10);
      ctx.stroke();
    }
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
      let x_increment = graph.width / n * 3;
      let y_increment = graph.height / n * 6;
      // Draw nodes starting in each corner and progressing in clockwise spiral

      // Clear graph
      ctx.clearRect(0, 0, graph.width, graph.height);

      // Find node points
      let curr_n = 0;
      let nodes = new Array(n);
      let corner = 0;
      let progress = new Array(4);
      progress[0] = 10;
      progress[1] = 10;
      progress[2] = graph.width - 10;
      progress[3] = graph.height - 10;
      while (curr_n < n) {
        if (corner == 0) {
          nodes[curr_n] = [progress[corner], 10];
          progress[corner] += x_increment;
        } else if (corner == 1) {
          nodes[curr_n] = [10, progress[corner]];
          progress[corner] += y_increment;
        } else if (corner == 2) {
          nodes[curr_n] = [progress[corner], graph.height - 10];
          progress[corner] -= x_increment;
        } else if (corner == 3) {
          nodes[curr_n] = [graph.width - 10, progress[corner]];
          progress[corner] -= y_increment;
        }
        curr_n++;
        corner = (corner + 1) % 4;
      }
      // Draw edges

      // Draw nodes
      for (coord = 0; coord < n; coord++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(200, 0, 0)';
        ctx.arc(nodes[coord][0], nodes[coord][1], 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      // I learned foreach loops from https://careerkarma.com/blog/javascript-foreach-loop/
      // nodes.foreach(coord => {
      //   ctx.fillStyle = 'rgb(200, 0, 0)';
      //   ctx.arc(coord[0], coord[1], 5, 0, Math.PI * 2);
      // });

      // for (u = 0; u < n; u++) {
      //   for (v = u; v < n; v++) {
      //     if (Math.random() < p) {
      //       drawLine(svg, nodes[u], nodes[v]);
      //     }
      //   }
      // }
    }
  }

  function addNode(corner, ) {

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
