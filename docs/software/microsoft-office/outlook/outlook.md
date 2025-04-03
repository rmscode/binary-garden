# Outlook

## Register Missing Teams Meeting Add-in

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

## Outlook Mobile App

### Add Email Account (Exchange)

1. Open the Outlook Mobile App
2. If it's your first time launching the app, tap **Get Started** and then **Skip**. Otherwise, tap **Menu** > **Settings** > **Add Account**.
3. Enter your company email address and select **Continue**.
4. Select **Exchange**.
5. Enter your password and a description for the account.
6. Select the **Advanced Settings** toggle at the bottom right of the screen.
7. Ensure that `mail.northeastprecast.com` is entered in the **Server** field.
8. Leave the **Domain** field blank and enter your full email address in the **Username** field.
9. Tap the checkmark in the top right corner to finish.

!!! note

    I can confirm that these steps work for both [Android](../../../notes/2024.md#12042024-1139) and [iOS](../../../notes/2024.md#12182024-1037).

## Prevent Meeting Requests From Being Deleted After Responding

By default, Outlook will automatically delete meeting requests from your inbox after responding. To prevent this, follow these steps:

1. Open Outlook & click on the **File** > **Options**
2. In the Outlook Options dialog box, click **Mail** in the left pane, and then uncheck the option "*Delete meeting requests and notifications from Inbox after responding*" in the **Send Messages** section.
3. Click **OK**.

## Safe Mode

To launch Outlook in safe mode, hold the **Ctrl** key while clicking the Outlook shortcut. This will launch Outlook in safe mode.

## Issues 

### Mailbox Disconnected

After adding a second mailbox to Outlook, my main mailbox would not connect to exchange. Tried some of the methods in the NEP docs, but here is what worked for me:

1. Control Panel > User Accounts > Mail
2. Open "Data Files"
3. Create new data file
4. Select "Email tab" and delete all email accounts
5. Re-add email accounts from same tab by selecting "new".
6. Relaunch Outlook and sign in when prompted. 