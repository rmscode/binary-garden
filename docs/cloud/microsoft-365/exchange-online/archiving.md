# Cloud-Based Archives in Exchange Hybrid

!!! info "[Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#mailbox-storage-limits)"

## Auto-Expanding Archiving { data-toc-label="Auto-Expanding Archiving" }

Auto-expanding archiving is a feature available in Business Premium, E3 and E5 that provides up to 1.5 TB of additional storage in archive mailboxes. When the storage quota in the archive is reached, the size of the archive is automatically and incrementally expanded until it reaches 1.5 TB.

The initial archive warning quota is 90 GB. When this quota is reached, and auto-expanding archiving is enabled with a hold or retention policy applied to the mailbox, the archive size increases to 110 GB and the warning quota increases to 100 GB. The archive will continue to expand incrementally in this manner until it reaches the maximum size of 1.5 TB.

It can take up to 30 days for the additional storage to be provisioned.

!!! note "Requesting to expand the archive ahead of time"

    When you need to move large amounts of data into an archive in order to shrink the primary on-prem mailbox in order to proceed with migration to the cloud, waiting on the auto-expanding archive to provision additional storage can be a problem. In this case, you may be able to give Microsoft a call and request that they expand the archive(s) ahead of time. You can read more about how to accomplish this [here](https://web.archive.org/web/20230330103852/https://newsignature.com/articles/how-to-migrate-archive-mailboxes-over-100gb-to-exchange-online/).

### Enable

!!! info 

    In an Exchange hybrid deployment, you can't use the `Enable-Mailbox -AutoExpandingArchive` cmdlet to enable auto-expanding archiving for a specific user whose primary mailbox is on-prem and whose archive mailbox is cloud-based. Instead, you must enable the feature for the entire organization. Once enabled globally, it can not be turned off.

1. [Connect to Exchange Online PowerShell](exo-powershell.md#usage).
2. Run the following command:
```powershell
Set-OrganizationConfig -AutoExpandingArchiveEnabled $true
```
3. [Disconnect from Exchange Online PowerShell](exo-powershell.md#usage).

## Configure a Cloud Based Archive for a Primary On-Premises Mailbox or an Online Mailbox { data-toc-label="Configure Cloud Based Archives" }

### With Exchange Admin Center <small>(EAC)</small> { data-toc-label="With EAC" }

1. Microsoft 365 admin center > **Users** > **Active users**, and select the a user account.
2. On the user properties page, click **Edit** in the **Product licenses** section.
3. Under the **Location** drop-down, select a location.
4. Expand the list of licenses, and then assign an Exchange Online Archiving license. Save.
    - **NOTE**: When signed in to my test tenant, this looked very different. Selecting a user made a flyout appear on the right side of the screen. Licenses are located in the **Licenses and apps** section.
5. In the on-prem EAC, go to **Recipients** > **Mailboxes**, and select the user that you assigned a license to.
6. In the details pane, enable **In-Place Archive**.
7. Select **yes** to enable the In-Place Archive if its an online mailbox or if its an on-prem mailbox, on the **Create in-place archive** page, click **Cloud-based archive**.
8. Wait up to 30 minutes for directory synchronization to create the cloud-based archive mailbox.

### With Exchange Management Shell <small>(EMS)</small> { data-toc-label="With EMS" }

```powershell
Enable-Mailbox -Identity jsmith@nep.com -RemoteArchive -ArchiveDomain "nep.mail.onmicrosoft.com"
```

### Move Items to Archive

Use [retention policies in Microsoft Purview](../purview/dlm.md) to move items to the archive.

## References

:material-microsoft: [Enable auto-expanding archiving for your entire organization](https://learn.microsoft.com/en-us/purview/enable-autoexpanding-archiving#enable-auto-expanding-archiving-for-your-entire-organization)<br>
:material-microsoft: [Create a cloud-based archive in an Exchange hybrid deployment](https://learn.microsoft.com/en-us/exchange/hybrid-deployment/create-cloud-based-archive)<br>
