# Raspberry Pi

!!! note "For information about displaying content from a Raspberry Pi, see [PiSignage](../software/pisignage.md). As of 12/22/23, we are using [DietPi](../hardware/raspberrypi.md#diet-pi) and Chromium in kiosk mode. This allows us to update the OS and Chromium. Something we had to wait on the PiSignage developers for. This was a problem because we moved from a .NET MAUI app to Blazor WASM (for easier development) and it wouldn't work with the PiSignage build we had."

!!! tip "For a list of common Linux commands, see the [Linux Cheat Sheet](../general/linux-cheat-sheet.md)."

---

## VNC

The default Pi app for VNC was RealVnc. At some point that product was made free for personal use only. As of 12/11/23, RealVnc has not be removed from the Pi but it can be with the following code:

```bash
sudo apt remove realvnc-vnc-server
sudo apt remove realvnc-vnc-viewer
```

To set up a new VNC client, use the following code. Other VNC solutions give a desktop per user. They don't let you sign into the running session.

Install the extension:

```bash
sudo apt install tigervnc-xorg-extension
```

!!! note

    Tiger VNC can be easily installed in DietPi by running the `dietpi-software` commmand. It's automatically configured to be installed in the [DietPi](#diet-pi) section below.

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

## Hardware Watchdog

The Raspberry Pi features a hardware watchdog that can automatically restart the system when the kernel panics (crashes).

Install watchdog system service:

```bash
sudo apt-get update
sudo apt-get install watchdog
```

### Enable the hardware watchdog timer

```bash
sudo su #(1)!
echo 'dtparam=watchdog=on' >> /boot/config.txt #(2)!
reboot
```

1. The `su` (short for substitute or switch user) utility allows you to run commands with another user’s privileges, by default the root user.
2. FYI: `echo '<string>' >> <path_to_file>` appends the given string to the given file on a new line.

### Configure the timeouts and watchdog refresh intervals

```bash
sudo su
echo 'watchdog-device = /dev/watchdog' >> /etc/watchdog.conf #(1)!
echo 'watchdog-timeout = 15' >> /etc/watchdog.conf #(2)!
echo 'max-load-1 = 6' >> /etc/watchdog.conf #(3)!
echo 'RuntimeWatchdogSec=10' >> /etc/systemd/system.conf #(4)!
echo 'ShutdownWatchdogSec=10min' >> /etc/systemd/system.conf #(5)!
```

1. Specifies the device file for the hardware watchdog.
2. Specifies the period of inactivity after which the watchdog timer will expire and the system will be rebooted. This is essentially the max amount of time that can pass without the watchdog daemon "kicking" or resetting the watchdog timer before the system is considered unresponsive.
3. Specifies the max average system load over the last 1 minute, above which the watchdog reboots the system. 
4. Refreshes the watchdog every 10 seconds and if the refresh fails, power cycle the system.
5. On shutdown, if the system takes longer than 10 minutes to reboot, power cycle the system.

!!! note "Important note on `max-load-1`"

    The system load is a measure of the amount of computational work that a system performs. The value is a floating point number. For example, if set to `4` on a 4-core system, the watchdog will trigger a reboot if the 1-min load average exceeds 4, which essentially means all cores are fully utilized for the last minute. However, you typically want to set `max-load-1` to the maximum possible value, because the system might occasionally reach full utilization under normal operation. Instead, you might want to set the `max-load-1` to a value that indicates the system is overloaded. 
    
    For example, on a 4-core Raspberry Pi, you might set `max-load-1` to 5.0 or 6.0. These values indicate that the system is overloaded, because the system load is higher than the number of cores.

### Enable and check the service

```bash
sudo systemctl enable watchdog
sudo systemctl start watchdog
sudo systemctl status watchdog
```

!!! tip "If you want to test the watchdog, you can "fork bomb" the system to make the kernel panic."

    ```bash
    sudo bash -c ':(){ :|:& };:'
    ```

## Diet Pi

!!! info

    DietPi is a highly optimised & minimal Debian-based Linux distribution. DietPi is extremely lightweight at its core, and also extremely easy to install and use. We primarily use it to display content on TVs via chromium's kiosk mode.

!!! note "There are [additional steps](../hardware/raspberrypi.md#raspberry-pi-5-and-4k) to get 4K working on the RPi 5."

### Installation and Intial Setup

1. Download [DietPi](https://dietpi.com/#download) and extract the `img` file from the `xz` archive with [7zip](https://www.7-zip.org/).
2. Flash the image to an SD card. I used the [Raspberry Pi Imager](https://www.raspberrypi.org/software/), but something else like [Balena Etcher](https://www.balena.io/etcher/) will work as well.
3. Place the SD card in the Pi and power it on.
4. Follow the prompts on the screen to be guided through the initial setup.
      - Alternatively, you can follow the [section below](#automatic-base-installation) for an automated first-boot experience.

DietPi is minimal by design, allowing you to choose what software you want ot install and use. Just run `dietpi-software` and install whichever DietPi optimized software you'd like. To make further changes to your configuration, you can run `dietpi-launcher`.

### Automatic Base Installation

The automatized setup is based on the configuration file `/boot/dietpi.txt`. It can be edited prior to the first system start and will be evaluated during the first boot procedure. On subsequent boot procedures, the options in the file are no longer evaluated. The main benefit to this method is the ability to create a "desired state" using `dietpi.txt` as a declarative model.

!!! info "Editing the contents of `/boot/dietpi.txt`"

    For the Raspberry Pi, the file is located on a FAT32 partition which can be accessed on a Windows PC. In this case, `dietpi.txt` can be found in its root.

1. After flashing, leave the SD card in your computer, navigate to the FAT32 boot partition in Windows Explorer and open the `dietpi.txt` file in a text editor of your choice.
2. Make the following changes to `dietpi.txt` or copy/paste from below and adjust as needed.
      1. Replace the following:
          - `AUTO_SETUP_LOCALE=C.UTF-8` &rarr; `AUTO_SETUP_LOCALE=en_US.UTF-8`
          - `AUTO_SETUP_KEYBOARD_LAYOUT=gb` &rarr; `AUTO_SETUP_KEYBOARD_LAYOUT=us`
          - `AUTO_SETUP_TIMEZONE=Europe/London` &rarr; `AUTO_SETUP_TIMEZONE=America/New_York`
          - `AUTO_SETUP_BROWSER_INDEX=-1` &rarr; `AUTO_SETUP_BROWSER_INDEX=-2`
          - `AUTO_SETUP_AUTOSTART_TARGET_INDEX=0` &rarr; `AUTO_SETUP_AUTOSTART_TARGET_INDEX=11`
          - `AUTO_SETUP_AUTOSTART_LOGIN_USER=root` &rarr; `AUTO_SETUP_AUTOSTART_LOGIN_USER=dietpi`
          - `AUTO_SETUP_AUTOMATED=0` &rarr; `AUTO_SETUP_AUTOMATED=1`
          - `AUTO_SETUP_GLOBAL_PASSWORD=dietpi` &rarr; `AUTO_SETUP_GLOBAL_PASSWORD=CHANGE_ME`
          - `SURVEY_OPTED_IN=-1` &rarr; `SURVEY_OPTED_IN=-0`
          - `CONFIG_SERIAL_CONSOLE_ENABLE=1` &rarr; `CONFIG_SERIAL_CONSOLE_ENABLE=0`
          - `SOFTWARE_VNCSERVER_WIDTH=1280` &rarr; `SOFTWARE_VNCSERVER_WIDTH=1920`
          - `SOFTWARE_VNCSERVER_HEIGHT=720` &rarr; `SOFTWARE_VNCSERVER_HEIGHT=1080`
          - `SOFTWARE_CHROMIUM_RES_X=1280` &rarr; `SOFTWARE_CHROMIUM_RES_X=3840`
          - `SOFTWARE_CHROMIUM_RES_Y=720` &rarr; `SOFTWARE_CHROMIUM_RES_Y=2160`
          - `SOFTWARE_CHROMIUM_AUTOSTART_URL=https://dietpi.com/` &rarr; `SOFTWARE_CHROMIUM_AUTOSTART_URL=https://portal.northeastprecast.com/device?key=ChangeMe`
      2. Add the following (Under `# Software to automatically install`):
          - `AUTO_SETUP_INSTALL_SOFTWARE_ID=23`
          - `AUTO_SETUP_INSTALL_SOFTWARE_ID=113`
          - `AUTO_SETUP_INSTALL_SOFTWARE_ID=28`

!!! tip "[Here](https://github.com/MichaIng/DietPi/wiki/DietPi-Software-list) is a list of dietpi-software IDs."

??? abstract "dietpi.txt - Autostart Chromium in kiosk mode"

    ```txt
    # IMPORTANT:
    # - This is intended for advanced users, unless you know what you are doing, do not edit this file. Please use the DietPi programs instead.
    # - Do not remove uncommented lines, as the items are scraped by DietPi programs, on demand.

    #------------------------------------------------------------------------------------------------------
    ##### DietPi-Automation settings, applied on first boot of DietPi only, ONCE! #####
    #------------------------------------------------------------------------------------------------------

    ##### Language/Regional options #####
    # Locale e.g.: "en_GB.UTF-8" / "de_DE.UTF-8" | One entry and UTF-8 ONLY!
    AUTO_SETUP_LOCALE=en_US.UTF-8

    # Keyboard layout e.g.: "gb" / "us" / "de" / "fr"
    AUTO_SETUP_KEYBOARD_LAYOUT=us

    # Time zone e.g.: "Europe/London" / "America/New_York" | Full list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    AUTO_SETUP_TIMEZONE=America/New_York

    ##### Network options #####
    # Enable Ethernet or WiFi adapter: 1=enable | 0=disable
    # - If both Ethernet and WiFi are enabled, WiFi will take priority and Ethernet will be disabled.
    # - If using WiFi, please edit dietpi-wifi.txt to pre-enter credentials.
    AUTO_SETUP_NET_ETHERNET_ENABLED=1
    AUTO_SETUP_NET_WIFI_ENABLED=0

    # WiFi country code: 2 capital letter value (e.g. GB US DE JP): https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    # - NB: This choice may be overridden if the WiFi access point sends a country code.
    AUTO_SETUP_NET_WIFI_COUNTRY_CODE=US

    # Enter your static network details below, if applicable.
    AUTO_SETUP_NET_USESTATIC=0
    AUTO_SETUP_NET_STATIC_IP=192.168.0.100
    AUTO_SETUP_NET_STATIC_MASK=255.255.255.0
    AUTO_SETUP_NET_STATIC_GATEWAY=192.168.0.1
    AUTO_SETUP_NET_STATIC_DNS=9.9.9.9 149.112.112.112

    # Set to "1" to convert DHCP leased network settings into static settings automatically on first boot.
    AUTO_SETUP_DHCP_TO_STATIC=0

    # Hostname
    AUTO_SETUP_NET_HOSTNAME=ChangeMe

    # Force Ethernet speeds: 0=automatic speed | 10 = 10 Mbit/s | 100 = 100 Mbit/s etc.
    # - Use this when your Ethernet adapter has an unstable 1 Gbit/s link.
    AUTO_SETUP_NET_ETH_FORCE_SPEED=0

    # Delay service starts at boot until network is established: 0=disabled | 1=enabled
    AUTO_SETUP_BOOT_WAIT_FOR_NETWORK=1

    ##### Misc options #####
    # Swap space size to generate: 0 => disable | 1 => auto | 2 and up => size in MiB
    AUTO_SETUP_SWAPFILE_SIZE=1
    # Swap space location: "zram" => swap space on /dev/zram0 (auto-size = 50% of RAM size) | /path/to/file => swap file at location (auto-size = 2 GiB minus RAM size)
    AUTO_SETUP_SWAPFILE_LOCATION=/var/swap

    # Set to "1" to disable HDMI/video output and framebuffers on Raspberry Pi, to reduce power consumption and memory usage: Works on RPi only!
    AUTO_SETUP_HEADLESS=0

    # Unmask (enable) systemd-logind service (including dbus), which is masked by default on DietPi
    AUTO_UNMASK_LOGIND=0

    # Custom Script (pre-networking and pre-DietPi install)
    # - Allows you to automatically execute a custom script before network is up on first boot.
    # - Copy your script to /boot/Automation_Custom_PreScript.sh and it will be executed automatically.
    # - Executed script log: /var/tmp/dietpi/logs/dietpi-automation_custom_prescript.log

    # Custom Script (post-networking and post-DietPi install)
    # - Allows you to automatically execute a custom script at the end of DietPi install.
    # - Option 0 = Copy your script to /boot/Automation_Custom_Script.sh and it will be executed automatically.
    # - Option 1 = Host your script online, then use e.g. AUTO_SETUP_CUSTOM_SCRIPT_EXEC=https://myweb.com/myscript.sh and it will be downloaded and executed automatically.
    # - Executed script log: /var/tmp/dietpi/logs/dietpi-automation_custom_script.log
    AUTO_SETUP_CUSTOM_SCRIPT_EXEC=0

    # Restore a DietPi-Backup on first boot: 0 => disable | 1 => interactive restore (show list of found backups) | 2 => non-interactive restore (restore first found backup)
    # - Simply attach the drive/disk/stick which contains the backup. All attached drives will be mounted temporarily and searched automatically.
    AUTO_SETUP_BACKUP_RESTORE=0

    ##### Software options #####
    # SSH server choice: 0=none/custom | -1=Dropbear | -2=OpenSSH
    AUTO_SETUP_SSH_SERVER_INDEX=-1

    # SSH server pubkey
    # - Public key(s) for "root" and "dietpi" users, which will be added to ~/.ssh/authorized_keys
    # - Use the same setting multiple times for adding multiple keys.
    # - See SOFTWARE_DISABLE_SSH_PASSWORD_LOGINS below for disabling SSH password logins.
    #AUTO_SETUP_SSH_PUBKEY=ssh-ed25519 AAAAAAAA111111111111BBBBBBBBBBBB222222222222cccccccccccc333333333333 mySSHkey

    # Logging mode choice: 0=none/custom | -1=RAMlog hourly clear | -2=RAMlog hourly save to disk + clear | -3=Rsyslog + Logrotate
    AUTO_SETUP_LOGGING_INDEX=-2
    # RAMlog max tmpfs size (MiB). 50 MiB should be fine for single use. 200+ MiB for heavy webserver access log etc.
    AUTO_SETUP_RAMLOG_MAXSIZE=50

    # Dependency preferences
    # - DietPi-Software installs all dependencies for selected software options automatically, which can include a webserver for web applications, a desktop for GUI applications and one usually wants a web browser on desktops.
    # - Especially for non-interactive first run installs (see AUTO_SETUP_AUTOMATED below), you may want to define which webserver, desktop and/or browser you want to have installed in such case. For interactive installs you will be always asked to pick one.
    # - With below settings you can define your preference for non-interactive installs. However, it will only installed if any other selected software requires it, and an explicit webserver/desktop/browser selection overrides those settings:
    # - Webserver preference: 0=Apache | -1=Nginx | -2=Lighttpd
    AUTO_SETUP_WEB_SERVER_INDEX=0
    # - Desktop preference: 0=LXDE | -1=Xfce | -2=MATE | -3=LXQt | -4=GNUstep
    AUTO_SETUP_DESKTOP_INDEX=0
    # - Browser preference: 0=None | -1=Firefox | -2=Chromium
    AUTO_SETUP_BROWSER_INDEX=-2

    # DietPi-Autostart: 0=Console | 7=Console autologin | 1=Kodi | 2=Desktop autologin | 16=Desktop | 4=OpenTyrian | 5=DietPi-CloudShell | 6=Amiberry fast boot | 8=Amiberry standard boot | 9=DDX-Rebirth | 10=CAVA Spectrum | 11=Chromium kiosk | 14=Custom script (background) | 17=Custom script (foreground)
    # - This will be effective on 2nd boot, after first run update and installs have been done.
    # - Related software titles must be installed either on first run installs or via AUTO_SETUP_AUTOMATED=1 + AUTO_SETUP_INSTALL_SOFTWARE_ID (see below).
    AUTO_SETUP_AUTOSTART_TARGET_INDEX=11
    # Autologin user name
    # - This user must exist before first run installs, otherwise it will be reverted to root.
    # - Applies to all autostart options but: 0, 6, 14 and 16
    AUTO_SETUP_AUTOSTART_LOGIN_USER=dietpi

    ##### Non-interactive first run setup #####
    # On first login, run update, initial setup and software installs without any user input
    # - Setting this to "1" is required for AUTO_SETUP_GLOBAL_PASSWORD and AUTO_SETUP_INSTALL_SOFTWARE_ID.
    # - Setting this to "1" indicates that you accept the DietPi GPLv2 license, available at /boot/dietpi-LICENSE.txt, superseding AUTO_SETUP_ACCEPT_LICENSE.
    AUTO_SETUP_AUTOMATED=1

    # Global password to be applied for the system
    # - Requires AUTO_SETUP_AUTOMATED=1
    # - Affects "root" and "dietpi" users login passwords and is used by dietpi-software as default for software installs which require a password.
    # - During first run setup, the password is removed from this file and instead encrypted and saved to root filesystem.
    # - WARN: The default SSH server Dropbear does not support passwords over 100 characters.
    # - WARN: We cannot guarantee that all software options can handle special characters like \"$.
    AUTO_SETUP_GLOBAL_PASSWORD=ChangeMe

    # Software to automatically install
    # - Requires AUTO_SETUP_AUTOMATED=1
    # - List of available software IDs: https://github.com/MichaIng/DietPi/wiki/DietPi-Software-list
    # - Add as many entries as you wish, one each line.
    # - DietPi will automatically install all dependencies, like ALSA/X11 for desktops etc.
    # - E.g. the following (without the leading "#") will install the LXDE desktop automatically on first boot:
    AUTO_SETUP_INSTALL_SOFTWARE_ID=23
    AUTO_SETUP_INSTALL_SOFTWARE_ID=113
    AUTO_SETUP_INSTALL_SOFTWARE_ID=28
    #AUTO_SETUP_INSTALL_SOFTWARE_ID=73
    #AUTO_SETUP_INSTALL_SOFTWARE_ID=200

    #------------------------------------------------------------------------------------------------------
    ##### Misc DietPi program settings #####
    #------------------------------------------------------------------------------------------------------
    # DietPi-Survey: 1=opt in | 0=opt out | -1=ask on first call
    # - https://dietpi.com/docs/dietpi_tools/#miscellaneous (see tab 'DietPi Survey')
    SURVEY_OPTED_IN=-0

    #------------------------------------------------------------------------------------------------------
    ##### DietPi-Config settings #####
    #------------------------------------------------------------------------------------------------------
    # CPU Governor: schedutil | ondemand | interactive | conservative | powersave | performance
    CONFIG_CPU_GOVERNOR=schedutil
    # Ondemand Sampling Rate | Min value: 10000 microseconds (10 ms)
    CONFIG_CPU_ONDEMAND_SAMPLE_RATE=25000
    # Ondemand Sampling Down Factor: Sampling Rate * Down Factor / 1000 = ms (40 = 1000 ms when sampling rate is 25000)
    CONFIG_CPU_ONDEMAND_SAMPLE_DOWNFACTOR=40
    # Throttle Up Percentage: Percentage of average CPU usage during sampling rate at which CPU will be throttled up/down
    CONFIG_CPU_USAGE_THROTTLE_UP=50

    # CPU Frequency Limits: Disabled=disabled
    # - Intel CPUs use a percentage value (%) from 0-100, e.g.: 55
    # - All other devices must use a specific MHz value, e.g.: 1600
    # - Has no effect on RPi, please set "arm_freq" and "arm_freq_min" in config.txt instead.
    CONFIG_CPU_MAX_FREQ=Disabled
    CONFIG_CPU_MIN_FREQ=Disabled

    # Disable Intel-based turbo/boost stepping. This flag should not be required, setting <100% MAX frequency should disable Turbo on Intel CPUs.
    CONFIG_CPU_DISABLE_TURBO=0

    #GPU Driver | Will also be applied during 1st run if set to a value other than 'None'
    #   NB: x86_64 PC only!
    #   Adds support for GUI/video hardware acceleration, OpenGL/GLES, Vulkan and VA-API
    # - none | Default, No GPU
    # - intel
    # - nvidia
    # - amd
    # - custom | Manual driver install (DietPi will not make driver changes to your system)
    CONFIG_GPU_DRIVER=none

    # System-wide proxy settings
    # - Do not modify, you must use dietpi-config > "Network Options: Adapters" to apply
    CONFIG_PROXY_ADDRESS=MyProxyServer.com
    CONFIG_PROXY_PORT=8080
    CONFIG_PROXY_USERNAME=
    CONFIG_PROXY_PASSWORD=

    # Connection timeout in seconds for G_CHECK_NET and G_CHECK_URL. Increase if you have a "flaky" connection or slow DNS resolver.
    # - Set this to "0" to allow unlimited time, however this is not recommended to avoid unlimited hanging background scripts, e.g. daily DietPi update check.
    # - A negative or non-integer value will result in the default of 10 seconds.
    CONFIG_G_CHECK_URL_TIMEOUT=10
    # Connection attempts with above timeout each, before G_CHECK_NET and G_CHECK_URL give up and prompt an error.
    # - Any value below "1" or a non-integer value will result in the default of 2 attempts.
    CONFIG_G_CHECK_URL_ATTEMPTS=2
    # General connection and DNS testing
    # - IPv4 address to ping when checking network connectivity. Default: 9.9.9.9 (Quad9 DNS IP)
    CONFIG_CHECK_CONNECTION_IP=9.9.9.9
    # - IPv6 address to ping when checking network connectivity. Default: 2620:fe::fe (Quad9 DNS IP)
    CONFIG_CHECK_CONNECTION_IPV6=2620:fe::fe
    # - Domain to resolve when checking DNS resolver. Default: dns9.quad9.net (Quad9 DNS domain)
    CONFIG_CHECK_DNS_DOMAIN=dns9.quad9.net

    # Daily check for DietPi updates: 0=disable | 1=enable
    # - Checks are done by downloading a file of only 7 bytes.
    CONFIG_CHECK_DIETPI_UPDATES=1

    # Daily check for APT package updates: 0=disable | 1=check only | 2=check and upgrade automatically
    # - Upgrade logs can be found at: /var/tmp/dietpi/logs/dietpi-update_apt.log
    CONFIG_CHECK_APT_UPDATES=1

    # Network time sync: 0=disabled | 1=boot only | 2=boot + daily | 3=boot + hourly | 4=Daemon + Drift
    CONFIG_NTP_MODE=2

    # Serial Console: Set to 0 if you do not require serial console.
    CONFIG_SERIAL_CONSOLE_ENABLE=0

    # Sound card
    CONFIG_SOUNDCARD=none

    # LCD Panel addon
    # - Do not modify, you must use dietpi-config to configure/set options
    CONFIG_LCDPANEL=none

    # IPv6
    CONFIG_ENABLE_IPV6=1

    # APT mirrors which are applied to /etc/apt/sources.list | Values here will also be applied during 1st run setup
    # - Raspbian: https://www.raspbian.org/RaspbianMirrors
    CONFIG_APT_RASPBIAN_MIRROR=http://raspbian.raspberrypi.org/raspbian/
    # - Debian: https://www.debian.org/mirror/official#list
    CONFIG_APT_DEBIAN_MIRROR=https://deb.debian.org/debian/

    # NTP mirror, applied to /etc/ntp.conf
    # - For a full list, please see: https://www.ntppool.org/zone/@
    # - Please remove the initial integer and full stop from the value (removing "0."), eg: debian.pool.ntp.org
    CONFIG_NTP_MIRROR=debian.pool.ntp.org

    #------------------------------------------------------------------------------------------------------
    ##### DietPi-Software settings #####
    #------------------------------------------------------------------------------------------------------
    # SSH Server
    # - Disable SSH password logins, e.g. when using pubkey authentication
    #	0=Allow password logins for all users, including root
    #	root=Disable password login for root user only
    #	1=Disable password logins for all users, assure that you have a valid SSH key applied!
    SOFTWARE_DISABLE_SSH_PASSWORD_LOGINS=0

    # VNC Server
    SOFTWARE_VNCSERVER_WIDTH=1280
    SOFTWARE_VNCSERVER_HEIGHT=720
    SOFTWARE_VNCSERVER_DEPTH=16
    SOFTWARE_VNCSERVER_DISPLAY_INDEX=1
    SOFTWARE_VNCSERVER_SHARE_DESKTOP=0

    # ownCloud/Nextcloud
    # - Optional username for admin account, the default is 'admin', applied during install
    SOFTWARE_OWNCLOUD_NEXTCLOUD_USERNAME=admin
    # - Optional data directory, default is "/mnt/dietpi_userdata/owncloud_data" respectively "/mnt/dietpi_userdata/nextcloud_data", applied during install
    SOFTWARE_OWNCLOUD_DATADIR=/mnt/dietpi_userdata/owncloud_data
    SOFTWARE_NEXTCLOUD_DATADIR=/mnt/dietpi_userdata/nextcloud_data

    # WiFi Hotspot
    SOFTWARE_WIFI_HOTSPOT_SSID=DietPi-HotSpot
    # - Key requires a minimum of 8 characters
    SOFTWARE_WIFI_HOTSPOT_KEY=dietpihotspot
    # - 2.4 GHz WiFi channel, not effective if 5 GHz frequency is enabled
    SOFTWARE_WIFI_HOTSPOT_CHANNEL=3
    # - 802.11n/WiFi 4, 802.11ac/WiFi 5, 802.11ax/WiFi 6 and 5 GHz support: Note that your WiFi adapter must support it!
    # - WiFi 5 support implicitly switches to 5 GHz frequency.
    # - 5 GHz frequency implicitly enables WiFi 4 support if neither WiFi 4, 5 nor 6 is enabled.
    SOFTWARE_WIFI_HOTSPOT_WIFI4=0
    SOFTWARE_WIFI_HOTSPOT_WIFI5=0
    # - WiFi 6 is only supported from Debian Bookworm on!
    SOFTWARE_WIFI_HOTSPOT_WIFI6=0
    SOFTWARE_WIFI_HOTSPOT_5G=0
    # - A full list of supported 5 GHz WiFi channels per region can be found e.g. on Wikipedia: https://en.wikipedia.org/wiki/List_of_WLAN_channels#5_GHz_(802.11a/h/n/ac/ax)
    SOFTWARE_WIFI_HOTSPOT_5G_CHANNEL=36

    # X.org
    # - DPI 96(default) 120(+25%) 144(+50%) 168(+75%) 192(+100%)
    SOFTWARE_XORG_DPI=96

    # Chromium
    SOFTWARE_CHROMIUM_RES_X=1920
    SOFTWARE_CHROMIUM_RES_Y=1080
    SOFTWARE_CHROMIUM_AUTOSTART_URL=https://portal.northeastprecast.com/Device?key=ChangeMe

    # Home Assistant
    # - Optional Python build dependencies and modules, possibly required for certain HA components
    #	Space separated list (no quotation!), will be installed together with Home Assistant automatically, if present
    SOFTWARE_HOMEASSISTANT_APT_DEPS=
    #	Add Python modules with version string at best, e.g.: firstModule==1.2.3 secondModule==4.5.6
    SOFTWARE_HOMEASSISTANT_PIP_DEPS=

    # K3s
    # Command with flags to use for launching K3s in the service
    # The value of this variable is copied directly into the INSTALL_K3S_EXEC environment variable before
    # running the K3s installer.
    # https://rancher.com/docs/k3s/latest/en/installation/install-options/#options-for-installation-with-script
    #
    # Optionally, you can add a configuration file named /boot/dietpi-k3s.yaml,
    # which will be copied into place during installation.
    # https://rancher.com/docs/k3s/latest/en/installation/install-options/#configuration-file
    SOFTWARE_K3S_EXEC=

    # DietPi-Dashboard
    # Version to use
    # - Stable = Use release version of DietPi-Dashboard.
    # - Nightly = Use unstable version DietPi-Dashboard. Might have bugs, but will probably have more features.
    SOFTWARE_DIETPI_DASHBOARD_VERSION=Stable
    # Whether to only install backend or not
    SOFTWARE_DIETPI_DASHBOARD_BACKEND=0

    # PiVPN
    # - For an unattended install, place a config file named "unattended_pivpn.conf" into the boot partition/directory.
    # - For example configs, have a look at: https://github.com/pivpn/pivpn/tree/master/examples

    # Shairport Sync
    # - Uncomment and set to "2" to install experimental AirPlay 2 build: https://github.com/mikebrady/shairport-sync/blob/master/AIRPLAY2.md
    #SOFTWARE_SHAIRPORT_SYNC_AIRPLAY=2

    # UrBackup Server
    # - Backup path, optional, defaults to "/mnt/dietpi_userdata/urbackup", effective on fresh UrBackup Server installs only
    SOFTWARE_URBACKUP_BACKUPPATH=/mnt/dietpi_userdata/urbackup

    #------------------------------------------------------------------------------------------------------
    ##### Dev settings #####
    #------------------------------------------------------------------------------------------------------
    DEV_GITBRANCH=master
    DEV_GITOWNER=MichaIng

    #------------------------------------------------------------------------------------------------------
    ##### Settings, automatically added by dietpi-update #####
    #------------------------------------------------------------------------------------------------------
    ```

DietPi will now go through a one time setup process based on the options in the `dietpi.txt` file. This may take several minutes depending on the speed of the SD card and software chosen to install in `dietpi.txt`. Once complete, make sure the Pi reboots and launches Chromium in kiosk mode.

You'll notice that the cursor is still visible. To hide it, we'll have to edit the autostart file:

1. Close Chromium by pressing `Alt+F4` to reveal the terminal and run the following command:
    - `sudo nano /var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh`
2. Add `-- -nocursor` to the end of the last line so it looks likes this:
    - `exec "$STARTX" "$FP_CHROMIUM" $CHROMIUM_OPTS "${URL:-https://dietpi.com/}" -- -nocursor`

If the display resolution wasn't properly detected, you can manually set it in `DietPi-Config`:

1. `sudo dietpi-config`
2. Display Options > Display Resolution > 1080P : 1920 x 1080
3. Exit DietPi-Config and reboot.

### Raspberry Pi 5 and 4K

As of writing this (4/23/24), I ran into issues trying to get a Pi 5 to display 4K (adding `enable_hdmi_4kp60=1` to /boot/config.txt). The `/var/log/Xorg.0.log` log file spit out this error when attempting to launch Chromium:

```
[    13.217] (EE) Fatal server error:
[    13.217] (EE) Cannot run in framebuffer mode. Please specify busIDs for all framebuffer devices
```

The solution was to creating `99-vc4.conf` in `/etc/X11/xorg.conf.d/` with the following contents:

```
Section "OutputClass"
  Identifier "vc4"
  MatchDriver "vc4"
  Driver "modesetting"
  Option "PrimaryGPU" "true"
EndSection
```

<https://forums.raspberrypi.com/viewtopic.php?t=361902>

### Disable Boot Messages

If you prefer to not see the boot messages when the Pi is starting up, you can disable them by editing the `cmdline.txt` file. This file is located in the same FAT32 boot partition as `dietpi.txt`. You will edit this file the same way you did `dietpi.txt` - by opening it in a text editor on your computer.

The contents of the file should look something like this:

```text
root=PARTUUID=127c511a-02 rootfstype=ext4 rootwait net.ifnames=0 logo.nologo console=tty3
```

Change the `console=tty1` to `console=tty3` and add `vt.global_cursor_default=0 quiet loglevel=0 splash` to the end of the line.

## Hardening

In an attempt to "harden" a raspberry Pi deployed in the wild that may be easily accessed, like behind a lobby TV, there are few things you can do. Keep in mind that any of the methods listed below are NOT bullet proof. A highly motivated bad actor will still do whatever they can to gain access to your systems.

### Disable USB Ports

Cutting power from the USB ports will prevent a bad actor from being able to attach USB devices like a keyboard/mouse.

Install [uhubctl](https://github.com/mvp/uhubctl):

```bash
sudo apt install -y uhubctl
```

Power off all USB ports:

```bash
sudo uhubctl -l 1-1 -p 2 -a 0 #(1)!
```

1. If you need to power the USB ports back on for any reason, you can change `-a 0` to `-a 1`.

!!! note "Note: Power *will* be restored after a reboot."

    We need to come up with a method to power off the USB ports at the end of each boot sequence. Thankfully, thats pretty easy to script using cronjobs or DietPi's autostart scripts. 

    In our environment, we use DietPi to launch chromium in kiosk mode. Adding `sudo uhubctl -l 1-1 -p 2 -a 0` the `/var/lib/dietpi/dietpi-software/installed/chromium-autostart.sh` is easy enough.