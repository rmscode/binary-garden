# Send from Alias

## Enable the feature

1. Open the [Exchange Online Admin Center](https://admin.exchange.microsoft.com/)
2. In the side bar, open **Settings** and then **Mail Flow**
3. Tick the box for **Turn on sending from aliases**

### With Powershell

[Connect to Exchange Online PowerShell](exo-powershell.md#usage).

```powershell title="Enable sending from aliases"
Set-OrganizationConfig -SendFromAliasEnabled $true
```

## How to Send From Alias

### Classic Outlook Client

1. Select **From**
    - You probably have to enable the **From** field first: Compose a **New Email** > **Options** tab > **Show Fields**
2. Choose **Other email address**
3. Type your alias and click **OK**

### New Outlook Client

!!! note

    These steps can be used for Outlook on the Web <small>(outlook.com)</small> as well. The two share the same code base.

1. Open Settings (gear icon)
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

    In addition to these steps, if you have not already done so, you may also need to complete the steps listed under [New Outlook Client](#new-outlook-client).

## References 

:material-microsoft: [Sending From Email Aliases - Public Preview](https://techcommunity.microsoft.com/blog/exchange/sending-from-email-aliases-%E2%80%93-public-preview/3070501)<br>
:material-microsoft: [Set-OrganizationConfig](https://learn.microsoft.com/en-us/powershell/module/exchange/set-organizationconfig?view=exchange-ps)