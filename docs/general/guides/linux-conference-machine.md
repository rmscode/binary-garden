# Lightweight Linux Based Conference Computer

Much like the [Linux Based RDP Client](../guides/remmina-thin-client.md)(archived), I was recently tasked with creating a Linux based video conferencing client capable of also making remote desktop connections.

## Objectives

1. Create a familiar desktop-like environment.
2. Provide a browser for basic access to the web, web-based applications and video conferencing.
3. Provide an easy way to initiate RDP sessions.
4. Prevent end users from being able to modify the state of the system.

## Basic Requirements

- Small form factor PC like an Intel NUC or equivalent
- Debian based Linux distro. We used [DietPi](../../software/operating-systems/linux/dietpi.md) because it is lightweight and easy to use.
- Webcam with microphone
- Window manager (Openbox)
- Web Browser (Chromium)
- App launcher/taskbar (tint2)
- Remote desktop client (Remmina with RDP plugin)

Additionally, we also be installing:

- Nitrogen, a background/wallpaper utility for X
- LXDE desktop environment for icon/UI support in certain apps
- PulseAudio

## Initial Setup

### Install Linux

You can use any Debian based Linux distro, but we used DietPi because it is lightweight and easy to use. I won't go over the steps to install Linux in this guide, but you can refer to this [page](../../software/operating-systems/linux/dietpi.md#installation-and-initial-setup) for help.

### Install Packages and Their Dependencies

1. Install DietPi optimized packages via `sudo dietpi-software` (if using the DietPi distro):
    - Chromium
        - X.org and ALSA will automatically be installed as dependencies
    - LXDE desktop environment to provide Remmina with the icon pack it needs. I would like to find a way around this soon.
    - PulseAudio to sit on top of ALSA for additional audio support
2. Install the remaining packages and some dependencies via `apt`:<br>
    ```bash
    sudo apt install openbox obconf xdg-utils remmina remmina-plugin-rdp tint2 nitrogen -y
    ```

### Base Configuration

!!! note

    In almost all cases, it's not considered good practice to use root. DietPi already has a default non-root user (`dietpi`). Otherwise, I suggest you create a new user and add it to the sudo group.

1. Append the following to the end of `~/.profile` (use `nano ~/.profile`):<br>

    ```bash
    [[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx
    ```

    !!! info 

        This command checks if the system is ready to start the graphical environment (X server). The condition (`[[ ]]`) as a whole checks to see if there is no graphical session running (`$DISPLAY` is empty) and if the user is on the first virtual terminal (`$XDG_VTNR is 1`). If the condition is true, the `startx` command is executed.

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

2. Configure `xinitrc` to use the Openbox window manager instead X's windows system (use `sudo nano /etc/X11/xinit/xinitrc`):
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
    nitrogen --restore & #(3)!
    (sleep 2s && tint2) & #(4)!
    ```

    1. Disables power management
    2. Disables screen saver
    3. Sets the wallpaper with nitrogen 
    4. Starts tint2 after a 2 second delay to allow the wallpaper to load first since it uses fake transparency

    ??? example "Example"

        ```bash
        # Commands that will run after Openbox has started

        # Disable power management
        xset -dpms

        # Disable screensaver
        xset s off

        # Set wallpaper
        nitrogen --restore &

        # Start tint2 launcher/taskbar
        (sleep 2s && tint2) &
        ```

4. Enable console auto-login:
    1. Enter `sudo dietpi-config` into the console
    2. Select **AutoStart Options** > **Automatic login**
    3. Choose the user to automatically login on boot. We used the default user `dietpi`.

!!! info

    If prompted to enable/disable `ctrl+alt+backspace` to close X, choose to disable. This will prevent users from accidentally closing the X server.

At this point, the system can be rebooted. The `dietpi` user will automatically log in to an Openbox session and we can now start customizing the system to meet the rest of our requirements.

## Configuring the Tint2 Launcher/Taskbar

Tint2 can be configured via the **Tint2 Settings** app that is pinned to the launcher by default (far left). Set things up how you'd like and hit apply to save your changes. 

Some suggestions:

- Remove the **System Tray** and **Battery** elements from **Panel items**
- Add a Button to the right of the clock with the following settings:
    - **Icon**: `/usr/share/icons/Adwaita/32x32/actions/system-reboot-symbolic.symbolic.png`
    - **Tooltip**: `Restart (Middle Click)`
    - **Middle click command**: `sudo reboot now`
- Untick **Show desktop name** from **Taskbar** > **Desktop name**
- Remove the **Tint2 Settings** app from the launcher to prevent users from altering the configuration. Future changes can be made by modifying the `tint2rc` file located in `~/.config/tint2/` via SSH.
    - **NOTE**: Be kind to yourself and save this step for the very end after you've pinned all your apps and what not.

??? example "`tint2rc` example"

    ```txt
    #---- Generated by tint2conf 443b ----
    # See https://gitlab.com/o9000/tint2/wikis/Configure for
    # full documentation of the configuration options.
    #-------------------------------------
    # Gradients
    #-------------------------------------
    # Backgrounds
    # Background 1: Launcher, Panel
    rounded = 0
    border_width = 0
    border_sides = TBLR
    border_content_tint_weight = 0
    background_content_tint_weight = 0
    background_color = #000000 60
    border_color = #000000 30
    background_color_hover = #000000 60
    border_color_hover = #000000 30
    background_color_pressed = #000000 60
    border_color_pressed = #000000 30

    # Background 2: Default task, Iconified task
    rounded = 4
    border_width = 1
    border_sides = TBLR
    border_content_tint_weight = 0
    background_content_tint_weight = 0
    background_color = #777777 20
    border_color = #777777 30
    background_color_hover = #aaaaaa 22
    border_color_hover = #eaeaea 44
    background_color_pressed = #555555 4
    border_color_pressed = #eaeaea 44

    # Background 3: Active task
    rounded = 4
    border_width = 1
    border_sides = TBLR
    border_content_tint_weight = 0
    background_content_tint_weight = 0
    background_color = #777777 20
    border_color = #ffffff 40
    background_color_hover = #aaaaaa 22
    border_color_hover = #eaeaea 44
    background_color_pressed = #555555 4
    border_color_pressed = #eaeaea 44

    # Background 4: Urgent task
    rounded = 4
    border_width = 1
    border_sides = TBLR
    border_content_tint_weight = 0
    background_content_tint_weight = 0
    background_color = #aa4400 100
    border_color = #aa7733 100
    background_color_hover = #cc7700 100
    border_color_hover = #aa7733 100
    background_color_pressed = #555555 4
    border_color_pressed = #aa7733 100

    # Background 5: Tooltip
    rounded = 1
    border_width = 1
    border_sides = TBLR
    border_content_tint_weight = 0
    background_content_tint_weight = 0
    background_color = #222222 100
    border_color = #333333 100
    background_color_hover = #ffffaa 100
    border_color_hover = #000000 100
    background_color_pressed = #ffffaa 100
    border_color_pressed = #000000 100

    #-------------------------------------
    # Panel
    panel_items = LTSC:P
    panel_size = 100% 50
    panel_margin = 0 0
    panel_padding = 2 0 2
    panel_background_id = 1
    wm_menu = 1
    panel_dock = 0
    panel_pivot_struts = 0
    panel_position = top center horizontal
    panel_layer = top
    panel_monitor = primary
    panel_shrink = 0
    autohide = 1
    autohide_show_timeout = 0
    autohide_hide_timeout = 0.5
    autohide_height = 2
    strut_policy = follow_size
    panel_window_name = tint2
    disable_transparency = 1
    mouse_effects = 1
    font_shadow = 0
    mouse_hover_icon_asb = 100 0 10
    mouse_pressed_icon_asb = 100 0 0
    scale_relative_to_dpi = 0
    scale_relative_to_screen_height = 0

    #-------------------------------------
    # Taskbar
    taskbar_mode = single_desktop
    taskbar_hide_if_empty = 0
    taskbar_padding = 0 0 2
    taskbar_background_id = 0
    taskbar_active_background_id = 0
    taskbar_name = 0
    taskbar_hide_inactive_tasks = 0
    taskbar_hide_different_monitor = 0
    taskbar_hide_different_desktop = 0
    taskbar_always_show_all_desktop_tasks = 0
    taskbar_name_padding = 4 2
    taskbar_name_background_id = 0
    taskbar_name_active_background_id = 0
    taskbar_name_font_color = #e3e3e3 100
    taskbar_name_active_font_color = #ffffff 100
    taskbar_distribute_size = 0
    taskbar_sort_order = none
    task_align = left

    #-------------------------------------
    # Task
    task_text = 1
    task_icon = 1
    task_centered = 1
    urgent_nb_of_blink = 100000
    task_maximum_size = 150 35
    task_padding = 2 2 4
    task_tooltip = 1
    task_thumbnail = 0
    task_thumbnail_size = 210
    task_font_color = #ffffff 100
    task_background_id = 2
    task_active_background_id = 3
    task_urgent_background_id = 4
    task_iconified_background_id = 2
    mouse_left = toggle_iconify
    mouse_middle = close
    mouse_right = none
    mouse_scroll_up = toggle
    mouse_scroll_down = iconify

    #-------------------------------------
    # System tray (notification area)
    systray_padding = 0 4 2
    systray_background_id = 0
    systray_sort = ascending
    systray_icon_size = 24
    systray_icon_asb = 100 0 0
    systray_monitor = 1
    systray_name_filter =

    #-------------------------------------
    # Launcher
    launcher_padding = 2 4 2
    launcher_background_id = 1
    launcher_icon_background_id = 0
    launcher_icon_size = 32
    launcher_icon_asb = 100 0 0
    launcher_icon_theme_override = 0
    startup_notifications = 1
    launcher_tooltip = 1
    launcher_item_app = /usr/share/applications/chromium.desktop
    launcher_item_app = ~/.local/share/applications/chrome-hoiomclbngpkcgaapnlgiiebnbpkbhio-Default.desktop
    launcher_item_app = ~/.local/share/applications/chrome-cifhbcnohmdccbgoicgdjpfamggdegmo-Default.desktop
    launcher_item_app = /usr/share/applications/org.remmina.Remmina.desktop

    #-------------------------------------
    # Clock
    time1_format = %H:%M
    time2_format = %A %d %B
    time1_timezone =
    time2_timezone =
    clock_font_color = #ffffff 100
    clock_padding = 2 0
    clock_background_id = 0
    clock_tooltip =
    clock_tooltip_timezone =
    clock_lclick_command =
    clock_rclick_command = orage
    clock_mclick_command =
    clock_uwheel_command =
    clock_dwheel_command =

    #-------------------------------------
    # Battery
    battery_tooltip = 1
    battery_low_status = 10
    battery_low_cmd = xmessage 'tint2: Battery low!'
    battery_full_cmd =
    battery_font_color = #ffffff 100
    bat1_format =
    bat2_format =
    battery_padding = 1 0
    battery_background_id = 0
    battery_hide = 101
    battery_lclick_command =
    battery_rclick_command =
    battery_mclick_command =
    battery_uwheel_command =
    battery_dwheel_command =
    ac_connected_cmd =
    ac_disconnected_cmd =

    #-------------------------------------
    # Separator 1
    separator = new
    separator_background_id = 0
    separator_color = #777777 86
    separator_style = dots
    separator_size = 3
    separator_padding = 1 0

    #-------------------------------------
    # Button 1
    button = new
    button_icon = /usr/share/icons/Adwaita/32x32/actions/system-reboot-symbolic.symbolic.png
    button_text =
    button_tooltip = Restart (Left Click) | Shutdown (Middle Click)
    button_lclick_command = sudo reboot now
    button_rclick_command =
    button_mclick_command = sudo shutdown now
    button_uwheel_command =
    button_dwheel_command =
    button_font_color = #000000 100
    button_padding = 0 0
    button_background_id = 0
    button_centered = 0
    button_max_icon_size = 0

    #-------------------------------------
    # Tooltip
    tooltip_show_timeout = 0.1
    tooltip_hide_timeout = 0.1
    tooltip_padding = 4 4
    tooltip_background_id = 5
    tooltip_font_color = #dddddd 100
    ```

## Configuring Chromium and Installing PWAs

### Prevent Chromium from Saving Data on the Device

To solve the problem of users forgetting to sign out of their accounts on a shared device, consider the following two options:

- Have Chromium delete on-device data every time it is closed.
    - Open Chromium and go to **Settings** > **Privacy and Security** > **Site Settings** > **Additional content settings** > **On-Device site data**. *OR;*
- Launch Chromium with the `--incognito` flag to prevent the browser from storing data at all.

### Installing Teams PWA (Progressive Web App)

1. Navigate to `https://teams.microsoft.com/`
2. Click the PWA icon at the far right of the address bar to install *OR* Go to **Settings** > **Cast, save, and share** > **Install Page as app**.
3. Add the Teams PWA to the tint2 launcher.

You can install and pin additional PWAs if you'd like.

!!! info

    If you prefer to provide an experience for your users where they do not need to log in to Teams, but rather quickly join a meeting by invite code, use the following URL: `https://www.microsoft.com/en-us/microsoft-teams/join-a-meeting`.

!!! note 

    If for whatever reason, tint2 does not automatically locate your PWAs, you might have some luck finding them in `~/.config/chromium/Default/'Web Applications'` and/or `~/.local/share/applications`.

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
