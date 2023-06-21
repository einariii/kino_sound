defmodule KinoSoundDemo do
  @dot ["dmp1", "dmp4", "dmp8"]
  @windows ["windows2"]
  @matrix ["dmp7"]
  @ninetyfive ["windows4"]
  @printer ["dmp6"]
  @outro ["windows"]
  @crash ["crash"]
  @zmart ["zmart"]
  @low ["windows5"]

  def loop(0), do: :ok

  def loop(n) do
    sound_pid = KinoSound.get_pid() |> Keyword.get(:pid) |> IO.inspect()

    # Enum.map(1..17, fn msg ->
    #   Process.sleep(90)
    #   send(sound_pid, "dmp1")
    #   Process.sleep(150)
    #   send(sound_pid, "dmp9")
    # end)

    Enum.map(@dot, fn msg ->
      Process.sleep(700)
      send(sound_pid, msg)
    end)

    Enum.map(@windows, fn msg ->
      Process.sleep(1800)
      send(sound_pid, msg)
    end)

    Enum.map(@matrix, fn msg ->
      Process.sleep(1200)
      send(sound_pid, msg)
    end)

    Enum.map(@printer, fn msg ->
      Process.sleep(350)
      send(sound_pid, msg)
    end)

    Enum.map(@zmart, fn msg ->
      Process.sleep(3200)
      send(sound_pid, msg)
    end)

    Enum.map(@crash, fn msg ->
      Process.sleep(2700)
      send(sound_pid, msg)
    end)

    Enum.map(@crash, fn msg ->
      Process.sleep(7200)
      send(sound_pid, msg)
    end)

    # Enum.map(1..3, fn msg ->
    #   Process.sleep(90)
    #   send(sound_pid, "windows3")
    # end)

    loop(n - 1)
  end
end

KinoSoundDemo.loop(100)
