# PiSignage

!!! info

    [PiSignage](https://github.com/colloqi/pisignage) is a Digital Signage Player software primarily for Raspberry Pi boards and also supports other Debian based hardware systems as well.

!!! note

    The following content is directly related to PiSignage. For content more broadly related to the [Raspberry Pi](../hardware/raspberrypi.md), see that section.

## Configuration (Standalone Player)

I wrote a shell script to speed up the deployment of standalone PiSignage players. Follow the steps below to get start.

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
