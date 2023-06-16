(() => {
  // node_modules/smplr/dist/index.mjs
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  function loadAudioBuffer(context2, url, storage2) {
    return __async(this, null, function* () {
      url = url.replace(/#/g, "%23").replace(/([^:]\/)\/+/g, "$1");
      const response = yield storage2.fetch(url);
      if (response.status !== 200) {
        console.warn(
          "Error loading buffer. Invalid status: ",
          response.status,
          url
        );
        return;
      }
      try {
        const audioData = yield response.arrayBuffer();
        const buffer = yield context2.decodeAudioData(audioData);
        return buffer;
      } catch (error) {
        console.warn("Error loading buffer", error, url);
      }
    });
  }
  function findFirstSupportedFormat(formats) {
    if (typeof document === "undefined")
      return null;
    const audio = document.createElement("audio");
    for (let i = 0; i < formats.length; i++) {
      const format = formats[i];
      const canPlay = audio.canPlayType(`audio/${format}`);
      if (canPlay === "probably" || canPlay === "maybe") {
        return format;
      }
      if (format === "m4a") {
        const canPlay2 = audio.canPlayType(`audio/aac`);
        if (canPlay2 === "probably" || canPlay2 === "maybe") {
          return format;
        }
      }
    }
    return null;
  }
  var HttpStorage = {
    fetch
  };
  var _cache;
  var _tryFromCache;
  var tryFromCache_fn;
  var _saveResponse;
  var saveResponse_fn;
  _cache = /* @__PURE__ */ new WeakMap();
  _tryFromCache = /* @__PURE__ */ new WeakSet();
  tryFromCache_fn = function(request) {
    return __async(this, null, function* () {
      const cache = yield __privateGet(this, _cache);
      const response = yield cache.match(request);
      if (response)
        return response;
      else
        throw Error("Not found");
    });
  };
  _saveResponse = /* @__PURE__ */ new WeakSet();
  saveResponse_fn = function(request, response) {
    return __async(this, null, function* () {
      try {
        const cache = yield __privateGet(this, _cache);
        yield cache.put(request, response.clone());
      } catch (err) {
      }
    });
  };
  function connectSerial(nodes) {
    const _nodes = nodes.filter((x) => !!x);
    _nodes.reduce((a, b) => {
      const left = "output" in a ? a.output : a;
      const right = "input" in b ? b.input : b;
      left.connect(right);
      return b;
    });
    return () => {
      _nodes.reduce((a, b) => {
        const left = "output" in a ? a.output : a;
        const right = "input" in b ? b.input : b;
        left.disconnect(right);
        return b;
      });
    };
  }
  function noteNameToMidi(note) {
    const REGEX = /^([a-gA-G]?)(#{1,}|b{1,}|)(-?\d+)$/;
    const m = REGEX.exec(note);
    if (!m)
      return;
    const letter = m[1].toUpperCase();
    if (!letter)
      return;
    const acc = m[2];
    const alt = acc[0] === "b" ? -acc.length : acc.length;
    const oct = m[3] ? +m[3] : 4;
    const step = (letter.charCodeAt(0) + 3) % 7;
    return [0, 2, 4, 5, 7, 9, 11][step] + alt + 12 * (oct + 1);
  }
  function toMidi(note) {
    return note === void 0 ? void 0 : typeof note === "number" ? note : noteNameToMidi(note);
  }
  function midiVelToGain(vel) {
    return vel * vel / 16129;
  }
  function findNearestMidi(midi, isAvailable) {
    let i = 0;
    while (isAvailable[midi + i] === void 0 && i < 128) {
      if (i > 0)
        i = -i;
      else
        i = -i + 1;
    }
    return i === 127 ? [midi, 0] : [midi + i, -i * 100];
  }
  function createControl(initialValue) {
    let current = initialValue;
    const listeners = /* @__PURE__ */ new Set();
    function subscribe(listener) {
      listeners.add(listener);
      listener(current);
      return () => {
        listeners.delete(listener);
      };
    }
    function set(value) {
      current = value;
      listeners.forEach((listener) => listener(current));
    }
    function get() {
      return current;
    }
    return { subscribe, set, get };
  }
  function createTrigger() {
    const listeners = /* @__PURE__ */ new Set();
    function subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
    function trigger(value) {
      listeners.forEach((listener) => listener(value));
    }
    return { subscribe, trigger };
  }
  function unsubscribeAll(unsubscribe) {
    let done = false;
    return () => {
      if (done)
        return;
      done = true;
      unsubscribe.forEach((cb) => cb == null ? void 0 : cb());
    };
  }
  var _volume;
  var _sends;
  var _inserts;
  var _disconnect;
  var _unsubscribe;
  var _options;
  var Channel = class {
    constructor(context2, options) {
      this.context = context2;
      __privateAdd(this, _volume, void 0);
      __privateAdd(this, _sends, void 0);
      __privateAdd(this, _inserts, void 0);
      __privateAdd(this, _disconnect, void 0);
      __privateAdd(this, _unsubscribe, void 0);
      __privateAdd(this, _options, void 0);
      var _a, _b;
      __privateSet(this, _options, Object.freeze(__spreadValues({
        destination: context2.destination,
        volume: 100,
        volumeToGain: midiVelToGain
      }, options)));
      this.input = new GainNode(this.context);
      __privateSet(this, _volume, new GainNode(this.context));
      __privateSet(this, _disconnect, connectSerial([
        this.input,
        __privateGet(this, _volume),
        __privateGet(this, _options).destination
      ]));
      const volume2 = createControl((_a = options.volume) != null ? _a : 100);
      this.setVolume = volume2.set;
      const volumeToGain = (_b = options.volumeToGain) != null ? _b : midiVelToGain;
      __privateSet(this, _unsubscribe, volume2.subscribe((volume22) => {
        __privateGet(this, _volume).gain.value = volumeToGain(volume22);
      }));
    }
    addInsert(effect) {
      var _a;
      (_a = __privateGet(this, _inserts)) != null ? _a : __privateSet(this, _inserts, []);
      __privateGet(this, _inserts).push(effect);
      __privateGet(this, _disconnect).call(this);
      __privateSet(this, _disconnect, connectSerial([
        this.input,
        ...__privateGet(this, _inserts),
        __privateGet(this, _volume),
        __privateGet(this, _options).destination
      ]));
    }
    addEffect(name, effect, mixValue) {
      var _a;
      const mix = new GainNode(this.context);
      mix.gain.value = mixValue;
      const input = "input" in effect ? effect.input : effect;
      const disconnect = connectSerial([__privateGet(this, _volume), mix, input]);
      (_a = __privateGet(this, _sends)) != null ? _a : __privateSet(this, _sends, []);
      __privateGet(this, _sends).push({ name, mix, disconnect });
    }
    sendEffect(name, mix) {
      var _a;
      const send = (_a = __privateGet(this, _sends)) == null ? void 0 : _a.find((send2) => send2.name === name);
      if (send) {
        send.mix.gain.value = mix;
      } else {
        console.warn("Send bus not found: " + name);
      }
    }
    disconnect() {
      var _a;
      __privateGet(this, _disconnect).call(this);
      __privateGet(this, _unsubscribe).call(this);
      (_a = __privateGet(this, _sends)) == null ? void 0 : _a.forEach((send) => send.disconnect());
      __privateSet(this, _sends, void 0);
    }
  };
  _volume = /* @__PURE__ */ new WeakMap();
  _sends = /* @__PURE__ */ new WeakMap();
  _inserts = /* @__PURE__ */ new WeakMap();
  _disconnect = /* @__PURE__ */ new WeakMap();
  _unsubscribe = /* @__PURE__ */ new WeakMap();
  _options = /* @__PURE__ */ new WeakMap();
  function startSample(sample) {
    var _a, _b, _c;
    const context2 = sample.destination.context;
    const source = context2.createBufferSource();
    source.buffer = sample.buffer;
    source.detune.value = (_a = sample == null ? void 0 : sample.detune) != null ? _a : 0;
    const lpf = sample.lpfCutoffHz ? new BiquadFilterNode(context2, {
      type: "lowpass",
      frequency: sample.lpfCutoffHz
    }) : void 0;
    const volume2 = context2.createGain();
    volume2.gain.value = (_b = sample == null ? void 0 : sample.gain) != null ? _b : 1;
    const [decay, startDecay] = createDecayEnvelope(context2, sample.decayTime);
    const cleanup = unsubscribeAll([
      connectSerial([source, lpf, volume2, decay, sample.destination]),
      (_c = sample.stop) == null ? void 0 : _c.call(sample, (sampleStop) => {
        if (sampleStop === void 0 || sampleStop.stopId === void 0 || sampleStop.stopId === sample.stopId) {
          stop(sampleStop == null ? void 0 : sampleStop.time);
        }
      })
    ]);
    source.onended = () => {
      var _a2;
      cleanup();
      (_a2 = sample.onEnded) == null ? void 0 : _a2.call(sample);
    };
    const startAt = sample.time || context2.currentTime;
    source.start(startAt);
    function stop(time) {
      time != null ? time : time = context2.currentTime;
      if (time <= startAt) {
        source.stop(time);
      } else {
        const stopAt = startDecay(time);
        source.stop(stopAt);
      }
    }
    if (sample.duration !== void 0) {
      stop(startAt + sample.duration);
    }
    return stop;
  }
  function createDecayEnvelope(context2, envelopeTime = 0.2) {
    let stopAt = 0;
    const envelope = new GainNode(context2, { gain: 1 });
    function start(time) {
      if (stopAt)
        return stopAt;
      envelope.gain.cancelScheduledValues(time);
      const envelopeAt = time || context2.currentTime;
      stopAt = envelopeAt + envelopeTime;
      envelope.gain.setValueAtTime(1, envelopeAt);
      envelope.gain.linearRampToValueAtTime(0, stopAt);
      return stopAt;
    }
    return [envelope, start];
  }
  var _config;
  var _stop;
  var _load;
  var _output;
  var Sampler = class {
    constructor(context2, options = {}) {
      this.context = context2;
      __privateAdd(this, _config, void 0);
      __privateAdd(this, _stop, void 0);
      __privateAdd(this, _load, void 0);
      __privateAdd(this, _output, void 0);
      var _a, _b, _c, _d, _e, _f, _g;
      __privateSet(this, _config, {
        destination: (_a = options.destination) != null ? _a : context2.destination,
        detune: 0,
        volume: (_b = options.volume) != null ? _b : 100,
        velocity: (_c = options.velocity) != null ? _c : 100,
        buffers: (_d = options.buffers) != null ? _d : {},
        volumeToGain: (_e = options.volumeToGain) != null ? _e : midiVelToGain,
        noteToSample: (_f = options.noteToSample) != null ? _f : (note) => [note.note.toString(), 0]
      });
      this.buffers = {};
      __privateSet(this, _stop, createTrigger());
      const storage2 = (_g = options.storage) != null ? _g : HttpStorage;
      const loader = typeof __privateGet(this, _config).buffers === "function" ? __privateGet(this, _config).buffers : createAudioBuffersLoader(__privateGet(this, _config).buffers, storage2);
      __privateSet(this, _load, loader(context2, this.buffers));
      __privateSet(this, _output, new Channel(context2, __privateGet(this, _config)));
      this.output = __privateGet(this, _output);
    }
    loaded() {
      return __async(this, null, function* () {
        yield __privateGet(this, _load);
        return this;
      });
    }
    start(note) {
      var _a, _b, _c;
      const _note = typeof note === "object" ? note : { note };
      const [sample, detune] = __privateGet(this, _config).noteToSample(
        _note,
        this.buffers,
        __privateGet(this, _config)
      );
      const buffer = this.buffers[sample];
      if (!buffer) {
        console.warn(`Sample not found: '${sample}'`);
        return () => void 0;
      }
      const onEnded = _note.onEnded;
      return startSample({
        buffer,
        destination: __privateGet(this, _output).input,
        time: _note.time,
        duration: _note.duration,
        decayTime: _note.decayTime,
        lpfCutoffHz: _note.lpfCutoffHz,
        detune: detune + ((_a = _note.detune) != null ? _a : __privateGet(this, _config).detune),
        gain: __privateGet(this, _config).volumeToGain((_b = _note.velocity) != null ? _b : __privateGet(this, _config).velocity),
        stop: __privateGet(this, _stop).subscribe,
        stopId: (_c = _note.stopId) != null ? _c : _note.note,
        onEnded: onEnded ? () => onEnded(note) : void 0
      });
    }
    stop(note) {
      const note_ = typeof note === "object" ? note : { stopId: note };
      __privateGet(this, _stop).trigger(note_);
    }
  };
  _config = /* @__PURE__ */ new WeakMap();
  _stop = /* @__PURE__ */ new WeakMap();
  _load = /* @__PURE__ */ new WeakMap();
  _output = /* @__PURE__ */ new WeakMap();
  function createAudioBuffersLoader(source, storage2) {
    return (context2, buffers) => __async(this, null, function* () {
      yield Promise.all([
        Object.keys(source).map((key) => __async(this, null, function* () {
          const value = source[key];
          if (value instanceof AudioBuffer) {
            buffers[key] = value;
          } else if (typeof value === "string") {
            const buffer = yield loadAudioBuffer(context2, value, storage2);
            if (buffer)
              buffers[key] = buffer;
          }
        }))
      ]);
    });
  }
  var _instrument;
  _instrument = /* @__PURE__ */ new WeakMap();
  var EMPTY_WEBSFZ = Object.freeze({
    meta: {},
    global: {},
    groups: []
  });
  var _websfz;
  var _config2;
  var _stop2;
  var _load2;
  var _output2;
  _websfz = /* @__PURE__ */ new WeakMap();
  _config2 = /* @__PURE__ */ new WeakMap();
  _stop2 = /* @__PURE__ */ new WeakMap();
  _load2 = /* @__PURE__ */ new WeakMap();
  _output2 = /* @__PURE__ */ new WeakMap();
  var PROCESSOR = `"use strict";(()=>{var f=class extends AudioWorkletProcessor{_pDLength;_preDelay;_pDWrite;_lp1;_lp2;_lp3;_excPhase;_taps;_Delays;sampleRate;static get parameterDescriptors(){return[["preDelay",0,0,sampleRate-1,"k-rate"],["bandwidth",.9999,0,1,"k-rate"],["inputDiffusion1",.75,0,1,"k-rate"],["inputDiffusion2",.625,0,1,"k-rate"],["decay",.5,0,1,"k-rate"],["decayDiffusion1",.7,0,.999999,"k-rate"],["decayDiffusion2",.5,0,.999999,"k-rate"],["damping",.005,0,1,"k-rate"],["excursionRate",.5,0,2,"k-rate"],["excursionDepth",.7,0,2,"k-rate"],["wet",1,0,1,"k-rate"],["dry",0,0,1,"k-rate"]].map(e=>new Object({name:e[0],defaultValue:e[1],minValue:e[2],maxValue:e[3],automationRate:e[4]}))}constructor(e){super(),this.sampleRate=sampleRate,this._Delays=[],this._pDLength=sampleRate+(128-sampleRate%128),this._preDelay=new Float32Array(this._pDLength),this._pDWrite=0,this._lp1=0,this._lp2=0,this._lp3=0,this._excPhase=0,[.004771345,.003595309,.012734787,.009307483,.022579886,.149625349,.060481839,.1249958,.030509727,.141695508,.089244313,.106280031].forEach(a=>this.makeDelay(a,sampleRate)),this._taps=Int16Array.from([.008937872,.099929438,.064278754,.067067639,.066866033,.006283391,.035818689,.011861161,.121870905,.041262054,.08981553,.070931756,.011256342,.004065724],a=>Math.round(a*sampleRate))}makeDelay(e,a){let t=Math.round(e*a),s=2**Math.ceil(Math.log2(t));this._Delays.push([new Float32Array(s),t-1,0,s-1])}writeDelay(e,a){return this._Delays[e][0][this._Delays[e][1]]=a}readDelay(e){return this._Delays[e][0][this._Delays[e][2]]}readDelayAt(e,a){let t=this._Delays[e];return t[0][t[2]+a&t[3]]}readDelayCAt(e,a){let t=this._Delays[e],s=a-~~a,d=~~a+t[2]-1,r=t[3],D=t[0][d++&r],l=t[0][d++&r],h=t[0][d++&r],y=t[0][d&r],u=(3*(l-h)-D+y)/2,m=2*h+D-(5*l+y)/2,c=(h-D)/2;return((u*s+m)*s+c)*s+l}process(e,a,t){let s=~~t.preDelay[0],d=t.bandwidth[0],r=t.inputDiffusion1[0],D=t.inputDiffusion2[0],l=t.decay[0],h=t.decayDiffusion1[0],y=t.decayDiffusion2[0],u=1-t.damping[0],m=t.excursionRate[0]/sampleRate,c=t.excursionDepth[0]*sampleRate/1e3,w=t.wet[0]*.6,A=t.dry[0];if(e[0].length==2)for(let i=127;i>=0;i--)this._preDelay[this._pDWrite+i]=(e[0][0][i]+e[0][1][i])*.5,a[0][0][i]=e[0][0][i]*A,a[0][1][i]=e[0][1][i]*A;else if(e[0].length>0){this._preDelay.set(e[0][0],this._pDWrite);for(let i=127;i>=0;i--)a[0][0][i]=a[0][1][i]=e[0][0][i]*A}else this._preDelay.set(new Float32Array(128),this._pDWrite);let o=0;for(;o<128;){let i=0,b=0;this._lp1+=d*(this._preDelay[(this._pDLength+this._pDWrite-s+o)%this._pDLength]-this._lp1);let p=this.writeDelay(0,this._lp1-r*this.readDelay(0));p=this.writeDelay(1,r*(p-this.readDelay(1))+this.readDelay(0)),p=this.writeDelay(2,r*p+this.readDelay(1)-D*this.readDelay(2)),p=this.writeDelay(3,D*(p-this.readDelay(3))+this.readDelay(2));let k=D*p+this.readDelay(3),g=c*(1+Math.cos(this._excPhase*6.28)),x=c*(1+Math.sin(this._excPhase*6.2847)),_=this.writeDelay(4,k+l*this.readDelay(11)+h*this.readDelayCAt(4,g));this.writeDelay(5,this.readDelayCAt(4,g)-h*_),this._lp2+=u*(this.readDelay(5)-this._lp2),_=this.writeDelay(6,l*this._lp2-y*this.readDelay(6)),this.writeDelay(7,this.readDelay(6)+y*_),_=this.writeDelay(8,k+l*this.readDelay(7)+h*this.readDelayCAt(8,x)),this.writeDelay(9,this.readDelayCAt(8,x)-h*_),this._lp3+=u*(this.readDelay(9)-this._lp3),_=this.writeDelay(10,l*this._lp3-y*this.readDelay(10)),this.writeDelay(11,this.readDelay(10)+y*_),i=this.readDelayAt(9,this._taps[0])+this.readDelayAt(9,this._taps[1])-this.readDelayAt(10,this._taps[2])+this.readDelayAt(11,this._taps[3])-this.readDelayAt(5,this._taps[4])-this.readDelayAt(6,this._taps[5])-this.readDelayAt(7,this._taps[6]),b=this.readDelayAt(5,this._taps[7])+this.readDelayAt(5,this._taps[8])-this.readDelayAt(6,this._taps[9])+this.readDelayAt(7,this._taps[10])-this.readDelayAt(9,this._taps[11])-this.readDelayAt(10,this._taps[12])-this.readDelayAt(11,this._taps[13]),a[0][0][o]+=i*w,a[0][1][o]+=b*w,this._excPhase+=m,o++;for(let R=0,n=this._Delays[0];R<this._Delays.length;n=this._Delays[++R])n[1]=n[1]+1&n[3],n[2]=n[2]+1&n[3]}return this._pDWrite=(this._pDWrite+128)%this._pDLength,!0}};registerProcessor("DattorroReverb",f);})();`;
  var PARAMS = [
    "preDelay",
    "bandwidth",
    "inputDiffusion1",
    "inputDiffusion2",
    "decay",
    "decayDiffusion1",
    "decayDiffusion2",
    "damping",
    "excursionRate",
    "excursionDepth",
    "wet",
    "dry"
  ];
  var init = /* @__PURE__ */ new WeakMap();
  function createDattorroReverbEffect(context2) {
    return __async(this, null, function* () {
      let ready = init.get(context2);
      if (!ready) {
        const blob = new Blob([PROCESSOR], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        ready = context2.audioWorklet.addModule(url);
        init.set(context2, ready);
      }
      yield ready;
      const reverb2 = new AudioWorkletNode(context2, "DattorroReverb", {
        outputChannelCount: [2]
      });
      return reverb2;
    });
  }
  var _effect;
  var _ready;
  var _output3;
  var Reverb = class {
    constructor(context2) {
      __privateAdd(this, _effect, void 0);
      __privateAdd(this, _ready, void 0);
      __privateAdd(this, _output3, void 0);
      this.input = context2.createGain();
      __privateSet(this, _output3, context2.destination);
      __privateSet(this, _ready, createDattorroReverbEffect(context2).then((reverb2) => {
        this.input.connect(reverb2);
        reverb2.connect(__privateGet(this, _output3));
        __privateSet(this, _effect, reverb2);
        return this;
      }));
    }
    get paramNames() {
      return PARAMS;
    }
    getParam(name) {
      var _a;
      return (_a = __privateGet(this, _effect)) == null ? void 0 : _a.parameters.get("preDelay");
    }
    get isReady() {
      return __privateGet(this, _effect) !== void 0;
    }
    ready() {
      return __privateGet(this, _ready);
    }
    connect(output) {
      if (__privateGet(this, _effect)) {
        __privateGet(this, _effect).disconnect(__privateGet(this, _output3));
        __privateGet(this, _effect).connect(output);
      }
      __privateSet(this, _output3, output);
    }
  };
  _effect = /* @__PURE__ */ new WeakMap();
  _ready = /* @__PURE__ */ new WeakMap();
  _output3 = /* @__PURE__ */ new WeakMap();
  var Soundfont = class extends Sampler {
    constructor(context2, options) {
      var _a, _b, _c;
      const url = options.instrument.startsWith("http") ? options.instrument : gleitzKitUrl(options.instrument, (_a = options.kit) != null ? _a : "MusyngKite");
      super(context2, {
        destination: options.destination,
        detune: options.detune,
        volume: options.volume,
        velocity: options.velocity,
        decayTime: (_b = options.decayTime) != null ? _b : 0.5,
        lpfCutoffHz: options.lpfCutoffHz,
        buffers: soundfontLoader(url),
        noteToSample: (note, buffers, config) => {
          let midi = toMidi(note.note);
          return midi === void 0 ? ["", 0] : findNearestMidi(midi, buffers);
        }
      });
      const extraGain = (_c = options.extraGain) != null ? _c : 5;
      const gain = new GainNode(context2, { gain: extraGain });
      this.output.addInsert(gain);
    }
  };
  function soundfontLoader(url) {
    return (context2, buffers) => __async(this, null, function* () {
      const sourceFile = yield (yield fetch(url)).text();
      const json = midiJsToJson(sourceFile);
      const noteNames = Object.keys(json);
      yield Promise.all(
        noteNames.map((noteName) => __async(this, null, function* () {
          const midi = toMidi(noteName);
          if (!midi)
            return;
          const audioData = base64ToArrayBuffer(
            removeBase64Prefix(json[noteName])
          );
          const buffer = yield context2.decodeAudioData(audioData);
          buffers[midi] = buffer;
        }))
      );
    });
  }
  function midiJsToJson(source) {
    const header = source.indexOf("MIDI.Soundfont.");
    if (header < 0)
      throw Error("Invalid MIDI.js Soundfont format");
    const start = source.indexOf("=", header) + 2;
    const end = source.lastIndexOf(",");
    return JSON.parse(source.slice(start, end) + "}");
  }
  function removeBase64Prefix(audioBase64) {
    return audioBase64.slice(audioBase64.indexOf(",") + 1);
  }
  function base64ToArrayBuffer(base64) {
    const decoded = window.atob(base64);
    const len = decoded.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes.buffer;
  }
  function gleitzKitUrl(name, kit) {
    var _a;
    const format = (_a = findFirstSupportedFormat(["ogg", "mp3"])) != null ? _a : "mp3";
    return `https://gleitz.github.io/midi-js-soundfonts/${kit}/${name}-${format}.js`;
  }
  var BASE_URL2 = "https://danigb.github.io/samples/splendid-grand-piano";
  var SplendidGrandPiano = class extends Sampler {
    constructor(context2, options = {}) {
      var _a, _b, _c;
      super(context2, {
        destination: options.destination,
        detune: options.detune,
        volume: options.volume,
        velocity: options.velocity,
        decayTime: (_a = options.decayTime) != null ? _a : 0.5,
        lpfCutoffHz: options.lpfCutoffHz,
        buffers: splendidGrandPianoLoader(
          (_b = options.baseUrl) != null ? _b : BASE_URL2,
          (_c = options.storage) != null ? _c : HttpStorage
        ),
        noteToSample: (note, buffers, config) => {
          var _a2;
          const midi = toMidi(note.note);
          if (!midi)
            return [note.note, 0];
          const vel = (_a2 = note.velocity) != null ? _a2 : config.velocity;
          const layerIdx = LAYERS.findIndex(
            (layer2) => vel >= layer2.vel_range[0] && vel <= layer2.vel_range[1]
          );
          const layer = LAYERS[layerIdx];
          if (!layer)
            return ["", 0];
          return findNearestMidiInLayer(layer.name, midi, buffers);
        }
      });
    }
  };
  function findNearestMidiInLayer(prefix, midi, buffers) {
    let i = 0;
    while (buffers[prefix + (midi + i)] === void 0 && i < 128) {
      if (i > 0)
        i = -i;
      else
        i = -i + 1;
    }
    return i === 127 ? [prefix + midi, 0] : [prefix + (midi + i), -i * 100];
  }
  function splendidGrandPianoLoader(baseUrl, storage2) {
    var _a;
    const format = (_a = findFirstSupportedFormat(["ogg", "m4a"])) != null ? _a : "ogg";
    return (context2, buffers) => __async(this, null, function* () {
      for (const layer of LAYERS) {
        yield Promise.all(
          layer.samples.map((_0) => __async(this, [_0], function* ([midi, name]) {
            const url = `${baseUrl}/${name}.${format}`;
            const buffer = yield loadAudioBuffer(context2, url, storage2);
            if (buffer)
              buffers[layer.name + midi] = buffer;
          }))
        );
      }
    });
  }
  var LAYERS = [
    {
      name: "PPP",
      vel_range: [1, 40],
      cutoff: 1e3,
      samples: [
        [23, "PP-B-1"],
        [27, "PP-D#0"],
        [29, "PP-F0"],
        [31, "PP-G0"],
        [33, "PP-A0"],
        [35, "PP-B0"],
        [37, "PP-C#1"],
        [38, "PP-D1"],
        [40, "PP-E1"],
        [41, "PP-F1"],
        [43, "PP-G1"],
        [45, "PP-A1"],
        [47, "PP-B1"],
        [48, "PP-C2"],
        [50, "PP-D2"],
        [52, "PP-E2"],
        [53, "PP-F2"],
        [55, "PP-G2"],
        [56, "PP-G#2"],
        [57, "PP-A2"],
        [58, "PP-A#2"],
        [59, "PP-B2"],
        [60, "PP-C3"],
        [62, "PP-D3"],
        [64, "PP-E3"],
        [65, "PP-F3"],
        [67, "PP-G3"],
        [69, "PP-A3"],
        [71, "PP-B3"],
        [72, "PP-C4"],
        [74, "PP-D4"],
        [76, "PP-E4"],
        [77, "PP-F4"],
        [79, "PP-G4"],
        [80, "PP-G#4"],
        [81, "PP-A4"],
        [82, "PP-A#4"],
        [83, "PP-B4"],
        [85, "PP-C#5"],
        [86, "PP-D5"],
        [87, "PP-D#5"],
        [89, "PP-F5"],
        [90, "PP-F#5"],
        [91, "PP-G5"],
        [92, "PP-G#5"],
        [93, "PP-A5"],
        [94, "PP-A#5"],
        [95, "PP-B5"],
        [96, "PP-C6"],
        [97, "PP-C#6"],
        [98, "PP-D6"],
        [99, "PP-D#6"],
        [100, "PP-E6"],
        [101, "PP-F6"],
        [102, "PP-F#6"],
        [103, "PP-G6"],
        [104, "PP-G#6"],
        [105, "PP-A6"],
        [106, "PP-A#6"],
        [107, "PP-B6"],
        [108, "PP-C7"]
      ]
    },
    {
      name: "PP",
      vel_range: [41, 67],
      samples: [
        [23, "PP-B-1"],
        [27, "PP-D#0"],
        [29, "PP-F0"],
        [31, "PP-G0"],
        [33, "PP-A0"],
        [35, "PP-B0"],
        [37, "PP-C#1"],
        [38, "PP-D1"],
        [40, "PP-E1"],
        [41, "PP-F1"],
        [43, "PP-G1"],
        [45, "PP-A1"],
        [47, "PP-B1"],
        [48, "PP-C2"],
        [50, "PP-D2"],
        [52, "PP-E2"],
        [53, "PP-F2"],
        [55, "PP-G2"],
        [56, "PP-G#2"],
        [57, "PP-A2"],
        [58, "PP-A#2"],
        [59, "PP-B2"],
        [60, "PP-C3"],
        [62, "PP-D3"],
        [64, "PP-E3"],
        [65, "PP-F3"],
        [67, "PP-G3"],
        [69, "PP-A3"],
        [71, "PP-B3"],
        [72, "PP-C4"],
        [74, "PP-D4"],
        [76, "PP-E4"],
        [77, "PP-F4"],
        [79, "PP-G4"],
        [80, "PP-G#4"],
        [81, "PP-A4"],
        [82, "PP-A#4"],
        [83, "PP-B4"],
        [85, "PP-C#5"],
        [86, "PP-D5"],
        [87, "PP-D#5"],
        [89, "PP-F5"],
        [90, "PP-F#5"],
        [91, "PP-G5"],
        [92, "PP-G#5"],
        [93, "PP-A5"],
        [94, "PP-A#5"],
        [95, "PP-B5"],
        [96, "PP-C6"],
        [97, "PP-C#6"],
        [98, "PP-D6"],
        [99, "PP-D#6"],
        [100, "PP-E6"],
        [101, "PP-F6"],
        [102, "PP-F#6"],
        [103, "PP-G6"],
        [104, "PP-G#6"],
        [105, "PP-A6"],
        [106, "PP-A#6"],
        [107, "PP-B6"],
        [108, "PP-C7"]
      ]
    },
    {
      name: "MP",
      vel_range: [68, 84],
      samples: [
        [23, "Mp-B-1"],
        [27, "Mp-D#0"],
        [29, "Mp-F0"],
        [31, "Mp-G0"],
        [33, "Mp-A0"],
        [35, "Mp-B0"],
        [37, "Mp-C#1"],
        [38, "Mp-D1"],
        [40, "Mp-E1"],
        [41, "Mp-F1"],
        [43, "Mp-G1"],
        [45, "Mp-A1"],
        [47, "Mp-B1"],
        [48, "Mp-C2"],
        [50, "Mp-D2"],
        [52, "Mp-E2"],
        [53, "Mp-F2"],
        [55, "Mp-G2"],
        [56, "Mp-G#2"],
        [57, "Mp-A2"],
        [58, "Mp-A#2"],
        [59, "Mp-B2"],
        [60, "Mp-C3"],
        [62, "Mp-D3"],
        [64, "Mp-E3"],
        [65, "Mp-F3"],
        [67, "Mp-G3"],
        [69, "Mp-A3"],
        [71, "Mp-B3"],
        [72, "Mp-C4"],
        [74, "Mp-D4"],
        [76, "Mp-E4"],
        [77, "Mp-F4"],
        [79, "Mp-G4"],
        [80, "Mp-G#4"],
        [81, "Mp-A4"],
        [82, "Mp-A#4"],
        [83, "Mp-B4"],
        [85, "Mp-C#5"],
        [86, "Mp-D5"],
        [87, "Mp-D#5"],
        [88, "Mp-E5"],
        [89, "Mp-F5"],
        [90, "Mp-F#5"],
        [91, "Mp-G5"],
        [92, "Mp-G#5"],
        [93, "Mp-A5"],
        [94, "Mp-A#5"],
        [95, "Mp-B5"],
        [96, "Mp-C6"],
        [97, "Mp-C#6"],
        [98, "Mp-D6"],
        [99, "Mp-D#6"],
        [100, "PP-E6"],
        [101, "Mp-F6"],
        [102, "Mp-F#6"],
        [103, "Mp-G6"],
        [104, "Mp-G#6"],
        [105, "Mp-A6"],
        [106, "Mp-A#6"],
        [107, "PP-B6"],
        [108, "PP-C7"]
      ]
    },
    {
      name: "MF",
      vel_range: [85, 100],
      samples: [
        [23, "Mf-B-1"],
        [27, "Mf-D#0"],
        [29, "Mf-F0"],
        [31, "Mf-G0"],
        [33, "Mf-A0"],
        [35, "Mf-B0"],
        [37, "Mf-C#1"],
        [38, "Mf-D1"],
        [40, "Mf-E1"],
        [41, "Mf-F1"],
        [43, "Mf-G1"],
        [45, "Mf-A1"],
        [47, "Mf-B1"],
        [48, "Mf-C2"],
        [50, "Mf-D2"],
        [52, "Mf-E2"],
        [53, "Mf-F2"],
        [55, "Mf-G2"],
        [56, "Mf-G#2"],
        [57, "Mf-A2"],
        [58, "Mf-A#2"],
        [59, "Mf-B2"],
        [60, "Mf-C3"],
        [62, "Mf-D3"],
        [64, "Mf-E3"],
        [65, "Mf-F3"],
        [67, "Mf-G3"],
        [69, "Mf-A3"],
        [71, "Mf-B3"],
        [72, "Mf-C4"],
        [74, "Mf-D4"],
        [76, "Mf-E4"],
        [77, "Mf-F4"],
        [79, "Mf-G4"],
        [80, "Mf-G#4"],
        [81, "Mf-A4"],
        [82, "Mf-A#4"],
        [83, "Mf-B4"],
        [85, "Mf-C#5"],
        [86, "Mf-D5"],
        [87, "Mf-D#5"],
        [88, "Mf-E5"],
        [89, "Mf-F5"],
        [90, "Mf-F#5"],
        [91, "Mf-G5"],
        [92, "Mf-G#5"],
        [93, "Mf-A5"],
        [94, "Mf-A#5"],
        [95, "Mf-B5"],
        [96, "Mf-C6"],
        [97, "Mf-C#6"],
        [98, "Mf-D6"],
        [99, "Mf-D#6"],
        [100, "Mf-E6"],
        [101, "Mf-F6"],
        [102, "Mf-F#6"],
        [103, "Mf-G6"],
        [104, "Mf-G#6"],
        [105, "Mf-A6"],
        [106, "Mf-A#6"],
        [107, "Mf-B6"],
        [108, "PP-C7"]
      ]
    },
    {
      name: "FF",
      vel_range: [101, 127],
      samples: [
        [23, "FF-B-1"],
        [27, "FF-D#0"],
        [29, "FF-F0"],
        [31, "FF-G0"],
        [33, "FF-A0"],
        [35, "FF-B0"],
        [37, "FF-C#1"],
        [38, "FF-D1"],
        [40, "FF-E1"],
        [41, "FF-F1"],
        [43, "FF-G1"],
        [45, "FF-A1"],
        [47, "FF-B1"],
        [48, "FF-C2"],
        [50, "FF-D2"],
        [52, "FF-E2"],
        [53, "FF-F2"],
        [55, "FF-G2"],
        [56, "FF-G#2"],
        [57, "FF-A2"],
        [58, "FF-A#2"],
        [59, "FF-B2"],
        [60, "FF-C3"],
        [62, "FF-D3"],
        [64, "FF-E3"],
        [65, "FF-F3"],
        [67, "FF-G3"],
        [69, "FF-A3"],
        [71, "FF-B3"],
        [72, "FF-C4"],
        [74, "FF-D4"],
        [76, "FF-E4"],
        [77, "FF-F4"],
        [79, "FF-G4"],
        [80, "FF-G#4"],
        [81, "FF-A4"],
        [82, "FF-A#4"],
        [83, "FF-B4"],
        [85, "FF-C#5"],
        [86, "FF-D5"],
        [88, "FF-E5"],
        [89, "FF-F5"],
        [91, "FF-G5"],
        [93, "FF-A5"],
        [95, "Mf-B5"],
        [96, "Mf-C6"],
        [97, "Mf-C#6"],
        [98, "Mf-D6"],
        [99, "Mf-D#6"],
        [100, "Mf-E6"],
        [102, "Mf-F#6"],
        [103, "Mf-G6"],
        [104, "Mf-G#6"],
        [105, "Mf-A6"],
        [106, "Mf-A#6"],
        [107, "Mf-B6"],
        [108, "Mf-C7"]
      ]
    }
  ];

  // lib/assets/input.js
  var samples = {
    kick: "https://danigb.github.io/samples/drum-machines/808-mini/kick.m4a",
    snare: "https://danigb.github.io/samples/drum-machines/808-mini/snare-1.m4a",
    zmart: "/zmart_zellz.flac"
  };
  var sampler = new Sampler(new AudioContext(), { samples });
  var context = new AudioContext();
  var storage = new CacheStorage();
  var reverb = new Reverb(context);
  var piano = new SplendidGrandPiano(context, { volume, storage, decayTime: 0.5 });
  var marimba = new Soundfont(context, { instrument: "marimba" });
})();
