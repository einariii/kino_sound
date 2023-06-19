import "./output.js";

export function init(ctx, payload) {
  ctx.importCSS("output.css");

  ctx.root.innerHTML = `
    <div class="">
      <p>KINO_SOUND: Sonify your Livebooks.</p>
      <p>The PID of this smart cell is: <output id="self"></output></p>
      <p>Use this PID to send playback commands from within your regular cells.</p>
      <p>Start by extracting the PID in a cell at the top of your livebook using the following function:</p>
      <p><code>sound_pid = KinoSound.get_pid() |> Keyword.get(:pid)</code></p>
      <ul>Then, the following commands will be available to you (click to preview):<br><br>
      <li><button id="finished">send(sound_pid, "finished")</button>
      <li><button id="error">send(sound_pid, "error")</button></li>
      <li><button id="saved">send(sound_pid, "saved")</button></li>
      <li><button id="deleted">send(sound_pid, "deleted")</button></li>
      <li><button id="random">send(sound_pid, "random")</button></li>
      <li><button id="superrandom">send(sound_pid, "superrandom")</button></li>
      </ul>
      <p>Alternatively, you may call the helper function <code>KinoSound.mount_all(sound_pid)</code> to enable all standard sound events.<br>
      This function should live inside your <code>defmodule</code>.
      </p>
      <button id="play">Smart cells!</button>
      </div>
      `;

  const pidEl = document.getElementById("self");
  pidEl.value = payload.fields.pid;
      
  const zmart = new Howl({
    src: ["./zmart_zellz.flac"],
  });
  
  const finished = new Howl({
    src: ["./zmart_zellz.flac"],
    // loop: true,
    // rate: 1.0
  });

  const error = new Howl({
    src: ["./zmart_zellz.flac"],
    // loop: true,
    // rate: 1.125
  });

  const saved = new Howl({
    src: ["./zmart_zellz.flac"],
    // loop: true,
    // rate: 1.25
  });
  
  const deleted = new Howl({
    src: ["./zmart_zellz.flac"],
    // loop: true,
    // rate: 0.83
  });

  const random = new Howl({
    src: ["./zmart_zellz.flac"],
    // loop: true,
    // rate: 0.5
  });
  
  const superrandom = new Howl({
    src: ["./zmart_zellz.flac"],
    // loop: true,
    // rate: 1.5
  });
  
  const playEl = document.getElementById("play");
  const finishedEl = document.getElementById("finished");
  const errorEl = document.getElementById("error");
  const savedEl = document.getElementById("saved");
  const deletedEl = document.getElementById("deleted");
  const randomEl = document.getElementById("random");
  const superrandomEl = document.getElementById("superrandom");

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

  randomEl.addEventListener("click", (event) => {
    random.play();
    // ctx.pushEvent("finished");
  });

  superrandomEl.addEventListener("click", (event) => {
    superrandom.play();
    // ctx.pushEvent("finished");
  });

  ctx.handleEvent("finished", () => {
    finished.play();
  });

  ctx.handleEvent("error", () => {
    error.play();
  });

}
