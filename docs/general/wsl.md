# Windows Subsystem for Linux <small>(WSL)</small>

## How to Install Linux on Windows with WSL

### Prerequisites

- Windows 10 (Build 19041 and higher) or Windows 11

If you are on earlier versions please see [the manual install page](https://learn.microsoft.com/en-us/windows/wsl/install-manual).

### Install WSL command

Everything you need to run WSL can be accomplished with a single command in an elevated PowerShell or Command Prompt.

```ps
wsl --install
```

This will enable the features necessary to run WSL and install the Ubuntu distro.

### Change the default Linux Distro Installed

By default, Ubuntu wil be installed. This can be changed with the `-d` flag.

```ps
wsl --install -d <distro name>
```

To see a list of available distros, enter `wsl --list --online`.

---

## Accessing a Linux File System Format on Windows from WSL

If you find yourself needing to access the contents of a drive formatted in a Linux specific file system, but don't have immediate access to a computer running Linux, you can mount the media in WSL with this command - `sudo mount -t drvfs D: /mnt/d`.

`D:` being the drive letter assigned to the media in Windows and `/mnt/d` being the path you'd like to mount the media to in WLS. 

You can then navigate to that path with `cd /mnt/d`

!!! tip "The C drive and other internal Windows drives should already be automatically mounted in WSL."

---

## Run Linux GUI Apps on WSL

WSL supports running Linux GUI applications (X11 and Wayland) on Windows.

**Update WSL and installed packages:**

1. Update and restart WSL:</br>
    ```cmd
    wsl --update
    wsl --shutdown
    ```
2. Update the packages in your distro:</br>
    ```bash
    sudo apt update && sudo apt upgrade
    ```

**Install GUI Apps:**

| App Name                     | Command to Install
|----------------------------- |---------------------
| Gnome Text Editor            | sudo apt install gnome-text-editor -y
| GIMP                         | sudo apt install gimp -y
| Nautilus                     | sudo apt install nautilus -y
| VLC Media Player             | sudo apt install vlc -y
| X1 Apps                      | sudo apt install x11-apps -y

!!! note

    Support for GUI apps on WSL does not provide a full desktop experience. It relies on Windows desktop, so installing desktop-focused tools or apps may not be supported.

[*Reference*](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps#run-linux-gui-apps)

## Locate the WSL Virtual Disk <small>(.vhdx)</small> { data-toc-label="Locate the WSL Virtual Disk" }

Replace `<distribution-name>` with the name of your distribution.

```ps
(Get-ChildItem -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss | Where-Object { $_.GetValue("DistributionName") -eq '<distribution-name>' }).GetValue("BasePath") + "\ext4.vhdx"
```

## Shrink the WSL Virtual Disk

Installed Linux distros often do not consume the entire size of the virtual disk created by WSL. You can reclaim this space by shrinking the virtual disk with the `diskpart` tool.

1. Open an elevated command prompt and start diskpart:
```cmd
diskpart
```
2. Select the virtual disk ([to locate, see here](#locate-the-wsl-virtual-disk-vhdx)):
```cmd
select vdisk file="C:\Users\user\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc\LocalState\ext4.vhdx"
```
3. Compact the virtual disk:
```cmd
compact vdisk
```

!!! note

    I was able to shrink my 30GB virtual disk down to 12GB with this command!