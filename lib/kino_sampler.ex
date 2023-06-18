defmodule KinoSampler do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Smart Sounds"
  alias KinoSampler.Player

  @impl true
  def init(attrs, ctx) do
    pid = self()
    :ets.new(:sampler, [:named_table, :set, :public])
    :ets.insert(:sampler, {:pid, pid})
    pid_str = pid_to_string(pid)

    fields = %{
      # pid: pid
      pid: attrs["pid"] || pid_str
    }

    # Process.send(self(), "play", [])
    {:ok, assign(ctx, fields: fields)}
  end

  defp pid_to_string(pid) do
    full_pid = "#{inspect(pid)}"
    Regex.scan(~r/\d+\.\d+\.\d+/, full_pid)
  end

  # thought users maybe could call this directly from a regular cell but broadcast_event requires ctx which is out of scope in that case
  # example call:
  # KinoSampler.finished("finished")
  def finished(msg, ctx) do
    broadcast_event(ctx, msg, [])
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
    # case msg do
    #   "finished" -> broadcast_event(ctx, "finished", [])
    #   "error" -> broadcast_event(ctx, "error", [])
    #   "saved" -> broadcast_event(ctx, "saved", [])
    #   "deleted" -> broadcast_event(ctx, "deleted", [])
    #   "random" -> broadcast_event(ctx, "random", [])
    #   "superrandom" -> broadcast_event(ctx, "superrandom", [])
    # end

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
    :ets.lookup(:sampler, :pid)
  end
end
