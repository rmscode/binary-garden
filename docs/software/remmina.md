# Remmina <small>(Linux)</small>

Remmina is a free and open source remote desktop client for Linux. It supports Remote Desktop Protocol (RDP), VNC, NX, XDMCP, SPICE, X2Go and SSH. It uses [FreeRDP](https://www.freerdp.com/) as its foundation.

Remmina is available in the official package repositories for Debian and Ubuntu among others.

!!! info 

    For information on how to create a remote desktop thin client using Remmina, click [here](../general/guides/remmina-thin-client.md).

## Installation <small>(Debian/Ubuntu)</small> { data-toc-label="Installation" }

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

You will be prompted for credentials if needed. Defining the Domain was not needed in my experience.

### Audio Output

To ensure that audio from a remote machine is passed through to the local machine (Remmina client), adjust the connection profile settings:

Right-click on a connection profile > **Edit** > **Advanced** > **Audio output mode** -> Select **Local**; OR

Manually edit the connection profile in `~/.local/share/remmina` and set the `sound` property to `local`.

```txt title="Example"
[remmina]
...
sound=local
...
```

!!! tip "Try this one liner!"

    ```bash
    sed -i 's/^sound=.*/sound=local/' ~/.local/share/remmina/name_of_profile.remmina
    ```

## Securing the Remmina Client

### Master Passphrase

Remmina allows you to protect the client with a master passphrase. This passphrase will be required to make any configuration changes, but will not prevent a user from initiating a remote session.

1. Go to **Preferences** (Three horizontal lines, upper right)
2. Click the **Security** tab
3. Toggle on **Remmina Password** and set your passphrase.
4. Toggle on **Require to modify**

Additionally you can set the timeout for the passphrase to be required again. The default is 300 seconds, or 5 minutes.

### Disable Storing of Passwords

To prevent users from saving passwords, you can disable the storing of passwords in their connection profiles:

Right-click on a connection profile > **Edit** > **Advanced** > Scroll to the bottom and tick the box for **Forget passwords after use**; OR

Manually edit the connection profile in `~/.local/share/remmina` and set the `disablepasswordstoring` property to `1`.

```text title="Example"
[remmina]
...
disablepasswordstoring=1
...
```

!!! tip "Try this one liner!"

    ```bash
    sed -i 's/^disablepasswordstoring=.*/disablepasswordstoring=1/' ~/.local/share/remmina/name_of_profile.remmina
    ```

### Remove the External Tools

Remmina has a set of external tools that can bee accessed by right-clicking a connection profile and selecting "Tools". This menu contains shell scripts for `nslookup`, `traceroute`, `ping`, and `FileZilla SFTP`. Running any of these will spawn a window with a fully authenticated terminal session.

To remove these items from the menu, move the scripts to a different directory:

```bash
sudo mkdir /usr/share/remmina/external_tools/removed/

sudo mv /usr/share/remmina/external_tools/remmina_filezilla_sftp.sh /usr/share/remmina/external_tools/remmina_nslookup.sh /usr/share/remmina/external_tools/remmina_traceroute.sh /usr/share/remmina/external_tools/remmina_filezilla_sftp_pki.sh /usr/share/remmina/external_tools/remmina_ping.sh /usr/share/remmina/external_tools/removed/
```
