defmodule KinoSampler do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Smart Sounds"
  alias KinoSampler.Player

  @attribute :my_attribute

  @impl true
  def init(_attrs, ctx) do
    pid = pid_to_string()
    fields = %{
      pid: pid
      # pid: attrs["pid"] || ""
    }

    # Process.send(self(), "play", [])
    {:ok, assign(ctx, fields: fields)}
  end

  defp pid_to_string do
    self = self()
    full_pid = "#{inspect(self)}"
    Regex.scan(~r/\d+\.\d+\.\d+/, full_pid)
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{fields: ctx.assigns.fields}, ctx}
  end

  def handle_event("play", _sample, ctx) do
    {:noreply, ctx}
  end

  def handle_event("finished", _sample, ctx) do
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

  # @impl true
  # def handle_connect(_assigns) do
  #   # Retrieve the value of the attribute
  #   my_attribute = get_attr(:my_attribute)

  #   # Use the attribute value in your smart cell logic
  #   IO.puts(my_attribute)
  #   {:ok, %{}, assigns}
  # end
end
