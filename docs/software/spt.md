# Single Player Tarkov (with Project FIKA)

Single Player Tarkov (SPT) is a mod for Escape from Tarkov that allows you to play the game as a single player. It is a mod that is still in development and is not officially supported by Battlestate Games. The mod is designed to allow players to experience the game without the need for an internet connection or other players. To play with others, you will need the Project FIKA mod.

# SPT Initial Setup

1. Download the [SPT installer](https://ligma.waffle-lord.net/SPTInstaller.exe).
2. Run the installer and follow the prompts.
3. Once the installation is complete, navigate to your SPT directory and launch the SPT.Server.exe
4. Once the server is running, launch the SPT.Client.exe
5. Create your profile, launch the game and then close. This will create the necessary files for the mods to work.
6. Download the [latest project FIKA plugin](https://github.com/project-fika/Fika-Plugin/releases/tag/v0.9.9015.15435) and extract the BepInEx folder to your SPT directory.
7. Download the [latest project FIKA server](https://github.com/project-fika/Fika-Server/releases/latest) and extract the user folder to your SPT directory.
8. Start up the `SPT.Server.exe` once to let it generate the configuration files for Fika, then close it again.
9. Go back to the main SPT folder and navigate to `SPT_Data\Server\configs` and open `http.json`.
10. Change `ip` to `0.0.0.0` and `backendIp` to your [WAN IP](https://ipv4.icanhazip.com/) (click to retrieve), then save the file and close it.
11. Navigate to `user\mods\fika-server\assets\configs` and open `fika.jsonc`
12. Change any of the settings according to your likings.
    - **useBtr**: if the BTR should spawn or not when playing Streets
    - **friendlyFire**: if friendly fire should be enabled or not
    - **dynamicVExfils**: automatically scale vehicle exfils max players with the amount of players in the raid
    - **allowFreeCam**: allow players to freely toggle free cam during raids
    - **giftedItemsLoseFIR**: if sent items should lose their FiR status
13. Start the `SPT.Server.exe` and wait for it to finish loading.
    -   This is what it should look like if it succeeded to start with an example WAN IP of 70.60.150.90:</br>
    ```txt
    Started webserver at http://70.60.150.90:6969
    Started websocket at ws://70.60.150.90:6969
    Server is running, do not close while playing SPT, Happy playing!!
    ```
14. Start `SPT.Launcher.exe`