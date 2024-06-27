# Archive

Instead of deleting notes/docs that are no longer relevant, incorrect, or outdated, I've decided to archive them here. This way, I can still reference them if needed, but they won't clutter up the main notes/docs section.

I've come up with the following format for categorizing the reasons for archiving a note or doc:

- **Outdated**: The information is no longer accurate or relevant.
- **Incorrect**: The information is incorrect or inaccurate.
- **Redundant**: The information is duplicated elsewhere.
- **Deprecated**: The information is still accurate but is no longer recommended or supported.
- **Other**: None of the above reasons apply.

---

# General

# Hardware

## Raspberry Pi

### Raspberry Pi 5 (Bookwork) Xorg Issues

Archived on: 05.11.2024

Reason: Outdated. DietPi devs addressed the issue in the 9.4 release.

```md
This is a result of Debian moving away from X in favor of Wayland in the latest release (Bookworm). The kernel creates two devices, `/dev/dri/card0` and `/dev/dri/card1`. One is for vc4 (display) and the other is for v3d (3d hardware). They are allocated randomly. X is dumb, it just uses `/dev/dri/card0` which ends up working/failing half of the time. The generic Debian packages don't know that Pi has a display driver called vc4, so you need a config file to describe that. The Raspberry Pi devs don't care about X working in their lite versions because they are intended to be used without a desktop, so they didn't bother to address this issue. I assume that DietPi is based on the lite images of Raspberry Pi OS, so it must have inherited the same problem.

The solution is to create a configuration file that tells X to use the vc4 card for display:

1. `touch /etc/X11/xorg.conf.d/99-vc4.conf`
2. `nano /etc/X11/xorg.conf.d/99-vc4.conf` and add the following content:
    ```
    Section "OutputClass"
      Identifier "vc4"
      MatchDriver "vc4"
      Driver "modesetting"
      Option "PrimaryGPU" "true"
    EndSection
    ```

!!! note

    The simplest way to do this would be by installing the `gldriver-test` package, which will automatically create the necessary configuration file. However, this package is not available in the DietPi repositories. I've mentioned this to the devs, so hopefully it will be added in the future.

<https://forums.raspberrypi.com/viewtopic.php?t=361902>
```

# Networking

# Servers

# Software

# SOP
