# Outlook

## Prevent Meeting Requests From Being Deleted After Responding

By default, Outlook will automatically delete meeting requests from your inbox after responding. To prevent this, follow these steps:

1. Open Outlook & click on the **File** > **Options**
2. In the Outlook Options dialog box, click **Mail** in the left pane, and then uncheck the option "*Delete meeting requests and notifications from Inbox after responding*" in the **Send Messages** section.
3. Click **OK**.

## Issues 

### Mailbox Disconnected

After adding a second mailbox to Outlook, my main mailbox would not connect to exchange. Tried some of the methods in the NEP docs, but here is what worked for me:

1. Control Panel > User Accounts > Mail
2. Open "Data Files"
3. Create new data file
4. Select "Email tab" and delete all email accounts
5. Re-add email accounts from same tab by selecting "new".
6. Relaunch Outlook and sign in when prompted. 