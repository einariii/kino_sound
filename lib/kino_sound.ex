defmodule KinoSound do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Smart Sounds"

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

  def success, do: get_pid() |> send("success")
  def error, do: get_pid() |> send("error")
  def restart, do: get_pid() |> send("restart")
  def store, do: get_pid() |> send("store")
  def kill, do: get_pid() |> send("kill")
  def log, do: get_pid() |> send("log")
  def symphony, do: get_pid() |> send("symphony")
  def crash, do: get_pid() |> send("crash")
  def off_and_on, do: get_pid() |> send("off_and_on")
  def print, do: get_pid() |> send("print")

  @impl true
  def handle_connect(ctx) do
    {:ok, %{fields: ctx.assigns.fields}, ctx}
  end

  @impl true
  def handle_event("play", _sample, ctx) do
    {:noreply, ctx}
  end

  @impl true
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

  defp get_pid() do
    :ets.lookup(:sound, :pid)
    |> Keyword.get(:pid)
  end

  defp pid_to_string(pid) do
    full_pid = "#{inspect(pid)}"
    # Regex.scan(~r/\d+\.\d+\.\d+/, full_pid)
  end
end
