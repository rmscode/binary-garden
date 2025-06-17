# Pulse Audio <small>(Linux)</small>

PulseAudio is a network-capable sound server program distributed via the [freedesktop.org](https://freedesktop.org) project. It runs mainly on Linux, various BSD distributions, and other Unix-like systems.

!!! question "Why do we need PulseAudio when [ALSA](alsa.md) exists?"

    ALSA is part of the Linux kernel and provides the necessary device drivers to read from/write to the sound card. Applications like VLC and Audacity can directly use ALSA without needing an audio server like PulseAudio. However, you can't rely on ALSA as it will take full control of the sound device, allowing only one application to use it at a time because there is no hardware multiplexing. For this reason, an audio server like PulseAudio is often needed.

    The arrival of PulseAudio solved three major problems with ALSA:

    - Play audio from multiple applications at the same time.
    - Advanced features like mixing multiple audio streams, audio streaming, per application volume control, and more.
    - Ease of use.

    [*Reference*](https://itsfoss.com/pipewire-vs-pulseaudio/)

## Installation

Most distributions come with PulseAudio pre-installed and configured to run the daemon by default as a service. However, if yours does not, here are some first steps...

Install:

```bash title="Ubuntu/Debian"
sudo apt install pulseaudio -y
```

## Configuration

By default, PulseAudion is configured to automatically detect and manage all sound cards. It takes control of all detected ALSA devices and redirects all audio streams to itself. Usually, PulseAudio runs fine out of the box and requires only minimal configuration. Unless you have a specific use case, you should not need to change the default configuration.

### Configuration Files

PulseAudio will first look for config files in the home directory `~/config/pulse/`, and if they are not found, the system-wide configuration from `/etc/pulse/` will be used.

!!! tip

    - It is strongly recommended to avoid editing the system-wide configuration files, but rather edit user ones. Create the `~/.config/pulse/` directory if it does not exist and copy the system-wide configuration files to it.
    - Make sure to keep user configuration in sync with changes to the packaged files in `/etc/pulse/` or PulseAudio may refuse to start.
    - There is usually no need to add your user to the `audio` group since PulseAudio give access dynamically to the currently active user.

[*Reference*](https://wiki.archlinux.org/title/PulseAudio#Configuration)
