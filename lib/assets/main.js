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
            <li><button id="success">send(sound_pid, "success")</button>
            <li><button id="error">send(sound_pid, "error")</button></li>
            <li><button id="crash">send(sound_pid, "crash")</button></li>
            <li><button id="saved">send(sound_pid, "saved")</button></li>
            <li><button id="deleted">send(sound_pid, "deleted")</button></li>
            <li><button id="symphony">send(sound_pid, "symphony")</button></li>
            </ul>
            <p>You may call these functions from anywhere within this Livebook.</p>
            <p>In addition to being a useful developer tool, kino_sound is amenable to creative sonic practices.</p>
          </div>
      </div>
    </div>
      `;

  const pidEl = document.getElementById("self");
  pidEl.value = payload.fields.pid;

  const zmart = new Howl({
    src: ["./samples/zmart_zellz.flac"],
  });

  const windows = new Howl({
    src: ["./samples/windows_95.flac"],
  });

  const windows2 = new Howl({
    src: ["./samples/windows_95.flac"],
    rate: 0.5
  });

  const windows3 = new Howl({
    src: ["./samples/windows_95.flac"],
    rate: 0.83
  });

  const windows4 = new Howl({
    src: ["./samples/windows_95.flac"],
    rate: 1.125
  });

  const windows5 = new Howl({
    src: ["./samples/windows_95.flac"],
    rate: 0.125
  });

  const centrisquadra = new Howl({
    src: ["./samples/centris_quadra_error.flac"],
    rate: 1.125,
  });

  const success = new Howl({
    src: ["./samples/consider_it_done.flac"],
  });

  const dmp1 = new Howl({
    src: ["./samples/dotmatrix_1.flac"],
  });

  const dmp2 = new Howl({
    src: ["./samples/dotmatrix_2.flac"],
  });

  const dmp3 = new Howl({
    src: ["./samples/dotmatrix_3.flac"],
  });

  const dmp4 = new Howl({
    src: ["./samples/dotmatrix_4.flac"],
  });

  const dmp5 = new Howl({
    src: ["./samples/dotmatrix_5.flac"],
  });

  const dmp6 = new Howl({
    src: ["./samples/dotmatrix_6.flac"],
  });

  const dmp7 = new Howl({
    src: ["./samples/dotmatrix_7.flac"],
  });

  const dmp8 = new Howl({
    src: ["./samples/dotmatrix_8.flac"],
  });

  const dmp9 = new Howl({
    src: ["./samples/dotmatrix_9.flac"],
  });

  const dmp10 = new Howl({
    src: ["./samples/dotmatrix_10.flac"],
  });

  const dmp11 = new Howl({
    src: ["./samples/dotmatrix_11.flac"],
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
  const successEl = document.getElementById("success");
  const errorEl = document.getElementById("error");
  const crashEl = document.getElementById("crash");
  const savedEl = document.getElementById("saved");
  const deletedEl = document.getElementById("deleted");
  const symphonyEl = document.getElementById("symphony");

  playEl.addEventListener("click", (event) => {
    zmart.play();
  });

  successEl.addEventListener("click", (event) => {
    success.play();
  });

  errorEl.addEventListener("click", (event) => {
    error.play();
  });

  savedEl.addEventListener("click", (event) => {
    saved.play();
  });

  deletedEl.addEventListener("click", (event) => {
    deleted.play();
  });

  crashEl.addEventListener("click", (event) => {
    crash.play();
  });

  symphonyEl.addEventListener("click", (event) => {
    let counter = 0;
    const intervalTime = 1000 / 7; // approximately 714 ms
    const interval = setInterval(() => {
      if (counter === 0 || counter === 2 || counter === 6) {
        zmart.play();
      } else if (counter === 1 || counter === 3 || counter === 4) {
        dmp2.play();
      } else if (counter === 5) {
        dmp4.play();
      } else if (counter === 7) {
        crash.play();
      }
      counter++;
      if (counter === 8) {
        clearInterval(interval);
      }
    }, intervalTime);
  });

  ctx.handleEvent("zmart", () => {
    zmart.play();
  });

  ctx.handleEvent("success", () => {
    success.play();
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

  ctx.handleEvent("windows", () => {
    windows.play();
  });

  ctx.handleEvent("windows2", () => {
    windows2.play();
  });

  ctx.handleEvent("windows3", () => {
    windows3.play();
  });

  ctx.handleEvent("windows4", () => {
    windows4.play();
  });

  ctx.handleEvent("windows5", () => {
    windows5.play();
  });

  ctx.handleEvent("centrisquadra", () => {
    centrisquadra.play();
  });

  ctx.handleEvent("dmp1", () => {
    dmp1.play();
  });

  ctx.handleEvent("dmp2", () => {
    dmp2.play();
  });

  ctx.handleEvent("dmp3", () => {
    dmp3.play();
  });

  ctx.handleEvent("dmp4", () => {
    dmp4.play();
  });

  ctx.handleEvent("dmp5", () => {
    dmp5.play();
  });

  ctx.handleEvent("dmp6", () => {
    dmp6.play();
  });

  ctx.handleEvent("dmp7", () => {
    dmp7.play();
  });

  ctx.handleEvent("dmp8", () => {
    dmp8.play();
  });

  ctx.handleEvent("dmp9", () => {
    dmp9.play();
  });

  ctx.handleEvent("dmp10", () => {
    dmp10.play();
  });

  ctx.handleEvent("dmp11", () => {
    dmp11.play();
  });
}
