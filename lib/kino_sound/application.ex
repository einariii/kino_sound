defmodule KinoSound.Application do
  @moduledoc """
  A smart cell for Elixir's Livebook that sonifies your workflow.
  """
  use Application

  @impl true
  def start(_type, _args) do
    Kino.SmartCell.register(KinoSound)
    children = []

    opts = [strategy: :one_for_one, name: KinoSound.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
