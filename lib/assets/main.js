import "./output.js";

export function init(ctx, payload) {
  ctx.importCSS("output.css");

  ctx.root.innerHTML = `
    <div class="app">
      <div class="container">
        <div class="header"><img src="./images/incoming_envelope_emoji.png" width="20" height="20"><img src="./images/sound_emoji.png" width="20" height="20">KINO_SOUND: Sonify your Livebooks.<button class="fright" id="play">Smart cells!</button></div>
          <div class="note">
            <p>The PID of this smart cell is: <output id="self"></output></p>
            <p>Use this PID to send playback commands from within your regular cells.</p>
            <p>Start by extracting the PID in a cell at the top of your livebook using the following function:</p>
            <div>&emsp;&emsp;&ensp;<code class="codeclass">sound_pid = KinoSound.get_pid() |> Keyword.get(:pid)</code></div>
            <p>Then, the following commands will be available to you (click to preview):</p>
            <ul>
            <li><button id="finished">send(sound_pid, "finished")</button>
            <li><button id="error">send(sound_pid, "error")</button></li>
            <li><button id="crash">send(sound_pid, "crash")</button></li>
            <li><button id="saved">send(sound_pid, "saved")</button></li>
            <li><button id="deleted">send(sound_pid, "deleted")</button></li>
            </ul>
            <p>You may call these functions from anywhere within this Livebook.</p>
            <p>Alternatively, you may call the helper function</p>
            <div>&emsp;&emsp;&ensp;<code class="codeclass" >KinoSound.mount_all(sound_pid)</code></div>
            <p>to automatically enable all standard sound events. This function should live at the top of your Livebook.</p>
          </div>
      </div>
    </div>
      `;

  const pidEl = document.getElementById("self");
  pidEl.value = payload.fields.pid;
      
  const zmart = new Howl({
    src: ["./samples/zmart_zellz.flac"],
  });
  
  const finished = new Howl({
    src: ["./samples/consider_it_funk.flac"],
    // loop: true,
    // rate: 1.0
  });
  
  const error = new Howl({
    src: ["./samples/off_and_on_again.flac"],
    // loop: true,
    // rate: 1.125
  });
  
  const crash = new Howl({
    src: ["./samples/crash_crash_crash.flac"],
    // loop: true,
    // rate: 1.5
  });
  
  const saved = new Howl({
    src: ["./samples/you_saved_me.flac"],
    // loop: true,
    // rate: 1.25
  });
  
  const deleted = new Howl({
    src: ["./samples/see_you_later_alligator.flac"],
    // loop: true,
    // rate: 0.83
  });

  const random = new Howl({
    src: ["./samples/zmart_zellz.flac"],
    // loop: true,
    // rate: 0.5
  });
  
  const playEl = document.getElementById("play");
  const finishedEl = document.getElementById("finished");
  const errorEl = document.getElementById("error");
  const crashEl = document.getElementById("crash");
  const savedEl = document.getElementById("saved");
  const deletedEl = document.getElementById("deleted");
  // const randomEl = document.getElementById("random");

  playEl.addEventListener("click", (event) => {
    zmart.play();
    // ctx.pushEvent("play");
  });

  finishedEl.addEventListener("click", (event) => {
    finished.play();
    // ctx.pushEvent("finished");
  });
  
  errorEl.addEventListener("click", (event) => {
    error.play();
    // ctx.pushEvent("finished");
  });
  
  savedEl.addEventListener("click", (event) => {
    saved.play();
    // ctx.pushEvent("finished");
  });
  
  deletedEl.addEventListener("click", (event) => {
    deleted.play();
    // ctx.pushEvent("finished");
  });

  // randomEl.addEventListener("click", (event) => {
  //   random.play();
  //   // ctx.pushEvent("finished");
  // });

  crashEl.addEventListener("click", (event) => {
    crash.play();
    // ctx.pushEvent("finished");
  });

  ctx.handleEvent("finished", () => {
    finished.play();
  });

  ctx.handleEvent("error", () => {
    error.play();
  });

  ctx.handleEvent("crash", () => {
    crash.play();
  });

  ctx.handleEvent("saved", () => {
    saved.play();
  });

  ctx.handleEvent("deleted", () => {
    deleted.play();
  });

  // ctx.handleEvent("random", () => {
  //   random.play();
  // });
}
