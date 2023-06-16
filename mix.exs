defmodule KinoSampler.MixProject do
  use Mix.Project

  def project do
    [
      app: :kino_sampler,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {KinoSampler.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:kino, "~> 0.9.4"},
      {:membrane_core, "~> 0.12.1"},
      {:membrane_portaudio_plugin, "~> 0.16.0"},
      {:membrane_flac_plugin, "~> 0.10.0"}
    ]
  end
end
