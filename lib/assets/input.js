import { SplendidGrandPiano, Soundfont } from "smplr";
// import { CacheStorage } from "smplr";
import { Reverb } from "smplr";
import { Sampler } from "smplr";

export const samples = {
  kick: "https://danigb.github.io/samples/drum-machines/808-mini/kick.m4a",
  snare: "https://danigb.github.io/samples/drum-machines/808-mini/snare-1.m4a",
  zmart: "/zmart_zellz.flac"
};
export const sampler = new Sampler(new AudioContext(), { samples });

export const context = new AudioContext();
export const storage = new CacheStorage();
export const reverb = new Reverb(context);
export const piano = new SplendidGrandPiano(context, { volume, storage, decayTime: 0.5 });
export const marimba = new Soundfont(context, { instrument: "marimba" });   
