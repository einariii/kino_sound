import "./output.js";

export function init(ctx, payload) {
  ctx.importCSS("output.css");

  ctx.root.innerHTML = `
    <div class="app">
      <div class="container">
        <div class="header"><img src="./images/incoming_envelope_emoji.png" width="20" height="20"><img src="./images/sound_emoji.png" width="20" height="20">kino_sound: sonify your livebooks.<button class="fright" id="play">Smart cells!</button></div>
          <div class="note" style="margin-top: 12px"> 
            <div class="intro">
              <details>
              <summary style="cursor:pointer">Introduction</summary>
                <p>Tired of always relying on your eyes? Hate staring at some long-running process, waiting for it to finish? Need to know what's happening with your code but also really need to go to the bathroom? Screen output is great but we can do better.</p>
                <p>Cue kino_sound: a smart cell to lets you <i>listen</i> to what's happening in your Livebooks.</p>
                <p>You may call any of the below functions from anywhere within this Livebook.</p>
              </details>
            </div>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px">
              <button style="width: 30%" id="success"><code>KinoSound.success()</code></button>
              <button style="width: 30%" id="error"><code>KinoSound.error()</code></button>
              <button style="width: 30%" id="store"><code>KinoSound.store()</code></button>
              <button style="width: 30%" id="kill"><code>KinoSound.kill()</code></button>
              <button style="width: 30%" id="restart"><code>KinoSound.restart()</code></button>
              <button style="width: 30%" id="crash"><code>KinoSound.crash()</code></button>
              <button style="width: 30%" id="log"><code>KinoSound.log()</code></button>
              <button style="width: 30%" id="print"><code>KinoSound.print()</code></button>
              <button style="width: 30%" id="off_and_on"><code>KinoSound.off_and_on()</code></button>
              <div hidden id="crash"></div>
            </div>
            <p style="text-align: right; margin-top: 8px"><output id="self"></output></p>
          </div>
      </div>
    </div>
      `;

  const pidEl = document.getElementById("self");
  pidEl.value = payload.fields.pid;

  const smart = new Howl({
    src: ["./samples/smart_cells.flac"],
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
    src: ["./samples/kino_sound_success.flac"],
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
    src: ["./samples/kino_sound_inspect.flac"],
    // loop: true,
    // rate: 1.125
  });

  const crash = new Howl({
    src: ["./samples/crash_crash_crash.flac"],
    // loop: true,
    // rate: 1.5
  });

  const store = new Howl({
    src: ["./samples/kino_sound_whee.flac"],
  });

  const kill = new Howl({
    src: ["./samples/kino_sound_warning.flac"],
  });

  const restart = new Howl({
    src: ["./samples/kino_sound_whoa.flac"],
  });

  const log = new Howl({
    src: ["./samples/kino_sound_logger.flac"],
  });

  const offAndOn = new Howl({
    src: ["./samples/off_and_on_again.flac"],
  });

  const playEl = document.getElementById("play");
  const successEl = document.getElementById("success");
  const errorEl = document.getElementById("error");
  const crashEl = document.getElementById("crash");
  const restartEl = document.getElementById("restart");
  const storeEl = document.getElementById("store");
  const killEl = document.getElementById("kill");
  const logEl = document.getElementById("log");
  // const symphonyEl = document.getElementById("symphony");
  const offAndOnEl = document.getElementById("off_and_on");
  const printEl = document.getElementById("print");

  playEl.addEventListener("click", (event) => {
    smart.play();
  });

  successEl.addEventListener("click", (event) => {
    success.play();
  });

  errorEl.addEventListener("click", (event) => {
    error.play();
  });

  restartEl.addEventListener("click", (event) => {
    restart.play();
  });

  storeEl.addEventListener("click", (event) => {
    store.play();
  });

  killEl.addEventListener("click", (event) => {
    kill.play();
  });

  crashEl.addEventListener("click", (event) => {
    crash.play();
  });

  logEl.addEventListener("click", (event) => {
    log.play();
  });

  offAndOnEl.addEventListener("click", (event) => {
    offAndOn.play();
  })

  printEl.addEventListener("click", (event) => {
    dmp9.play();
  })
  
  // symphonyEl.addEventListener("click", (event) => {
  //   let counter = 0;
  //   const intervalTime = 1000 / 7; // approximately 714 ms
  //   const interval = setInterval(() => {
  //     if (counter === 0 || counter === 2 || counter === 4) {
  //       smart.play();
  //     } else if (counter === 1) {
  //       dmp2.play();
  //     } else if (counter === 5) {
  //       dmp4.play();
  //     } else if (counter === 7) {
  //       crash.play();
  //     } else if (counter === 14) {
  //       offAndOn.play();
  //     }
  //     counter++;
  //     if (counter === 15) {
  //       clearInterval(interval);
  //     }
  //   }, intervalTime);
  // });

  ctx.handleEvent("smart", () => {
    smart.play();
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

  ctx.handleEvent("store", () => {
    store.play();
  });

  ctx.handleEvent("kill", () => {
    kill.play();
  });

  ctx.handleEvent("restart", () => {
    restart.play();
  });

  ctx.handleEvent("log", () => {
    log.play();
  });

  ctx.handleEvent("off_and_on", () => {
    offAndOn.play();
  });

  ctx.handleEvent("print", () => {
    dmp9.play();
  });

  // ctx.handleEvent("symphony", () => {
  //     let counter = 0;
  //     const intervalTime = 1000 / 7; // approximately 714 ms
  //     const interval = setInterval(() => {
  //       if (counter === 0 || counter === 2 || counter === 4) {
  //         smart.play();
  //       } else if (counter === 1) {
  //         dmp2.play();
  //       } else if (counter === 5) {
  //         dmp4.play();
  //       } else if (counter === 7) {
  //         crash.play();
  //       } else if (counter === 14) {
  //         offAndOn.play();
  //       }
  //       counter++;
  //       if (counter === 15) {
  //         clearInterval(interval);
  //       }
  //     }, intervalTime);
  // });

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
