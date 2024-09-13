# Remmina (Linux)

Remmina is a free and open source remote desktop client for Linux. It supports Remote Desktop Protocol (RDP), VNC, NX, XDMCP, SPICE, X2Go and SSH. It uses [FreeRDP](https://www.freerdp.com/) as its foundation.

Remmina is available in the official package repositories for Debian and Ubuntu among others.

!!! info 

    For information on how to create a remote desktop thin client using Remmina, click [here](../hardware/raspberry-pi/dietpi.md#custom-auto-start-with-auto-login).

## Installation (Debian/Ubuntu)

```bash
sudo apt install remmina
```

### Adding support for RDP

```bash
sudo apt install remmina-plugin-rdp
```

## Usage

### Create a New Connection Profile

1. Open Remmina
2. Click on the **New Profile** button (`+`)
3. Select the protocol you want to use from the drop down menu
4. Fill in the required information and click **Save**

!!! info 

    Connection profiles are saved in `$HOME/.local/share/remmina` by default.

### Quick Connect

Use this if you don't need or want to save your connection. Only RDP, SSH, VNC and NX are supported in the quick connect dialog.

1. Open Remmina
2. Choose the protocol
3. Insert the hostname or IP of the target machine
4. Click on connect

You will be prompted for you credentials if needed. Defining the "Domain" is not needed in my experience.

## Disable Storing of Passwords

Users have the option to save their passwords when using a connection profile. To disable this feature, edit the profile in `$HOME/.local/share/remmina` and set `disablepasswordstoring` to `1`.

!!! note

    Unfortunately, this isn't a bullet proof method for preventing users from saving their passwords. Users, can edit the profile and untick the "Forget passwords" option which is the same as setting `disablepasswordstoring` to `0`.