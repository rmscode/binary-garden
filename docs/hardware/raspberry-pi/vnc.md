# VNC

The default Pi app for VNC was RealVnc. At some point that product was made free for personal use only. As of 12/11/23, RealVnc has not be removed from the Pi but it can be with the following code:

```bash
sudo apt remove realvnc-vnc-server
sudo apt remove realvnc-vnc-viewer
```

To set up a new VNC client, use the following code. Other VNC solutions give a desktop per user. They don't let you sign into the running session.

Install the TigerVNC X extension:

```bash
sudo apt install tigervnc-xorg-extension
```

!!! note

    Tiger VNC can be easily installed in [DietPi](dietpi.md) by running the `dietpi-software` commmand and following the prompts.

Create an xorg config file to load the extension:

```bash
sudo mkdir /etc/X11/xorg.conf.d
sudo nano /etc/X11/xorg.conf.d/10.vnc.conf
```

Add the following to the config file:

```text
Section "Module"
  Load "vnc"
EndSection

Section "Screen"
  Identifier "Screen0"
  Option "Desktop" "<INSERT DEVICE NAME>"
  Option "SecurityTypes" "TLSPlain"
  Option "PlainUsers" "<INSERT USER NAME>"
EndSection
```

Restart the display manager:

```bash
sudo systemctl restart lightdm
```

To connect to the Pi, download and run [vncviewer64](https://github.com/TigerVNC/tigervnc/releases) from TigerVNC. Input the Pi's IP address and use the default user/password.

[*Reference*](https://the-eg.github.io/2022/01/22/tigervnc-server-rpi.html)