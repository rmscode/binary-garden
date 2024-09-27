# Linux Based RDP Thin Client

I was recently tasked with creating a Linux based RDP thin client. Linux is free and we have a bunch of old unused Intel NUCs laying around.

## Objectives

1. Provide an easy way to initiate RDP sessions.
2. Provide a kiosk like experience. 
3. Secure the RDP client as much as possible.

## Requirements

- Intel NUC or similar hardware. You could even use a Raspberry Pi.
- Debian based Linux Distro. We used [DietPi](../../software/operating-systems/linux/dietpi.md).
- X Window System
- Openbox, a lightweight window manager for Linux.
- Remmina, a free and open-source remote desktop client for Linux.

## Initial Setup

### Install Linux

You can use any Debian based Linux distro, but we used DietPi because it is lightweight and easy to use. I won't go over the steps to install Linux in this guide, but you can refer to this [page](../../software/operating-systems/linux/dietpi.md#installation-and-initial-setup) for help.

### Install Packages and Their Dependencies

!!! note

    Make sure you have an internet connection before proceeding. Also, you can do this remotely via SSH or directly on the device's console.

1. Update and upgrade your distribution:</br>

    ```bash
    sudo apt update && upgrade -y
    ```

2. Install X and Openbox:</br>

    ```bash
    sudo apt install xserver-xorg x11-xserver-utils xinit openbox xdg-utils -y
    ```

3. Install Remmina and RDP plugin:</br>

    ```bash
    sudo install remmina remmina-plugin-rdp -y
    ```

### Base Configuration

!!! note

    In almost all cases, it's not considered good practice to use root. DietPi already has a default non-root user (`dietpi`). Otherwise, I suggest you create a new user and add it to the sudo group.

1. Append the following to the end of `~/.profile` (use `nano ~/.profile`):</br>

    ```bash
    [[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx
    ```

    !!! info 

        This command checks if the system is ready to start the graphical environment (X server). The condition (`[[ ]]`) as a whole checks whether there is no graphical session running (`$DISPLAY` is empty) and the user is on the first virtual terminal (`$XDG_VTNR is 1`). If the condition is true, the `startx` command is executed.

    ??? example "Example"
    
        ```bash
        # ~/.profile: executed by Bourne-compatible login shells.

        if [ "$BASH" ]; then
        if [ -f ~/.bashrc ]; then
            . ~/.bashrc
        fi
        fi

        mesg n 2> /dev/null || true
        
        [[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx
        ```

2. Configure xinitrc to use Openbox (use `sudo nano /etc/X11/xinit/xinitrc`):
    1. Comment out the line `. /etc/X11/xsession` by adding a `#` in front of it
    2. Append `exec openbox-session` to the end of the file</br>

    ??? example "Example"

        ```bash
        #!/bin/sh

        # /etc/X11/xinit/xinitrc
        #
        # global xinitrc file, used by all X sessions started by xinit (startx)

        # invoke global X session script
        #. /etc/X11/Xsession
        exec openbox—session
        ```

3. Configure the Openbox autostart file (use `sudo nano /etc/xdg/openbox/autostart`):</br>

    Add the following:

    ```bash
    xset s off # (1)!
    xset s noblank # (2)!
    xset -dpms #(3)!
    remmina --enable-fullscreen & # (4)!
    ```

    1. Disables screensaver
    2. Disables screen blanking
    3. Disables power management
    4. Starts Remmina in fullscreen mode

    ??? example "Example"

        ```bash
        # Commands that will run after Openbox has started

        # Disable screensaver
        xset s off

        # Disable screen blanking
        xset s noblank

        # Disable power management
        xset -dpms

        # Start Remmina in fullscreen mode
        remmina --enable-fullscreen &
        ```

4. Enable console autologin:
    1. Enter `sudo dietpi-config` into the console
    2. Select **AutoStart Options** > **Automatic login**
    3. Choose the user to automatically login on boot. We used the default user `dietpi`.

At this point, you can reboot the system and it should load right into an Openbox session with the only window being the Remmina Remote Desktop Client. We're not done yet, though. In the following sections we will secure the system as much as possible, and adjust things in a way to provide a kiosk like experience.

## Securing the System

Unless you chose a different distro or changed it during installation, you've probably been using DietPi's default password. That needs to change. We also need to make sure users can't access the underlying OS, namely the console. Right now, this can easily be done by pressing <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Backspace</kbd> or right-clicking the desktop and selecting "Exit". Both of those will terminate the X server and drop you to the console. Lastly, we can and should password protect Remmina to prevent unauthorized configuration changes.

1. Change the password for the default user and root:
    1. Enter `sudo dietpi-config` into the console
    2. Select **Security Options** > **Passwords: Change software and user password**
    3. Skip the first prompt about software passwords by selecting **Cancel**
    4. Select **Ok** on the second prompt to change the "root" and "dietpi" user passwords</br>

    !!! note "If you're using some other flavor of Debian, you can change your user's password by entering the `passwd` command and following the prompts. Be sure to change the password for root as well."

2. Create a .conf file to disable the <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Backspace</kbd> shortcut:
    1. `sudo nano /etc/X11/xorg.conf.d/00-keyboard.conf` and add the following:</br>

    ```bash
    Section "InputClass"
        Identifier "keyboard"
        MatchIsKeyboard "on"
        Option "XkbOptions" "" # Removes the keyboard shortcut
    EndSection
    ```

    !!! info

        If you want to, you can also disable virtual terminal switching (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd>...<kbd>F6</kbd>) by adding the following:</br>
        
        ```bash
        Section "ServerFlags"
            Option "DontVTSwitch" "true"
        EndSection
        ```

        The risk of leaving this enabled is pretty low since credentials are required. I would also argue that there is some administrative utility in leaving it enabled, but that's just my opinion.

3. Edit the Openbox "root menu" to remove everything except "Restart":
    1.  `sudo nano /etc/xdg/openbox/menu.xml` and replace with the following:</br>

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>

    <openbox_menu xmlns="http://openbox.org/"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://openbox.org/
                    file:///usr/share/openbox/menu.xsd">

    <menu id="root-menu" label="Openbox 3">
    <item label="Restart">
        <action name="Restart" />
    </item>
    </menu>

    </openbox_menu>
    ```

4. You can learn how to password protect Remmina [here](../../software/remmina.md#securing-the-remmina-client). 

## Kiosk Experience

Users are now effectively jailed in the Openbox session, but Remmina can still be closed leaving them staring at a blank screen. To solve that problem, we can run a loop that checks if Remmina is running and restarts it if it's not.

Append the following to the Openbox autostart file (use `sudo nano /etc/xdg/openbox/autostart`):

```bash
while 'true'
do
  if pidof remmina
  then
    sleep 1
  else
    remmina --enable-fullscreen &
  fi
done
```

??? example "Example"

    ```bash
    # Commands that will run after Openbox has started

    # Disable screensaver
    xset s off

    # Disable screen blanking
    xset s noblank

    # Disable power management
    xset -dpms

    # Start Remmina in fullscreen mode
    remmina --enable-fullscreen &

    # Check if Remmina is running and restart it if it's not
    while 'true'
    do
      if pidof remmina
      then
        sleep 1
      else
        remmina --enable-fullscreen &
      fi
    done
    ```
