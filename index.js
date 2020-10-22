/*
 * Shane Fretwell
 * October 20, 2020
 * Section AE, Dylan McKone and Josie Lee
 *
 * This script handles the drawing of graph generation in reaction to user input and window size.
 * The goal, to restate, is to have a graph generator that is faster and more useful to me than
 * the generator currently employed by Wolfram Alpha.
 */

(function () {
  "use-strict";
  window.addEventListener("load", init);
  const PALETTE = [
    [205, 0, 0], // red
    [0, 205, 12], // green
    [23, 0, 156] // blue
  ];
  const PALETTE_NAMES = ["red", "green", "blue"];
  let colors;

  /**
   * Initializes event listeners for the page.
   */
  function init() {
    id("go").addEventListener("click", generateGraph);
    id("vertices").addEventListener("change", palettePopup);
  }

  /**
   * Takes the values in the user inputs (the number of nodes and the edge density) and draws a
   * fitting graph on the canvas. If custom colors have been selected, then these colors are used
   * instead of the default.
   */
  function generateGraph() {
    /*
     * I learned how to use a canvas from
     * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
     */
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

  /**
   * Takes in the locations of all of the nodes and generates random edges such that the resulting
   * graph has roughly the edge density provided. Edges are colored as the avarage of the source and
   * destination node colors.
   * @param {Object} ctx Canvas drawing context.
   * @param {Array} nodes 2d array of node locations as (x, y) pairs
   * @param {float} p edge density of the current graph.
   */
  function drawEdges(ctx, nodes, p) {
    let n = nodes.length;
    for (let u = 0; u < n; u++) {
      for (let v = u; v < n; v++) {
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

  /**
   * Takes in the locations of the nodes of the current graph and draws them on the canvas using
   * the colors designated by the global variable 'colors'.
   * @param {Object} ctx the canvas drawing context.
   * @param {Array} nodes 2d array of (x, y) coordinates of all nodes in the graph.
   */
  function drawNodes(ctx, nodes) {
    let n = nodes.length;
    for (let coord = 0; coord < n; coord++) {
      ctx.beginPath();
      ctx.fillStyle = 'rgb(' +
        colors[coord][0] + ', ' +
        colors[coord][1] + ', ' +
        colors[coord][2] + ')';
      ctx.arc(nodes[coord][0], nodes[coord][1], 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Reveals the palette for color customization and populates the palette with one button for each
   * node in the graph to be generated.
   */
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

  /**
   * Cycles the color of this button according to the global palette.
   * @param {Object} this the button that was clicked.
   */
  function cycleColor() {
    let i = 0;
    while (!this.classList.contains(PALETTE_NAMES[i])) {
      i++;
    }
    this.classList.remove(PALETTE_NAMES[i]);
    let next = (i + 1) % PALETTE.length;
    this.classList.add(PALETTE_NAMES[next]);
    colors[parseInt(this.textContent) - 1] = PALETTE[next];
  }

  /**
   * Returns the index of the given color in the global palette.
   * @param {String} color name of color in the global palette.
   * @returns {int} the index of the given color in the global palette.
   */
  function indexOf(color) {
    for (let i = 0; i < PALETTE_NAMES.length; i++) {
      if (color === PALETTE_NAMES[i]) {
        return i;
      }
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {String} idName HTML element ID.
   * @returns {DOM Object} DOM object associated with ID.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that fits the given selector.
   * @param {String} selector valid HTML/CSS selector.
   * @returns {DOM Object} DOM object associated with ID.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new DOM Object of the tag provided.
   * @param {String} tagName HTML tag name.
   * @returns {DOM Object} DOM object associated with ID.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
