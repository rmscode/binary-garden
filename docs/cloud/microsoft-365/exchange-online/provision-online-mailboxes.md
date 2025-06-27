# Provision Online Mailboxes

!!! warning "Avoid deletion of mailbox data"

    Whether a new online mailbox is provisioned or an existing on-prem mailbox is migrated to the cloud, the service will allow a period of 30 days for admins to assign the proper licensing. After this period, the mailbox and all of it contents will be permanently deleted. There is no way to recover the mailbox or its contents after this period.
    
    Microsoft's recommendation is to always assign a license as soon as you see the mailbox provisioned in Exchange Online and in migration scenarios even before the move is injected.

!!! info "Provisioning Online Mailboxes in Exchange Hybrid"

    While it is possible to add a user in ADUC, allow for them to sync to Entra, and then license the user in M365, the user's Exchange Online attributes will never sync back to the on-premises environment to create a "Mail-enabled User" (MEU) object. In this scenario, managing the mailboxes from the on-prem environment isn't possible and since the M365 user is synced with on-prem AD, managing attributes from the cloud is also not possible. 

    Instead, ExO mailboxes should be created from the on-prem Exchange environment (EAC/EMS). This option will create the on-prem AD user *and* the MEU object with the remote routing address (such as jsmith@contoso.mail.onmicorosot.com). AD sync can then occur to establish the appropriate objects/attributes.

    If you've already made the mistake, see [here](#enable-remotemailbox). 

## Provision with PowerShell <small>`New-RemoteMailbox`</small> { #provision-with-powershell data-toc-label="Provision with PowerShell" }

From **on-prem** Exchange Management Shell:

```powershell title="1. Set a password for the new user"
$Credentials = Get-Credential
```

```powershell title="2. Provision the mailbox with New-RemoteMailbox"
New-RemoteMailbox -Name "John Smith" -Alias "jsmith" -FirstName "John" -LastName "Smith" -UserPrincipalName "jsmith@nep.com" -RemoteRoutingAddress "jsmith@nep.mail.onmicrosoft.com" -Password $Credentials.Password
```

```powershell title="3. Inspect the output"
Name          RecipientTypeDetails RemoteRecipientType
----          -------------------- -------------------
jsmith        RemoteUserMailbox    ProvisionMailbox
```

## Provision with the EAC

!!! info "Sign in to the on-premises Exchange Admin Center and NOT the Exchange Online Admin Center."

1. In the on-premises EAC, go to **Recipients** > **Mailboxes**.
2. Click on the **+** icon from the toolbar and select Office 365 mailbox.
3. Fill in the information and click **Save**.
4. Force sync Entra Connect with `Start-ADSyncSyncCycle -PolicyType Delta`.
5. On the **Recipients** page, select the new mailbox and click the **Edit (Pencil)** icon from the toolbar.
6. Click **email address** and verify the following:
    1. smtp `<user>@tenant.mail.onmicrosoft.com`
    2. Remote routing address.
7. Sign in to the Exchange Online Admin Center.
8. Go to **Recipients > Mailboxes** and click on the new Office 365 mailbox.
9. Select **General** and click on **Manage email address types**. There is no remote routing address option in the cloud, and you should see two smtp `onmicrosoft.com` addresses:
    1. `smtp:<user>@tenant.mail.onmicrosoft.com`
    2. `smtp:<user>@tenant.onmicrosoft.com`

!!! note

    Don't forget that this new user/mailbox still needs to be licensed in order to send/receive mail. 
    
    Ali Tajran has a nice [article](https://www.alitajran.com/assign-microsoft-365-licenses-group-based-licensing/) on how to configure group based licensing.

## `Enable-RemoteMailbox`

Let's say there is some scenario where a user was created in ADUC and then synced to M365. You can still create the MEU object and set the remote routing address with the `Enable-RemoteMailbox` cmdlet.

1. [Connect to Exchange Online PowerShell](exo-powershell.md#usage) and run:<br>

```powershell
Enable-RemoteMailbox -Identity "John Smith" -RemoteRoutingAddress "jsmith@nep.mail.onmicrosoft.com" -Alias "jsmith" -DisplayName "John Smith"
```
2. [Disconnect to Exchange Online PowerShell](exo-powershell.md#usage) and force sync Entra Connect:<br>
```powershell
Start-ADSyncSyncCycle -PolicyType Delta
```

## Potential Errors 

### ExchangeGuid is mandatory on UserMailbox

You may encounter this error after running the `Enable-RemoteMailbox` cmdlet.

Ali Tajran's has an [article](https://www.alitajran.com/enable-remotemailbox-exchangeguid-is-mandatory-on-usermailbox/) that explains how to solve this issue but never gets into why it might happen. Other [sources](https://www.mistercloudtech.com/2017/02/06/fixing-the-exchangeguid-is-mandatory-on-usermailbox-issue/) indicate that it may be caused by an internal mailbox decommissioning process failure, so the `msExchHomeServerName` attribute was not cleared properly on the user object.

!!! example

    ```powershell
    ExchangeGuid is mandatory on UserMailbox.
        + CategoryInfo          : NotSpecified: (exoip.local/Company/I...Jon Smith:ADObjectId) [Enable-RemoteMailbox], DataValidationException
        + FullyQualifiedErrorId : [Server=EX01-2019,RequestId=0a83a0bb-6893-4768-8be7-d23f6f65413f,TimeStamp=14-1-2021 18:43:16] [FailureCategory=
       Cmdlet-DataValidationException] 228B08D6,Microsoft.Exchange.Management.RecipientTasks.EnableRemoteMailbox
        + PSComputerName        : ex01-2019.exoip.local

    Database is mandatory on UserMailbox.
        + CategoryInfo          : NotSpecified: (exoip.local/Company/I...Jon Smith:ADObjectId) [Enable-RemoteMailbox], DataValidationException
        + FullyQualifiedErrorId : [Server=EX01-2019,RequestId=0a83a0bb-6893-4768-8be7-d23f6f65413f,TimeStamp=14-1-2021 18:43:16] [FailureCategory=
       Cmdlet-DataValidationException] 27A58729,Microsoft.Exchange.Management.RecipientTasks.EnableRemoteMailbox
        + PSComputerName        : ex01-2019.exoip.local
    ```

1. Start Active Directory Users and Computers (ADUC) on the on-premises server. Click on **View** and enable **Advanced Features**.
2. Find the user object and open its properties. Click the **Attribute Editor** tab. Find the attribute `msExchHomeServerName` and click **Edit**.
3. Click on **Clear**. The value will be changed to `<not set>`. Click **OK**.
4. Force sync Entra Connect before running the `Enable-RemoteMailbox` cmdlet again.

!!! note

    [This article](https://martinsblog.dk/enable-remotemailbox-exchangeguid-is-mandatory-on-usermailbox/) adds that you should clear any entry beginning with "msExch" so the values are all `<not set>`.

### This user’s on-premises mailbox hasn’t been migrated to Exchange Online...

When you create a new user in on-premise AD and sync to Entra ID, you might get the following message:

```
This user's on-premises mailbox hasn't been migrated to Exchange Online. 
The Exchange Online mailbox will be available after migration is completed.
```

This occurs when `msExchMailboxGuid` is set for the user object in AD. Therefore, Exchange Online will report that the mailbox has not been migrated yet and will not provision a mailbox for the user.

1. Start Active Directory Users and Computers (ADUC) on the on-premises server. Click on **View** and enable **Advanced Features**.
2. Find the user object and open its properties. Click the **Attribute Editor** tab. Find the attribute `msExchMailboxGuid` and click **Edit**.
3. Click on **Clear**. The value will be changed to `<not set>`. Click **OK**.
4. Do the same for the `msExchRecipientDisplayType` and `msExchRecipientTypeDetails` attributes.
5. Delete the user from M365 and re-sync
    1. Move the user to an OU that is not synced with Entra ID.
    2. Perform a delta sync with `Start-ADSyncSyncCycle -PolicyType delta`.
    3. In the 365 admin center, check that the user appears in **Users** > **Deleted**.
    4. Permanently delete the user from the Deleted Users list (Delete permanently button).
    5. Move the user back to the original Entra synced OU and perform another delta sync.

<https://techpress.net/this-users-on-premises-mailbox-hasnt-been-migrated-to-exchange-online/>

# References

:material-microsoft: [On Provisioning Mailboxes in Exchange Online When in Hybrid](https://techcommunity.microsoft.com/blog/exchange/on-provisioning-mailboxes-in-exchange-online-when-in-hybrid/1406335)<br>
:material-microsoft: [New-RemoteMailbox](https://learn.microsoft.com/en-us/powershell/module/exchange/new-remotemailbox?view=exchange-ps)<br>
:material-microsoft: [Enable-RemoteMailbox](https://learn.microsoft.com/en-us/powershell/module/exchange/enable-remotemailbox?view=exchange-ps)<br>
:material-microsoft: [Demystifying Exchange Online Provisioning: 30 day grace period](https://techcommunity.microsoft.com/blog/exchange/demystifying-exchange-online-provisioning-architecture-exchange-object-types-and/4204206)