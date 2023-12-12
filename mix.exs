defmodule KinoSound.MixProject do
  use Mix.Project

  def project do
    [
      app: :kino_sound,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :dev,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {KinoSound.Application, []}
    ]
  end

  defp deps do
    [
      {:kino, "~> 0.9.4"}
    ]
  end
end
