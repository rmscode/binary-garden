# Hardware Archive

## Raspberry Pi 5 (Bookwork) Xorg Issues

!!! info

    Archived on: 05.11.2024

    Reason: Outdated. DietPi devs addressed the issue in the 9.4 release.


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


