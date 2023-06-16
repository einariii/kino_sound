defmodule KinoSampler do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Smart Sounds"
  alias KinoSampler.Player

  @impl true
  def init(attrs, ctx) do
    fields = %{}

    Process.send(self(), "update", [])
    {:ok, assign(ctx, fields: fields)}
  end

  def handle_event("play", ctx) do
    # Start playing the audio sample(s)
    # Update the ctx with the playback state
    {:noreply, ctx}
  end

  def handle_event("stop", ctx) do
    # Stop playing the audio sample(s)
    # Update the ctx with the playback state
    # {:noreply, assign(socket, samples_playing: false)}
    {:noreply, ctx}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{fields: ctx.assigns.fields}, ctx}
  end

  @impl true
  def to_attrs(ctx) do
    ctx.assigns.fields
  end

  @impl true
  def to_source(_attrs) do
    quote do
      :ok
    end
    |> Kino.SmartCell.quoted_to_string()
  end
end
