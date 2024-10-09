# Advanced Linux Sound Architecture (ALSA)

The Advanced Linux Sound Architecture (ALSA) provides audio and MIDI functionality to the Linux operating system. ALSA is a software framework and part of the Linux kernel that provides an API for sound card device drivers.

!!! note "It is often recommended to use an audio server like [PulseAudio](pulse-audio.md) on top of ALSA for better audio management."

## Installation

```bash title="Ubuntu/Debian"
sudo apt install alsa-utils
```

## Usage

### Graphical Interface

!!! note "This is a terminal-based interface...not a windowed GUI app"

```bash
alsamixer
```

The Alsamixer will display the properties of your default sound card. Navigating the interface is quite simple.

- <kbd>F6</kbd> to select a sound card.
- <kbd>TAB</kbd> to switch between playback and capture devices.
- <kbd>←</kbd> and <kbd>→</kbd> to select the channel.
- <kbd>↑</kbd> and <kbd>↓</kbd> to adjust the levels.
- <kbd>M</kbd> when a channel is selected to mute/unmute it.
- <kbd>F1</kbd> to view the help menu.
- <kbd>Esc</kbd> to exit.

### Command Line

Amixer is a command-line tool to control the audio settings.

```bash
amixer <options> [command]
```

Most commands typically look like this:

```bash
amixer -c [card-number] set [control] [value]
```

You need to specify three things in all `amixer` commands:

- The sound card whose properties you want to change
- The channel/property whose levels you want to adjust
- The level value in percentage or decibels that you want to set, increase or decrease.

View all the channels/properties that you can manage with the following command:

```bash
amixer scontrols
```

Examples:

!!! example "Set Master channel of the first sound card to 100%"

    ```bash
    amixer -c 0 set Master 100%
    ```

!!! example "Set the volume of the Speaker property of the second sound card to 3db"

    ```bash
    amixer -c 1 set Speaker 3db
    ```

!!! example "Increase the volume of the Master channel of the first sound card by 1db"

    ```bash
    amixer-c 0 set Master 1db+
    ```

To se all that you can do with `amixer`, run `amixer --help`.