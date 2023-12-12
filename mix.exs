defmodule KinoSound.MixProject do
  use Mix.Project

  @name "kino_util"
  @description "A smart cell for Elixir's Livebook that sonifies your workflow."
  @version "0.1.1"
  @source_url "https://github.com/einariii/kino_sound"

  def project do
    [
      app: :kino_sound,
      name: @name,
      description: @description,
      source_url: @source_url,
      version: @version,
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :dev,
      docs: docs(),
      deps: deps(),
      aliases: aliases(),
      package: package()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {KinoSound.Application, []}
    ]
  end

  defp docs do
    [
      extras: [{:"README.md", [title: "Overview"]}],
      main: "readme",
      source_url: @source_url,
      source_ref: "v#{@version}"
    ]
  end

  defp deps do
    [
      {:kino, "~> 0.9.4"},
      {:ex_doc, ">= 0.0.0", only: :dev, runtime: false}
    ]
  end

  defp aliases do
    [
      docs: "docs --formatter html"
    ]
  end

  defp package() do
    [
      files: ~w(lib .formatter.exs mix.exs README* LICENSE*),
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/einariii/kino_sound"}
    ]
  end
end
