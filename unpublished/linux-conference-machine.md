# Linux Based Video Conference Client

Much like the [Linux Based RDP Client](../guides/remmina-thin-client.md), I was recently tasked with creating a Linux based video conferencing client. There are [purpose-built systems](https://www.logitech.com/en-us/products/video-conferencing/room-solutions/rally-ultra-hd-conferencecam.960-001217.html) for this, but they are costly and for our particular use case, overkill.

## Objectives

1. Provide an easy way to initiate and join video conferences.
2. Provide a simple user experience.
3. Remain flexible enough to perform other web based tasks and make remote desktop connections.
4. Secure the client as much as possible.

## Requirements

- Small form factor PC similar to an Intel NUC.</br>
    !!! Note "We first tested a RaspberryPi 4, but it was getting quite hot and the performance was not great."
- Debain based Linux distro. We used [DietPi](../../software/operating-systems/linux/dietpi.md)
- A quality webcam
- X Window System
- Openbox, a lightweight window manager for Linux
- Nitrogen, a background browser for X
- ALSA, a sound system for Linux
- FFmpeg, a multimedia framework for Linux
- Cairo Dock, a lightweight dock for Linux for launching apps
- Chromium for web browsing and the installation of Teams/Zoom PWAs
- Remmina, a free and open-source remote desktop client for Linux
- LXDE desktop environment for icon support

## Initial Setup

### Install Linux

You can use any Debian based Linux distro, but we used DietPi because it is lightweight and easy to use. I won't go over the steps to install Linux in this guide, but you can refer to this [page](../../software/operating-systems/linux/dietpi.md#installation-and-initial-setup) for help.

### Install Packages and Their Dependencies

1. Update and upgrade your distribution:</br>

    ```bash
    sudo apt update && upgrade -y
    ```

2. Install the following packages via `apt`:</br>

    ```bash
    sudo apt install openbox obconf xdg-utils xcompmgr nitrogen remmina remmina-plugin-rdp cairo-dock -y
    ```

3. Install the following packages via `dietpi-software`:
    - Chromium
    - ALSA
    - FFmpeg
    - X
    - LXDE desktop environment</br>

    !!! note "You're not required to install these packages via `dietpi-software`, but its probably ideal. DietPi uses post installation scripts to optimize certain packages."

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
    xset -dpms #(1)!
    xcompmgr & #(2)!
    cairo-dock & #(3)!
    nitrogen --restore & #(4)!
    ```

    1. Disables power management
    2. Enables basic compositing effects for cairo-dock
    3. Start cairo-dock
    4. Ensures background is set after reboot

    ??? example "Example"

        ```bash
        # Commands that will run after Openbox has started

        # Disable power management
        xset -dpms

        # Start compositing manager
        xcompmgr &

        # Start cairo-dock
        cairo-dock &

        # Set the background
        nitrogen --restore &
        ```

4. Enable console autologin:
    1. Enter `sudo dietpi-config` into the console
    2. Select **AutoStart Options** > **Automatic login**
    3. Choose the user to automatically login on boot. We used the default user `dietpi`.

At this point, the system should boot straight into Openbox with the Cairo dock at the bottom of the screen. We can now start customizing the system to meet our requirements.

## Configuring Chromium and Installing PWAs

To solve the problem of users forgetting to sign out of their accounts on a shared device, set Chromium to delete all site data when it closes.

1. Open Chromium



## Notes taken during setup

### Installed packages

- `ALSA` for audio
- `ffmpeg` for audio/video codecs
- `openbox`, `obconf`, `xdg-utils for window manager
- `cairo-dock` for dock`
- `nitrogen` for background
- `remmina`, `remmina-plugin-rdp` for remote desktop
- Via `idetpi-software`
    - `chromium`
    - `x`
    - `lxde` for icon support

### Start openbox session instead of xsession

- Append the following to the end of `~/.profile` (use `nano ~/.profile`):
	- `[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx`
	
- Configure xinitrc to use Openbox (use `sudo nano /etc/X11/xinit/xinitrc`):
	- comment `. /etc/X11/xsession`
	- add `exec openbox-session`

### Configure the openbox autostart

- Configure the Openbox autostart file (use `sudo nano /etc/xdg/openbox/autostart`):
	- Add...
	```
	xset s off 
	xset s noblank 
	xset -dpms
	xcompmgr &
    cairo-dock 
    nitrogen --restore &
	```

!!! question "Maybe blanking should be on?"

### The PWAs

- https://join.zoon.us 
- https://teams.microsoft.com/v2
    - https://www.microsoft.com/en-us/microsoft-teams/join-a-meeting

**To install**:

Click the PWA icon in address bar or **Settings** > **Cast, save, and share** > **Install Page as app**

**PWA location**:

Use nautilus to drag from location to dock. Right click **Desktop** > **Files** > Click **hamburger** > **show hidden files**. Navigate to `~/.config/chromium/Default/'Web Applications'`. Find the .desktop files and drag to dock.

I had also temporarily added a custom Files launcher to the dock - `nautilus -n`.

It would probably be ideal to figure out how launcher info is stored int he cairo config.


### Enable autologin via dietpi-config
		
!!! note

    I had never seen this prompt before. dietpi-config > language/regional settings. After running through the keyboard layout settings, I was asked if I wanted ctrl+alt+backspace to close X.

### Cairo Dock

Cairo doc is buggy! Cant remove applet even after reinstalling. Maintains settings!

!!! note

    Got it... Cairo > Configure > Themes > Pick new theme and keep themes options. This will remove my previous settings. For whatever reason, after this dock fiasco, chromium would not start. I had to reinstall via dietpi, delete and recreate the teams/zoom PWAs.

**Add remmina to dock**

- Right click dock > cairo-dock > add > custom launcher
- Set name to Remmina
- Set icon (had to download one)
- Set command to launch on click `remmina --enable-fullscreen`
- Edit remmina in dock > extra params > class of the program > click grab button and click the remmina windows</br>

    !!! note "Had to do this in order for custom launcher to associate its shortcut with the Remmina window. Otherwise it would spawn a second icon when launched"

### OpenBox

**Editing the openbox "root menu"**

`~/.config/openbox/menu.xml`

    - remove all but restart
    NOTE: Was not aware of this menu when setting up the "ThinPi". I quickly removed all items from that menu except for obconf, reconfigure, restart.

    To remove items from "Applications >", edit obamenu
    	- sudo nano /usr/bin/obamenu
    	- From application_groups, remove:
    		- "System"
    		- "Development"
    		- "Settings"

    https://www.techtimejourney.net/autostarting-programs-with-openbox-desktop/
		
### Prevent accounts from remaining logged in

**Chromium Settings** > **Privacy and Security** > **Site Settings** > **Additional content settings** > **On-Device site data** > Select **Delete data sites have stored on your device when you close all windows**

### ISSUES:

**Remmina's toolbar icons missing**

Im thinking this is because there is no desktop environment so therefor no iconpack. Remmina must not have a dependency listed for one in its package. This wasnt an issue on the ThinPi project because I had actually installed lxde first and technically it is still installed. I will try installing lxde and hopefully doing so after the fact will not cause any issues. 

    Installing LXDE did fix this...! 

**Nitrogen wallpaper resetting after reboot**

    Adding `nitrogen --restore &`
    https://bbs.archlinux.org/viewtopic.php?id=284999

**Figure out remmina audio**

	Connection profile > advanced > Audio output to local

**Secure cairo-dock**

    1. Made a backup copy first - `cp -r cairo-dock cairo-dock-backup`
    2. Changed owner to root - `sudo chown root:root /home/dietpi/.config/cairo-dock -R`
    3. Set permissions to make read & execute - `sudo chmod 755 /home/dietpi/.config/cairo-dock -R`

    The results aren't perfect, but they're good enough. They can still access the dock's settings by right-clicking, but any changes they make won't persist after a reboot. If someone happens to mess up the dock, a reboot will restore it to its original state. Given the nature of linux and this particular setup, the power button can be used to restart the machine without consequences. I'm happy with that.

**Remove boot messages**

    sudo nano /etc/default/grub
    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
    sudo update-grub
	
    Can be improved