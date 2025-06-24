# Remote Mailbox Moves <small>(Hybrid Migration)</small>

Remote mailbox moves are used to migrate mailboxes between on-premises Exchange and Exchange Online in a hybrid deployment.

## Move with Exchange Online PowerShell { data-toc-label="Move with PowerShell" }

[Download and install](https://learn.microsoft.com/en-us/powershell/exchange/exchange-online-powershell-v2?view=exchange-ps#install-and-maintain-the-exchange-online-powershell-module) the module.

```powershell title="Connecting to Exchange Online PowerShell"
Connect-ExchangeOnline -UserPrincipalName admin@nep.com
```

<small>*This is an interactive login. A new window will open where you can sign in to your Exchange Online admin account.*</small>

```powershell title="Disconnecting from Exchange Online PowerShell"
Disconnect-ExchangeOnline -Confirm:$false
```

<small>*Always remember to disconnect your session when you're done. Closing the PowerShell window is not enough.*</small>

### Move Single Mailbox

```powershell title="1. Find migration endpoint remote server URL"
Get-MigrationEndpoint | Format-List Identity, RemoteServer
```

<small>*Copy the **RemoteServer URL** value from the output. You will need it for `-RemoteHostName` in the next step.*</small>

```powershell title="2. Move mailbox to Exchange Online"
New-MoveRequest -Identity "jsmith@nep.com" -Remote -RemoteHostName "mail.nep.com" -TargetDeliveryDomain "nep.mail.onmicrosoft.com" -RemoteCredential (Get-Credential)
```

<small>*`-RemoteCredential` is your on-premises admin account.*</small>

### Move Many Mailboxes

!!! note

    The benefit of creating multiple mailbox moves this way instead of using `New-MigrationBatch` (or EAC) is that it is supposedly faster since there is no arbitration mailbox involved. If you want finer control over scheduling and reporting of the migration process, create a migration batch instead.

    "[Exchange Hybrid Migrations: More Than Just a Pretty Face](https://techcommunity.microsoft.com/blog/exchange/exchange-hybrid-migrations-more-than-just-a-pretty-face/1623109)" is the first in a five-part series that explains hybrid migrations in depth, including when the arbitration mailbox is used.

1. Create a CSV file that contains a single column with the email addresses for the mailboxes that will be moved. The header for this column must be named `EmailAddress`.
2. Connect to Exchange Online PowerShell and use the following script:

```powershell
$Mailboxes = Import-Csv "C:\migration\mailboxes.csv"
$RemoteHostName = "mail.nep.com"
$TargetDeliveryDomain = "nep.mail.onmicrosoft.com"
$OnPremCred = (Get-Credential)

foreach ($Mailbox in $Mailboxes) {
    $params = @{
        Identity             = $Mailbox.EmailAddress
        Remote               = $true
        RemoteHostName       = $RemoteHostName
        TargetDeliveryDomain = $TargetDeliveryDomain
        RemoteCredential     = $OnPremCred
    }
    New-MoveRequest @params
}
```

!!! tip "Export email addresses to CSV using the EAC"

    You can use the EAC to export a list of all your email addresses to a CSV file.

    Navigate to **Recipients** > **Mailboxes**. Click the more options icon (**...**) in the toolbar and click **Export data to a CSV file**. Check the box for **EMAIL ADDRESS** and click **Export**.

    Make sure you edit the CSV header to comply with the correct format mentioned above (`EmailAddress`).

#### with `New-MigrationBatch`

Connect to Exchange Online PowerShell.

```powershell title="Create a new migration endpoint"
$MigrationEndpointOnPrem = New-MigrationEndpoint -ExchangeRemoteMove -Name OnPremEndpoint -Autodiscover -EmailAddress admin@onpremdomain.com -Credentials (Get-Credential)
```
<small>This migration endpoint points to the on-prem organization as the source location of the mailboxes that will be migrated.</small>

```powershell title="Create a new migration batch"
$OnboardingBatch = New-MigrationBatch -Name RemoteOnboarding01 -SourceEndpoint $MigrationEndpointOnPrem.Identity -TargetDeliveryDomain contoso.mail.onmicrosoft.com -CSVData ([System.IO.File]::ReadAllBytes("C:\Users\Administrator\Desktop\RemoteOnBoarding1.csv"))
```

<small>The CSVData parameter specifies the CSV file that contains information about the user mailboxes to be moved or migrated. The required attribute in the header row of the CSV for this type of migration is `EmailAddress` (same as in section above). For more information, see [CSV files for mailbox migration](https://learn.microsoft.com/en-us/exchange/csv-files-for-mailbox-migration-exchange-2013-help).</small>

```powershell title="Start the migration batch"
Start-MigrationBatch -Identity $OnboardingBatch.Identity.Name
```

### Suspend & Resume Moves

!!! tip
    
    The Suspend and Resume cmdlets can sometimes be used to fix a stuck move request.

```powershell title="Suspend a specific request"
Suspend-MoveRequest -Identity "jsmith@nep.com"
```

```powershell title="Suspend all requests that are in progress"
Get-MoveRequest -MoveStatus InProgress | Suspend-MoveRequest
```

```powershell title="Resume a specific request"
Resume-MoveRequest -Identity "jsmith@nep.com"
```

```powershell title="Resume all suspended requests"
Get-MoveRequest -MoveStatus Suspended | Resume-MoveRequest
```

### Get Move Request Status

```powershell title="Get a single move request"
Get-MoveRequest -Identity "jsmith@nep.com" | Get-MoveRequestStatistics
```

```powershell title="Get all in progress move requests"
Get-MoveRequest -MoveStatus InProgress -ResultSize Unlimited | Get-MoveRequestStatistics
```

```powershell title="Get all completed move requests"
Get-MoveRequest -MoveStatus Completed -ResultSize Unlimited | Get-MoveRequestStatistics
```

```powershell title="Get the migration progress of a batch"
Get-MigrationUser -ResultSize Unlimited -BatchId "MigrationBatch01" | Get-MoveRequestStatistics | ft -AutoSize
```

Other available statuses for `Get-MoveRequest`:

- `AutoSuspended`
- `Completed`
- `CompletedWithWarning`
- `CompletionInProgress`
- `Failed`
- `Queued`
- `Retrying`
- `Suspended`

## Move with Exchange Admin Center <small>(EAC)</small> { data-toc-label="Move with EAC" }

1. In the on-premises EAC, got to **Home** > **Migration**.
2. Select **Add migration batch**.
3. On the **Add migration batch** page:
    1. Enter a name for the batch in the **Give migration batch a unique name** box.
    2. From the **Select the mailbox migration path** drop-down list, select **Migration to Exchange Online**.
    3. Select **Next**.
4. Select **Remote move migration** and then select **Next**.
5. On the **Prerequisites for remote migration** page, select **Next**. Confirm the endpoint.
6. On the Add user mailboxes page:
    1. Select **Manually add users to migrate**.<br>
    !!! info "To migrate mailboxes in bulk, select the **Migrate from CSV file** option. See [here](https://learn.microsoft.com/en-us/exchange/mailbox-migration/csv-files-for-migration) for more info."
    2. Enter the name of email address of the user whose mailboxes you want to migrate.
    3. Select the mailboxes that you want to move to Exchange Online and then select **Next**.<br>
    !!! info "If shared mailbox accounts don't appear in the user selection list, you need to sync the shared mailbox on-premises AD accounts to Microsoft 365 or Office 365 by using cloud sync or Microsoft Entra Connect. The shared mailbox AD accounts appear as blocked accounts in the Microsoft 365 admin center and you can select them from the user list."
7. Select a target delivery domain and then click **Next**.
8. On the **Schedule batch migration** page:
    1. In the search box under **After the batch is complete, a report will be sent to the following recipients**, you must select at least one recipient to receive this report.
    2. Select the desired option for starting the migration batch.
    3. Select the desired option ending the migration batch.<br>
    !!! info "If you select to manually complete the batch later, ExO will only sync 95% of each mailbox in that batch. ExO periodically syncs the batch to keep each mailbox at 95% synchronization until the batch is manually completed."
9. Select a timezone and select **Save**.
10. Select **Done**.
11. Select your migration batch from the **Migration batches** page and select **Resume migration**.
12. Select **Confirm** and close the page that displays the notification message **Operation successful**.

## Remove Completed Migration Batches & Move Requests { data-toc-label="Remove Completed Moves" }

Completed move requests can be removed to clean up the mailbox move history. Completed migration batches should be removed to minimize the likelihood of errors if the same users are moved again...According to Microsoft anyway.

### Remove with EAC

1. Go to **Home** > **Migration**. The **Migration batches** page appears.
2. Select a completed migration batch that has the value **Completed** under the column titled **Status**. The dialog containing the details of the migration batch displays.
3. Select the **Delete** icon on the dialog. A prompt displays, seeking confirmation of whether the user wants to delete the migration batch.
4. Select **Confirm**. A notification message that reads **Operation successful** is displayed, indicating that the migration batch has been successfully deleted.

### Remove with PowerShell

```powershell title="Remove completed move requests"
Get-MoveRequest -MoveStatus Completed -ResultSize Unlimited | Remove-MoveRequest
```

```powershell title="Remove completed migration batches"
Get-MigrationBatch -Status Completed -ResultSize Unlimited | Remove-MigrationBatch
```

#### when removing a completed move request fails

According to an [Ali Tajran article](https://www.alitajran.com/remove-move-request-fails-in-exchange-server/), this can happen if users are recreated, deleted, or moved to another OU in AD before the move request is cleared. The solution is to remove the completed request by using the `-MailboxGuid` parameter.

## References

:material-microsoft: [*Move Mailboxes Using PowerShell*](https://learn.microsoft.com/en-us/exchange/hybrid-deployment/move-mailboxes-using-powershell#use-powershell-to-move-mailboxes)<br>
:material-microsoft: [*Exchange PowerShell*](https://learn.microsoft.com/en-us/powershell/module/exchange/?view=exchange-ps)<br>
:material-microsoft: [*Exchange Online PowerShell*](https://learn.microsoft.com/en-us/powershell/exchange/exchange-online-powershell?view=exchange-ps)<br>
:material-microsoft: [*Connect to Exchange Online PowerShell*](https://learn.microsoft.com/en-us/powershell/exchange/connect-to-exchange-online-powershell)<br>
:material-microsoft: [*New-MigrationBatch*](https://learn.microsoft.com/en-us/powershell/module/exchange/new-migrationbatch?view=exchange-ps)<br>
:material-microsoft: [*Use the EAC to move mailboxes*](https://learn.microsoft.com/en-us/exchange/hybrid-deployment/move-mailboxes-using-eac#use-the-eac-to-move-mailboxes)<br>
:material-microsoft: [*Get-MoveRequest*](https://learn.microsoft.com/en-us/powershell/module/exchange/get-moverequest?view=exchange-ps)<br>
:material-microsoft: [*Get-MigrationBatch*](https://learn.microsoft.com/en-us/powershell/module/exchange/get-migrationbatch?view=exchange-ps)<br>
:material-microsoft: [*Remove Completed Migration Batches*](https://learn.microsoft.com/en-us/exchange/hybrid-deployment/remove-completed-migration-batches)<br>
:material-microsoft: [*Remove-MoveRequest*](https://learn.microsoft.com/en-us/powershell/module/exchange/remove-moverequest?view=exchange-ps)<br>
:material-microsoft: [*Remove-MigrationBatch*](https://learn.microsoft.com/en-us/powershell/module/exchange/remove-migrationbatch?view=exchange-ps)
