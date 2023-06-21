defmodule KinoSound do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Smart Sounds"
  alias KinoSound.Player

  @impl true
  def init(attrs, ctx) do
    pid = self()
    :ets.new(:sound, [:named_table, :set, :public])
    :ets.insert(:sound, {:pid, pid})
    pid_str = pid_to_string(pid)

    fields = %{
      pid: attrs["pid"] || pid_str
    }

    {:ok, assign(ctx, fields: fields)}
  end

  defp pid_to_string(pid) do
    full_pid = "#{inspect(pid)}"
    Regex.scan(~r/\d+\.\d+\.\d+/, full_pid)
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{fields: ctx.assigns.fields}, ctx}
  end

  def handle_event("play", _sample, ctx) do
    {:noreply, ctx}
  end

  def handle_info(msg, ctx) do
    broadcast_event(ctx, msg, [])
    {:noreply, ctx}
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

  def get_pid() do
    :ets.lookup(:sound, :pid)
  end
end
