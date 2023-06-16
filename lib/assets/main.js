import "./output.js";

export function init(ctx, payload) {
  ctx.importCSS("output.css");

  ctx.root.innerHTML = `
    <div class="app2">
      <p>smart sounds</p>
      <button id="play">PLAY</button>
      <button id="stop">STOP</button>
    </div>
  `;

  console.log("TESTING BUNDLE");
  const sound = new Howl({
    src: ["./zmart_zellz.flac"],
  });
  sound.play();

  const playEl = document.getElementById("play");

  playEl.addEventListener("click", (event) => {
    ctx.pushEvent("play");
  });

  // // Used for event listeners if used
  // ctx.handleSync(() => {
  //   // Synchronously invokes change listeners
  //   document.activeElement &&
  //     document.activeElement.dispatchEvent(new Event("change"));
  // });
}
