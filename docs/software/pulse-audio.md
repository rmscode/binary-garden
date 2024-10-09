# Pulse Audio (Linux)

PulseAudio is a network-capable sound server program distributed via the [freedesktop.org](https://freedesktop.org) project. It runs mainly on Linux, various BSD distributions, and other Unix-like systems.

!!! question "Why do we need PulseAudio when [ALSA](alsa.md) exists?

    ALSA is part of the Linux kernel and provides the necessary device drivers to read from/write to the sound card. Applications like VLC and Audacity can directly use ALSA without needing an audio server like PulseAudio. However, you can't rely on ALSA as it will take full control of the sound device, allowing only one application to use it at a time because there is no hardware multiplexing. For this reason, an audio server like PulseAudio is often needed.

    The arrival of PulseAudio solved three major problems with ALSA:

    - Play audio from multiple applications at the same time.
    - Advanced features like mixing multiple audio streams, audio streaming, per application volume control, and more.
    - Ease of use.

    [*Reference*](https://itsfoss.com/pipewire-vs-pulseaudio/)

## Installation

Most distributions come with PulseAudio pre-installed and configured to run the daemon by default as a service. However, if yours does not, here are some first steps:


Install:

```bash title="Ubuntu/Debian"
sudo apt install pulseaudio -y
```

## Usage
