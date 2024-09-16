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
2. Choose the protocol from the drop down to the left of the search bar
3. Insert the hostname or IP of the target machine in the search bar
4. Click on connect

You will be prompted for credentials if needed. Defining the "Domain" is not needed in my experience.

## Disable Storing of Passwords

Users have the option to save their passwords when using a connection profile. To disable this feature, edit the profile in `$HOME/.local/share/remmina` and set `disablepasswordstoring` to `1`.

## Securing the Remmina Client

Remmina allows you to protect the client with a master passphrase. This passphrase will be required to make any configuration changes, but will not prevent a user from initiating a remote session.

1. Go to **Preferences** (Three horizontal lines, upper right)
2. Click the **Security** tab
3. Toggle on **Remmina Password** and set your passphrase.
4. Toggle on **Require to modify**

Additionally you can set the timeout for the passphrase to be required again. The default is 300 seconds, or 5 minutes.