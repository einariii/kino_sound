defmodule KinoSampler do
  use Kino.JS, assets_path: "lib/assets"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Smart Sounds"
  alias KinoSampler.Player

  # @my_attribute nil

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

  def just_pid do
    self()
  end

  def finished(message) do
    broadcast_event(self(), message, [])
  end

  # def set_attribute(value) do
  #   @my_attribute = value
  # end

  @impl true
  def handle_connect(ctx) do
    # my_attribute = get_attribute_value()
    # IO.puts(my_attribute)
    {:ok, %{fields: ctx.assigns.fields}, ctx}
  end

  def handle_event("play", _sample, ctx) do
    {:noreply, ctx}
  end

  def handle_info(msg, _sample, ctx) do
    # pid = pid_to_string()
    # receive do
    #   {pid, :beckon} ->
    #     broadcast_event(self(), "finished", ctx)
    #   end

    receive do
      :finished ->
        broadcast_event(self(), "finished", ctx)
    end
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
  #   my_attribute = get_attribute_value()

  #   # Use the attribute value in your smart cell logic
  #   IO.puts(my_attribute)
  #   {:ok, %{}, assigns}
  # end

  # Private function to set the attribute value
  defp get_attribute_value() do
    "Hello, smart cell!"
  end
end
