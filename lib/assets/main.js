export function init(ctx, payload) {
  ctx.importCSS("main.css");
  ctx.importCSS("input.css");
  ctx.importJS("output.js")

  ctx.root.innerHTML = `
    <div class="app2">
      <p>smart sounds</p>
      <button id="playThing" type="submit">PLAY</button>
      <button id="stop">STOP</button>
    </div>
  `;

  const playThing = document.getElementById("playThing");

  // const samples = {
  //   kick: "https://danigb.github.io/samples/drum-machines/808-mini/kick.m4a",
  //   snare: "https://danigb.github.io/samples/drum-machines/808-mini/snare-1.m4a",
  //   zmart: "/zmart_zellz.flac"
  // };
  // const sampler = new Sampler(new AudioContext(), { samples });

  playThing.addEventListener("click", (event) => {
    ctx.pushEvent("play");
  });

  ctx.handleEvent("play", () => {
    // piano.output.addEffect("reverb", reverb, 0.2);
    // piano.start({ note: "C4", velocity: 80, time: 5, duration: 1 });
    // const now = context.currentTime;
    // ["C4", "E4", "G4", "C5"].forEach((note, i) => {
    //   piano.start({ note, time: now + i, duration: 0.5 });
    // });

    sampler.start({ note: "kick" });
    console.log("i was played")
  });

  ctx.handleEvent("stop", () => {
    piano.stop()
    // zmartZellz.pause()
  });
}



























// var player = require('sample-player')
    // var ac = new AudioContext()
    // var vox = player(ac, {
    //   jose: zmartZellz,
    //   jonatan: zmartZellz2,
    // })
    // vox.start('jose')
    // vox.start('jonatan', ac.currentTime, { gain: 0.5 });

