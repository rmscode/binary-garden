# Tint2

A simple panel/taskbar specifically made for Openbox, but also works well with other X window managers.

## Installation

Most distributions maintain a version in their repositories. For example, on Debian/Ubuntu, you can install it with:

```bash
sudo apt install tint2
```

## Starting tint2

Execute `tint2` from a terminal window or if you're using Openbox, add `(sleep 2s && tint2) &` to `$HOME/.config/openbox/autostart` for it to start automatically when you log in.

## Configuration

The configuration file can be found in `$HOME/.config/tint2/tint2rc` and the command `killall -SIGUSR1 tint2` can be used to force reload the config after changes are made. You can execute `tint2conf` to open the graphical configuration tool instead. Openbox users can also find it under "Utilities" or "System" in their right-click application menu.

There are many options. The official docs are [here](https://gitlab.com/o9000/tint2/blob/master/doc/tint2.md).

??? example "Example Configuration"

    ```
    #---- Generated by tint2conf 3f77 ----
    # See https://gitlab.com/o9000/tint2/wikis/Configure for
    # full documentation of the configuration options.
    #-------------------------------------
    # Gradients
    #-------------------------------------
    # Backgrounds
    # Background 1: Panel
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
    panel_items = LTC:P
    panel_size = 100% 50
    panel_margin = 0 0
    panel_padding = 2 0 2
    panel_background_id = 1
    wm_menu = 1
    panel_dock = 0
    panel_pivot_struts = 0
    panel_position = top center horizontal
    panel_layer = top
    panel_monitor = all
    panel_shrink = 0
    autohide = 1
    autohide_show_timeout = 0
    autohide_hide_timeout = 1
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
    mouse_middle = none
    mouse_right = close
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
    launcher_background_id = 0
    launcher_icon_background_id = 0
    launcher_icon_size = 64
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
    separator_color = #777777 88
    separator_style = dots
    separator_size = 3
    separator_padding = 1 0

    #-------------------------------------
    # Button 1
    button = new
    button_icon = /usr/share/icons/Adwaita/32x32/actions/system-reboot-symbolic.symbolic.png
    button_text =
    button_tooltip = Restart (Middle Click)
    button_lclick_command =
    button_rclick_command =
    button_mclick_command = sudo reboot now
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