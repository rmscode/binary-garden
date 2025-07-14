# Send from Alias

## Enable the feature

1. Open the Exchange Admin Center
2. Click **Settings** > **Mail Flow**
3. Tick the box for **Turn on sending from aliases**

### With Powershell

[Connect to Exchange Online PowerShell](exo-powershell.md#usage).

```powershell title="Enable sending from aliases"
Set-OrganizationConfig -SendFromAliasEnabled $true
```

## How to Send From Alias

### Outlook New

### Outlook Classic

1. Select **From**
    - You probably have to enable the **From** field first: Compose a **New Email** > **Options** tab > **Show Fields**
2. Choose **Other email address**
3. Type your alias and click **OK**

### Outlook on the Web <small>outlook.com</small>  { data-toc-label="Outlook on the Web" }

1. Open Settings (gear icon) in Outlook on the Web
2. Go to **General** > Toggle on **Use my Microsoft 365 Settings**
3. Go to **Mail** > **Compose and reply**
4. Under **Addresses to send from**, select the desired alias(es).
5. Save your changes.

Once the above steps are complete, you will be able to select your alias in the **From** field when composing a new message.

### Outlook Mobile <small>(iOS/Android)</small> { data-toc-label="Outlook Mobile" }

1. Open Outlook Mobile > Tap the account icon (Top left)
2. Tap the setting gear icon (Bottom left)
3. Select **Accounts** > Select your Microsoft 365 account
4. Scroll to the bottom and tap **Reset Account**. This will resync your Outlook Mobile app with your Microsoft 365 settings.

Once the above steps are complete, you will be able to select your alias in the **From** field when composing a new message.

!!! note

    In addition to these steps, if you have not already done so, you may also need to complete the steps listed under [Outlook on the Web](#outlook-on-the-web). That is according to an [Ali Tajran post](https://www.alitajran.com/send-as-alias-outlook-mobile-app/), anyway. As of 7/13/25, I had first tested sending from an alias using Outlook on the Web, so I can't confirm that these steps alone will work.

## References 

:material-microsoft: [Sending From Email Aliases - Public Preview](https://techcommunity.microsoft.com/blog/exchange/sending-from-email-aliases-%E2%80%93-public-preview/3070501)<br>
:material-microsoft: [Set-OrganizationConfig](https://learn.microsoft.com/en-us/powershell/module/exchange/set-organizationconfig?view=exchange-ps)