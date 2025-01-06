# Linux Based Video Conference Client

Much like the [Linux Based RDP Client](../guides/remmina-thin-client.md), I was recently tasked with creating a Linux based video conferencing client. There are [purpose-built systems](https://www.logitech.com/en-us/products/video-conferencing/room-solutions/rally-ultra-hd-conferencecam.960-001217.html) for this, but they are costly and for our particular use case, overkill.

## Objectives

1. Provide an easy way to initiate and join video conferences.
2. Provide a simple user experience.
3. Remain flexible enough to perform other web based tasks and make remote desktop connections.
4. Secure the client as much as possible.

## Requirements

- Small form factor PC similar to an Intel NUC.<br>
- Debian based Linux distro. We used [DietPi](../../software/operating-systems/linux/dietpi.md) because it is lightweight and easy to use.
- A quality webcam
- X.Org display server
- Openbox, a lightweight window manager for Linux
- Nitrogen, a background browser for X
- ALSA, a sound system for Linux
- FFmpeg, a multimedia framework for Linux
- Cairo Dock, a lightweight dock for Linux for launching apps
- Chromium for web browsing and the installation of Teams PWA
- Remmina, a free and open-source remote desktop client for Linux
- LXDE desktop environment for icon/UI support in certain apps

## Initial Setup

### Install Linux

You can use any Debian based Linux distro, but we used DietPi because it is lightweight and easy to use. I won't go over the steps to install Linux in this guide, but you can refer to this [page](../../software/operating-systems/linux/dietpi.md#installation-and-initial-setup) for help.

### Install Packages and Their Dependencies

1. Install DietPi optimized packages via `sudo dietpi-software` (if using the DietPi distro):
    - X.org X Server aka X11
    - LXDE desktop environment (**NOTE**: Remmina relies on a desktop environment for some of its UI components)
    - ALSA
    - PulseAudio
    - FFmpeg
    - Chromium (or FireFox if you prefer)
2. Install the following packages via `apt`:<br>
    ```bash
    sudo apt install openbox obconf xdg-utils xcompmgr nitrogen remmina remmina-plugin-rdp cairo-dock -y
    ```

### Base Configuration

!!! note

    In almost all cases, it's not considered good practice to use root. DietPi already has a default non-root user (`dietpi`). Otherwise, I suggest you create a new user and add it to the sudo group.

1. Append the following to the end of `~/.profile` (use `nano ~/.profile`):<br>

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

2. Configure xinitrc to use the Openbox window manager instead of X's (use `sudo nano /etc/X11/xinit/xinitrc`):
    1. Comment out the line `. /etc/X11/xsession` by adding a `#` in front of it
    2. Append `exec openbox-session` to the end of the file<br>

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

3. Configure the Openbox autostart file (use `sudo nano /etc/xdg/openbox/autostart`):<br>

    Add the following:

    ```bash
    xset -dpms #(1)!
    xset s off #(2)!
    xcompmgr & #(3)!
    cairo-dock & #(4)!
    nitrogen --restore & #(5)!
    ```

    1. Disables power management
    2. Disables screen saver
    3. Enables basic compositing effects for cairo-dock
    4. Starts cairo-dock
    5. Ensures background image is restored after reboot

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

4. Enable console auto-login:
    1. Enter `sudo dietpi-config` into the console
    2. Select **AutoStart Options** > **Automatic login**
    3. Choose the user to automatically login on boot. We used the default user `dietpi`.

!!! info

    If prompted to enable/disable `ctrl+alt+backspace` to close X, choose to disable. This will prevent users from accidentally closing the X server.

At this point, the system should boot straight into Openbox with the Cairo dock at the bottom of the screen. We can now start customizing the system to meet our requirements.

## Configuring Chromium and Installing PWAs

Launch Chromium from the Cairo Dock by selecting the xTerm icon and typing `chromium-browser`.

To solve the problem of users forgetting to sign out of their accounts on a shared device, consider the following two options:

- Have Chromium delete on-device data every time it is closed.
    - Open Chromium and go to **Settings** > **Privacy and Security** > **Site Settings** > **Additional content settings** > **On-Device site data**. *OR;*
- Launch Chromium with the `--incognito` flag to prevent the browser from storing data at all.

### Installing Teams PWA (Progressive Web Apps)

1. Navigate to `https://teams.microsoft.com/v2`
2. Click the PWA icon at the far right of the address bar. *OR;*
3. Go to **Settings** > **Cast, save, and share** > **Install Page as app**.

!!! info

    If you prefer to provide an experience for your users where they do not need to log in to Teams, but rather quickly join a meeting by invite code, use the following URL: `https://www.microsoft.com/en-us/microsoft-teams/join-a-meeting`.

### Find the PWA's and Pin to Cairo Dock

!!! note 

    YMMV on this one, but I have found that PWAs are typically stored in `~/.config/chromium/Default/'Web Applications'`. If they're not there, you may find them in `~/.local/share/applications`. If you're still having trouble finding them, enter `chrome://apps/` into the URL bar, right-click the app, and select **Create shortcuts**. This will place a `.desktop` file in the `~/Desktop` directory.

The easiest method that I have found to add these to the Cairo Dock is to use Nautilus to navigate to the directory, find the PWA files, and drag them to the dock.

Nautilus can be launched with the command `nautilus -n` or by right clicking the desktop and selecting **Files**. Make sure to open settings (the hamburger icon - 3 vertical lines) and select **Show hidden files**.

## Add Remmina to Cairo Dock

1. Navigate to `~/.config/cairo-dock/current_theme/launchers`
2. Create a new file named `01remmina.desktop` (or any number that is not already in use) with the command `nano 01remmina.desktop`.
3. Copy and paste the config from below into the file and save it. <br>

    ??? Example "Remmina Launcher Config"

        Take note of the line that says `Icon=/home/dietpi/Downloads/remmina-512x512.png`. You'll have to make sure you have an appropriate icon downloaded to that location. You can fetch the icon that I used with `wget https://static-00.iconduck.com/assets.00/remmina-icon-512x512-y73zws4d.png".

        ```txt title="Remmina Launcher config for cairo"
        #3.4.1

        #[gtk-about]

        [Desktop Entry]

        #F[Icon]
        frame_maininfo=

        #d+ Name of the container it belongs to:
        Container=_MainDock_

        #v
        sep_display=

        #s[Default] Launcher's name:
        Name=Remote Desktop

        #S+[Default] Image's name or path:
        Icon=/home/dietpi/Downloads/remmina-512x512.png

        #s[Default] Command to launch on click:
        #{Example: nautilus --no-desktop, gedit, etc. You can even enter a shortkey, e.g. <Alt>F1, <Ctrl>c,  <Ctrl>v, etc}
        Exec=remmina --enable-fullscreen


        #X[Extra parameters]
        frame_extra=

        #b Don't link the launcher with its window
        #{If you chose to mix launcher and applications, this option will deactivate this behaviour for this launcher only. It can be useful for i>
        prevent inhibate=false

        #K[Default] Class of the program:
        #{The only reason you may want to modify this parameter is if you made this launcher by hands. If you dropped it into the dock from the me>
        StartupWMClass=org

        #b Run in a terminal?
        Terminal=false

        #i-[0;16] Only show in this specific viewport:
        #{If '0' the launcher will be displayed on every viewport.}
        ShowOnViewport=0

        #f[0;100] Order you want for this launcher among the others:
        Order=1.5

        Icon Type=0
        Type=Application
        Origin=
        ```

## Securing the System

Unless you chose a different distro or changed it during installation, you've probably been using DietPi's default password. That needs to change. We also need to make sure users can't access the underlying OS, namely the terminal. Right now, this can easily be done by pressing Ctrl+Alt+Backspace or right-clicking the desktop and selecting "Exit". Both of those will terminate the X server and drop you to the console. Lastly, we can and should password protect Remmina to prevent unauthorized configuration changes.

1. Change the password for the default user and root:
    1. Enter sudo dietpi-config into the console
    2. Select Security Options > Passwords: Change software and user password
    3. Skip the first prompt about software passwords by selecting Cancel
    4. Select Ok on the second prompt to change the "root" and "dietpi" user passwords<br>
    
    !!! note "If you're using some other flavor of Debian, you can change your user's password by entering the `passwd` command and following the prompts. If applicable, Be sure to change the password for root as well."

2. If you were never [prompted](#base-configuration) to disable <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Backspace</kbd>, create a .conf file to do so:
    1. `sudo nano /etc/X11/xorg.conf.d/00-keyboard.conf` and add the following:<br>

    ```
    Section "InputClass"
        Identifier "keyboard"
        MatchIsKeyboard "on"
        Option "XkbOptions" "" # Removes the keyboard shortcut
    EndSection
    ```
    
    !!! info
    
        If you want to, you can also disable virtual terminal switching (<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F1</kbd>...<kbd>F6</kbd>) by adding the following:
        
        ```
        Section "ServerFlags"
            Option "DontVTSwitch" "true"
        EndSection
        ```
        
        The risk of leaving this enabled is pretty low since credentials are required. I would also argue that there is some administrative utility in leaving it enabled, but that's just my opinion.
        
3. Edit the Openbox "root menu" to remove everything except "Restart":
    1. sudo nano /etc/xdg/openbox/menu.xml and replace with the following:<br>
    
    ```
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

### Prevent Cairo Dock from Being Modified

1. Make a backup copy of the configuration:
```
cp -r /home/dietpi/.config/cairo-dock /home/dietpi/.config/cairo-dock-backup
```
2. Change the owner of the directory to root:
```
sudo chown root:root /home/dietpi/.config/cairo-dock -R\
```
3. Set permissions to make read & execute:
```
sudo chmod 755 /home/dietpi/.config/cairo-dock -R
```

The results aren't perfect, but they're good enough. They can still access the dock's settings by right-clicking, but any changes they male won't persist after a reboot. If someone happens to mess up the dock, a reboot will restore it to its original state. Given the nature of Linux and this particular setup, the power button can be used to restart the machine without consequences. I'm happy with that.
