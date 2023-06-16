export function init(ctx, payload) {
  ctx.importCSS("main.css");
  ctx.importCSS("input.css");
  ctx.importJS("sample-player.js")

  ctx.root.innerHTML = `
    <div class="app2">
      <p>smart sounds</p>
      <button id="play">PLAY</button>
      <button id="stop">STOP</button>
    </div>
  `;

  const zmartZellz = new Audio("/zmart_zellz.flac");
  // zmartZellz.play();
  // zmartZellz.loop = true;
  // zmartZellz.playbackRate = 2;
  // zmartZellz.pause();

  var player = require('sample-player')
  var ac = new AudioContext()
  var vox = player(ac, {
    jose: zmartZellz,
    jonatan: zmartZellz2,
  })
  vox.start('jose')
  vox.start('jonatan', ac.currentTime, { gain: 0.5 });



  ctx.handleEvent("play", () => {

  });

  ctx.handleEvent("stop", () => {

  });
}
