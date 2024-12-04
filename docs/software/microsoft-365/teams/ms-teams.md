# Microsoft Teams

## Register Missing Meeting Add-in

Resolve missing "New Items > Teams Meeting" in Outlook. This appears to happen after installing the "new" Teams app.

1. Close Outlook
2. Open "Installed Apps" (Win11) or "Apps & Features" (Win10) in Settings and search for "Teams"
3. Uninstall the classic version (if installed)
      - Note: The "new" version should be called "Microsoft Teams (work or school)". Don't remove that.
4. Repair the "Microsoft Teams Meeting Add-in" by clicking it and then Modify
      - Note: If it complains that the add-in installer doesn't exist, reinstall Teams from the Microsoft website.
5. Run Outlook
6. Open the COM add-ins window in Outlook (File > Options > Add-ins > Go)
7. Check the box for "TeamsAddin.FastConnect"
      - Note: If the box was already checked: uncheck it, click Ok, open add-ins again, check the box, and click Ok.
8. "Teams Meeting" should now be listed under the "New Items" menu.
Note: It takes a 5-10 seconds for the meeting code to be generated.

## Record a Meeting

!!! info 

    - Anyone can record a meeting as long as:
        - The option has been enabled by an admin.
        - They are not a guest from another organization.
    - Recordings won't capture:
        - More than four people's video streams at once.
        - Whiteboards and annotations.
        - Shared notes.
        - Content shared by apps.
        - Videos or animations embedded in PowerPoint Live presentations.
    - Only one person can record at a time.
    - Recordings are processed and saved in the organizer's OneDrive for Business.
    - The recording shows up in the meeting chat or channel conversation.
    - Guests and external attendees can view a recording only if it's explicitly shared with them.

**To start recording**:

1. Join or start the meeting.
2. In your meeting controls, select **More** > **Record and transcribe** > **Start recording**.

**To stop recording**:

1. In the meeting controls, select **More actions** > **record and transcribe**.
2. Choose **Stop recording** or **Stop Transcription**.

[*Reference*](https://support.microsoft.com/en-us/office/record-a-meeting-in-microsoft-teams-34dfbe7f-b07d-4a27-b4c6-de62f1348c24)

## Tips and Tricks

### Quickly edit last message

If you need to edit a message you recently sent on Teams and not one has replied to it yet, you can press the up arrow key to edit your last message!