# Quarantine

## Manage Quarantined Messages

1. In the Microsoft Defender portal at <https://security.microsoft.com>, go to **Email & collaboration** > **Review** > **Quarantine** > **Email** tab.
2. Select a quarantined message by clicking anywhere in the row other than the check box to open the details fly out.
3. After reviewing the message details, you can choose an appropriate action from the top menu bar.

!!! info 

    By default, only the first 100 entries are shown until you scroll down to the bottom of the list, which loads more results.

    Wildcards are not supported in the search box, but partial matches are supported. For example, searching for "contoso" will return results for "contoso.com" and "sales.contoso.com".

## Manage Quarantined Files

The process is the same as above, but you will be on the **Files** tab instead of the **Email** tab.

## Quarantine Policies

The user experience for quarantined items can be defined with policies:

- What users are allowed to do to their own quarantined messages (messages where they're a recipient) based on why the message was quarantined.
- Whether users receive periodic notifications about their quarantined items.

Traditionally, it is common for users to be able to view and release, or request to be released, messages that were quarantined as spam or bulk, but they can't view or release messages that were quarantined as high confidence phishing or malware.

### Create a Quarantine Policy

The following example creates a policy that allows users to view and request release of quarantined messages, but only for spam and bulk email. Notifications for quarantined items will also be enabled.

1. In the Microsoft Defender portal at <https://security.microsoft.com>, go to **Email & collaboration** > **Policies & Rules** > **Threat policies** > **Quarantine policy** in the **Rules** section.
2. Click **+ Create policy** and give it a name like `RequestOnlyWithNotificationPolicy`.
3. On the **Recipient message access** page, choose **Set specific access (Advanced)**, and select the following:
    -  Allow recipients to request a message to be released
    -  Additional actions: Preview
4. Enable quarantine notification on the next page and choose whether or not to include messages from blocked sender addresses.
5. Review and submit.

!!! info 

    If you select **Don't include quarantined messages from blocked sender addresses**, recipients aren't notified for messages quarantined due to blocked senders or Bulk detections. Recipients are notified about messages quarantined for other reasons.

### Assign a Quarantine Policy

!!! info

    Quarantine policies can be assigned to different "supported features", including:

    - Anti-Spam policies
    - Anti-Phishing policies
    - Anti-Malware policies
    - Safe Attachments protections

Follow these steps to assign quarantine policies to an Anti-Spam policy:

1. In the Microsoft Defender portal at <https://security.microsoft.com>, go to **Email & collaboration** > **Policies & rules** > **Threat policies** > **Anti-spam** in the **Policies** section.
2. Use one of the following methods:
    1. Select an existing inbound anti-spam policy by clicking anywhere in the row other than the check box, go to the **Actions** section and then select **Edit actions**.
    2. Click **+ Create policy** to create a new policy.
3. On the **Actions** page/section, every verdict that has **Quarantine message** action selected will have a **Quarantine policy** drop-down menu. Select the desired quarantine policy for each verdict.

## References

:material-microsoft: [*Manage quarantine messages and files as an admin*](https://learn.microsoft.com/en-us/defender-office-365/quarantine-admin-manage-messages-files)<br>
:material-microsoft: [*Quarantine email messages in EOP and Defender for Office 365*](https://learn.microsoft.com/en-us/defender-office-365/quarantine-about)<br>
:material-microsoft: [*Quarantine policies*](https://learn.microsoft.com/en-us/defender-office-365/quarantine-policies)