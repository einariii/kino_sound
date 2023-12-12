# KinoSound

A smart cell for Elixir Livebook that allows you to sonify your code. 
Set sound notifications for your errors, crashes, and successful evaluations. Or, make music.

## Installation

In the Notebook dependencies and setup cell at the top of your livebook, install using: 

`Mix.install([{:kino_sound, git: "git://github.com/einariii/kino_sound.git", branch: "main"}])`

or

`Mix.install([{:kino_sound, path: "."}])`

if you have cloned the project locally.

In any subsequent cell, choose "Smart Sounds" from the `+ Smart` dropdown menu. Instructions for use are given in the smart cell itself.

A demo performance titled kino_sound_demo.exs is available in the project directory. Copy the code into a Livebook cell and evaluate to hear.

Pending publication on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at <https://hexdocs.pm/kino_sound>.

All sounds created with Elixir code using [Pipesines](https://github.com/einariii/pipesines).
Feel free to insert your own sounds by adding them to assets/samples and modifying assets/main.js accordingly.

