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

  def application do
    [
      extra_applications: [:logger, :os_mon],
      mod: {KinoSampler.Application, []}
    ]
  end

  defp deps do
    [
      {:kino, "~> 0.9.4"}
    ]
  end
end
