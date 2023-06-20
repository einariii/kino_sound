import "./output.js";

export function init(ctx, payload) {
  ctx.importCSS("output.css");

  ctx.root.innerHTML = `
    <div class="">
      <p>KINO_SOUND: Sonify your Livebooks.</p>
      <button id="play">Smart cells!</button>
      <p>The PID of this smart cell is: <output id="self"></output></p>
      <p>Use this PID to send playback commands from within your regular cells.</p>
      <p>Start by extracting the PID in a cell at the top of your livebook using the following function:</p>
      <p><code>sound_pid = KinoSound.get_pid() |> Keyword.get(:pid)</code></p>
      <ul>Then, the following commands will be available to you (click to preview):<br><br>
      <li><button id="finished">send(sound_pid, "finished")</button>
      <li><button id="error">send(sound_pid, "error")</button></li>
      <li><button id="crash">send(sound_pid, "crash")</button></li>
      <li><button id="saved">send(sound_pid, "saved")</button></li>
      <li><button id="deleted">send(sound_pid, "deleted")</button></li>
      </ul>
      <p>&emsp;&emsp;&ensp;You may call these functions from anywhere within this Livebook.</p> 
      <p>Alternatively, you may call the helper function</p>
      <code>KinoSound.mount_all(sound_pid)</code>
      <p>to automatically enable all standard sound events. This function should live at the top of your livebook.</p>
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
