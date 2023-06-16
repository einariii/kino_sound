defmodule KinoSampler.Player do
  use Membrane.Pipeline
  alias Membrane.{Fake}
  @impl true
  def handle_init(_opts) do
    links = [
      child(:file, %Membrane.File.Source{location: "./assets/zmart_zellz.flac"})
      |> child(:parser, %Membrane.FLAC.Parser{streaming?: false})
      |> child(:fake_sink, Fake.Sink.Buffers)
    ]
    {[spec: links], %{}}
  end
end
