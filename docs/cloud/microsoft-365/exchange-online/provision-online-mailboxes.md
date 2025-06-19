# Provision Online Mailboxes

!!! warning "Avoid deletion of mailbox data"

    Whether a new online mailbox is provisioned or an existing on-prem mailbox is migrated to the cloud, the service will allow a period of 30 days for admins to assign the proper licensing. After this period, the mailbox and all of it contents will be deleted.
    
    Microsoft's recommendation is to ALWAYS assign a license as soon as you see the mailbox provisioned in Exchange Online and in migration scenarios even before the move is started.

!!! info ":material-microsoft: [On Provisioning Mailboxes in Exchange Online When in Hybrid](https://techcommunity.microsoft.com/blog/exchange/on-provisioning-mailboxes-in-exchange-online-when-in-hybrid/1406335)"

    While it is possible to add a user in ADUC, allow for them to sync to Entra, and then license the user in M365, the user's Exchange Online attributes will never sync back to the on-premises environment to create a "Mail-enabled User" (MEU) object. In this scenario, managing the mailboxes from the on-prem environment isn't possible and since the M365 user is synced with on-prem AD, managing attributes from the cloud is also not possible. 

    Instead, ExO mailboxes should be created from the on-prem Exchange environment (EAC/EMS). This option will create the on-prem AD user *and* the MEU object with the remote routing address (such as jsmith@contoso.mail.onmicorosot.com). AD sync can then occur to establish the appropriate objects/attributes.

    If you've already made the mistake, see [here](#enable-remotemailbox). 

## Provision with PowerShell <small>`New-RemoteMailbox`</small> { #provision-with-powershell data-toc-label="Provision with PowerShell" }

From Exchange Management Shell...

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

<https://learn.microsoft.com/en-us/powershell/module/exchange/new-remotemailbox?view=exchange-ps>

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

```powershell title="1. Connect to Exchange Online PowerShell"
Connect-ExchangeOnline -UserPrincipalName admin@nep.com
```

<small>This is an interactive login. A new window will open where you can sign in to your Exchange Online admin account.</small>

```powershell title="2. Run Enable-RemoteMailbox"
Enable-RemoteMailbox -Identity "John Smith" -RemoteRoutingAddress "jsmith@nep.mail.onmicrosoft.com" -Alias "jsmith" -DisplayName "John Smith"
```

```powershell title="3. Disconnect from Exchange Online PowerShell"
Disconnect-ExchangeOnline -Confirm:$false
```

<small>Always remember to disconnect your session when you're done. Closing the PowerShell window is not enough.</small>

```powershell title="4. Force sync Entra Connect"
Start-ADSyncSyncCycle -PolicyType Delta
```

### Error: "ExchangeGuid is mandatory on UserMailbox" { data-toc-label="Error: ExchangeGuid is Mandatory..." }

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