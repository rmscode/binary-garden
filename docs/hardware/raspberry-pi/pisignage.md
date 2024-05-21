# PiSignage

!!! info

    [PiSignage](https://github.com/colloqi/pisignage) is a Digital Signage Player software primarily for Raspberry Pi boards and also supports other Debian based hardware systems as well.

!!! note

    As of 12/22/23 we have moved away from PiSignage in favor of DietPi for digital signage purposes. This allows us to update the OS and Chromium on a more regular basis. Something we had to wait on the PiSignage developers for. This was a problem because we moved from a .NET MAUI app to Blazor WASM (for easier development) and it wouldn't work with the PiSignage build we had.

## Configuration (Standalone Player)

I wrote a shell script to speed up the deployment of standalone PiSignage players. Follow the steps below to get started.

!!! note "In our current evironmemt, we use PiSignage 3.2.0 on Raspberry Pi 3 boards."

1. [Download PiSignage](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.0.img.zip) and write to an SD card using [RPI-Imager](https://www.raspberrypi.com/software/).
2. Insert the SD card, power on the Pi and connect via SSH with the default creds pi:pi.
3. Clone my PiCommander github Repo to download the setup scripts:
      1. `git clone https://github.com/rmscode/PiCommander`
4. Make the script executable:
      1. `chmod +x PiCommander/scripts/piPlayer-config.sh`
5. Execute the script and follow the prompts:
      1. `./PiCommander/scripts/piPlayer-config.sh`

## Management Server

!!! note

    As of writing this (7/19/2023), Ubuntu server 22.04 (Jammy) was used. You will be executing all commands from the home folder of the user you create during the installation of Ubuntu.

### Download and install Ubuntu Server

I don't think I need to go into great detail here. Make sure you update the system after installation is complete:

```bash
sudo apt update && sudo apt upgrade
```

### Install the required packages

```bash
sudo apt install git nodejs npm ffmpeg libpng-dev libjpeg-dev libtiff-dev imagemagick gnupg curl
```

### Install and configure MongoDB

Add GPG key:

```bash
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \sudo gpg -o /etc/apt/trusted.gpg.d//mongodb-server-6.0.gpg \--dearmor
```

Add MongoDB repository to APT sources:

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
```

Install MongoDB:

```bash
sudo apt install mongodb-org
```

Start and enable the MongoDB service:

```bash
sudo systemctl enable --now mongod
sudo systemctl status mongod
```

### Install and configure piSignage Server

```bash
git clone https://github.com/colloqi/pisignage-server
mkdir media
mkdir media/_thumbnails
cd pisignage-server
npm install
sudo chown -R <YourUsername>:users data/
```

## API

<https://piathome.com/apidocs>

<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/*`

<span style="color:royalblue">**GET**</span> `http://<PlayerIP>:8000/api/*`

##  Assets

### Get all asset details

### Get specific asset details

### Create link asset (web link)
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/links`

JSON Payload:
```json
{
  "details": {
    "name": "NEP_Directory",
    "type": ".weblink",
    "link": "https://portal.northeastprecast.com/w/tv",
    "hideTitle": "Unknown Type: [object Object]",
    "numberOfItems": 0,
    "zoom": 1,
    "message": "string"
  }
}
```

CURL:
```curl
curl -X POST -H "accept: application/json" -H "Content-Type: application/json" ^
-d "{\"details\": { \"name\":\"NEP_Directory\", \"type\": \".weblink\", \"link\": \"https://portal.northeastprecast.com/w/tv\", \"hideTitle\": \"Unknown Type: [object Object]\", \"zoom\": 1, \"message\":\"string\" } }" ^
-u pi:pi http://<PlayerIP>:8000/api/links
```

### Upload asset files

### Edit asset

### Delete asset

## Playlists

### Get all playlist details
<span style="color:royalblue">**GET**</span> `http://<PlayerIP>:8000/api/playlists`

JSON Payload:
```json
empty
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" -u pi:pi http://<PlayerIP>:8000/api/play/playlists
```

### Get specific playlist details
<span style="color:royalblue">**GET**</span> `http://<PlayerIP>:8000/api/playlists/<PlaylistName>`

JSON Payload:
```json
empty
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" -u pi:pi http://<PlayerIP>:8000/api/play/playlists/<PlaylistName>
```

### Create playlist
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/playlists`

JSON Payload:
```json
{
  "file": "A1_Lobby"
}
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" ^
-d "{\"file\": \"A1_Lobby\"}" ^
-u pi:pi http://<PlayerIP>:8000/api/playlists
```

### Edit playlist details (add an asset to a playlist)
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/playlists`

JSON Payload:
```json
{
  "assets": [
    {
      "filename": "NEP_Directory.weblink",
      "duration": 100, // Seconds played before refresh or next asset
      "isVideo": false,
      "selected": true,
      "option": {
        "main": true,
        "side": true,
        "bottom": true,
        "zone4": true,
        "subduration": "Unknown Type: seconds",
        "bannerText": "string"
      },
      "fullscreen": true,
      "side": "string",
      "bottom": "string",
      "zone4": "string",
      "zone5": "string",
      "zone6": "string"
    }
  ]
}
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" ^
-d "{ \"assets\": [ { \"filename\": \"NEP_Directory.weblink\", \"duration\": 100, \"isVideo\": false, \"selected\": true, \"option\": { \"main\": true, \"side\": true, \"bottom\": true, \"zone4\": true, \"subduration\": \"Unknown Type: seconds\", \"bannerText\": \"string\" }, \"fullscreen\": true, \"side\": \"string\", \"bottom\": \"string\", \"zone4\": \"string\", \"zone5\": \"string\", \"zone6\": \"string\" } ] }" ^
-u pi:pi http://<PlayerIP>:8000/api/playlists/Autogen_Playlist

### Start a playlist
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/play/playlists/<PlaylistName>`

JSON Payload:
```json
{
	"play": "true"
}
``` 
CURL:
```curl
curl -X POST -H "Content-Type: application/json" -d "{\"play\": true}" -u pi:pi http://<PlayerIP>:8000/api/play/playlists/<PlaylistName>
```

### Start a playlist
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/play/playlists/Directory`

JSON Payload:
```json
{
	"play": "true"
}
``` 
CURL:
```curl
curl -X POST -H "Content-Type: application/json" -d "{\"play\": true}" -u pi:pi http://<PlayerIP>:8000/api/play/playlists/Directory
```

### Stop a playlist
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/play/playlists/<PlaylistName>`

JSON Payload:
```json
{
	"stop": "true"
}
``` 
CURL:
```curl
curl -X POST -H "Content-Type: application/json" -d "{\"stop\": true}" -u pi:pi http://<PlayerIP>:8000/api/play/playlists/<PlaylistName>
```

## Player Controls

### Return the player status
<span style="color:royalblue">**GET**</span> `http://<PlayerIP>:8000/api/status`

JSON Payload:
```
empty
```

### Return the player settings
<span style="color:royalblue">**GET**</span> `http://<PlayerIP>:8000/api/settings`

JSON Payload:
```
empty
``` 

### Change player name and description
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/settings/hostname`

JSON Payload:
```json
{
  "localName": "string",
  "note": "string"
}
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" ^ 
-d "{ \"localName\": \"string\", \"note\": \"string\" }" ^
-u pi:pi http://<PlayerIP>:8000/api/settings/hostname
```

### Change overscan options
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/settings/overscan`

JSON Payload:
```json
{
  "overscan": {
    "disable_overscan": true, //True or false
    "horizontal": 0,
    "vertical": 0
  }
}
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" ^
-d "{ \"overscan\": { \"disable_overscan\": true, \"horizontal\": 0, \"vertical\": 0 } }" ^
-u pi:pi http://<PlayerIP>:8000/api/settings/overscan
```

### Change default user/password
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/settings/user`

JSON Payload:
```json
{
  "user": {
    "name": "string",
    "newpasswd": "string"
  }
}
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" ^
-d "{ \"user\": { \"name\": \"pi\", \"newpasswd\": \"pi\" } }" ^
-u pi:pi http://<PlayerIP>:8000/api/settings/user
```
 
### Schedule TV sleep time
<span style="color:lightgreen">**POST**</span> `http://<PlayerIP>:8000/api/settings/sleep`

JSON Payload:
```json
{
  "sleep": {
    "enable": true,
    "ontime": "04:00", 
    "offtime": "17:30" // 24 hour clock
  }
}
```

CURL:
```curl
curl -X POST -H "Content-Type: application/json" ^
-d "{ \"sleep\": { \"enable\": true, \"ontime\": \"4:00\", \"offtime\": \"17:30\" } }" ^
-u pi:pi http://<PlayerIP>:8000/api/settings/sleep
```