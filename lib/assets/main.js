import "./output.js";

export function init(ctx, payload) {
  ctx.importCSS("output.css");

  ctx.root.innerHTML = `
    <div class="">
      <p>KINO_SAMPLER: Sonify your livebooks!</p>
      <p>The PID of this smart cell is: <output id="self"></output></p>
      <p>Use this PID to send playback commands from within your regular cells.</p>
      <ul>The following commands are available (click to preview):<br><br>
      <li><button id="finished">KinoSampler(PID, "finished")</button>
      <li><button id="error">KinoSampler(PID, "error")</button></li>
      <li><button id="saved">KinoSampler(PID, "saved")</button></li>
      <li><button id="deleted">KinoSampler(PID, "deleted")</button></li>
      <li><button id="random">KinoSampler(PID, "random")</button></li>
      <li><button id="superrandom">KinoSampler(PID, "superrandom")</button></li>
      </ul>
      <p>Alternatively, you may call the helper function <code>KinoSampler.mount_all(PID)</code> to enable all standard sound events.<br>
      This function should live inside your <code>defmodule</code>.
      </p>
      <button id="play">PLAY</button>
      </div>
      `;

  const pidEl = document.getElementById("self");
  pidEl.value = payload.fields.pid;
      
  const zmart = new Howl({
    src: ["./zmart_zellz.flac"],
  });
  
  const finished = new Howl({
    src: ["./zmart_zellz.flac"],
    loop: true,
    rate: 1.0
  });

  const error = new Howl({
    src: ["./zmart_zellz.flac"],
    loop: true,
    rate: 0.75
  });

  const saved = new Howl({
    src: ["./zmart_zellz.flac"],
    loop: true,
    rate: 1.5
  });
  
  const deleted = new Howl({
    src: ["./zmart_zellz.flac"],
    loop: true,
    rate: 0.83
  });

  const random = new Howl({
    src: ["./zmart_zellz.flac"],
    loop: true,
    rate: 2.0
  });
  
  const superrandom = new Howl({
    src: ["./zmart_zellz.flac"],
    loop: true,
    rate: 1.25
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

  finishedEl.addEventListener("finished", (event) => {
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

}
