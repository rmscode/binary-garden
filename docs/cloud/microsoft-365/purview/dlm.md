# Data Lifecycle Management in Microsoft Purview

Data Lifecycle Management <small>(DLM)</small> in Microsoft Purview helps organizations manage their data throughout its lifecycle, from creation to deletion. It provides tools and features to classify, protect, and govern data across various sources and environments.

## Exchange <small>(legacy)</small>

!!! info 

    Microsoft does not recommend using these options except for moving items from a primary mailbox to an archive mailbox and applying retention or deletion settings to default folders.

### Messaging Records Management <small>(MRM)</small> Retention Tags { #mrm-retention-tags data-toc-label="MRM Retention Tags" }

#### Managing retention tags:

!!! info 

    There are several pre-configured tags from Microsoft that probably already cover most of your needs. You can use them as is, edit them, or create new ones.

1. Sign in to the [Microsoft Purview compliance portal](https://purview.microsoft.com/).
2. Navigate to **Solutions** > **Data lifecycle management** > **Exchange <small>legacy</small>**, and select **MRM Retention tags**.
3. Select an existing tag and click **Edit**, or click on **+ New tag** to create a new one.
4. Follow the wizard to configure your tag.

#### with PowerShell

Connect to Exchange Online PowerShell.

```powershell title="Create a new tag"
New-RetentionPolicyTag "2 year move to archive" -Type All -RetentionEnabled $true -AgeLimitForRetention 730 -RetentionAction MoveToArchive
```

<small>This example creates a new retention tag that moves items older than 2 years to the archive for users that have an archive mailbox.</small>

```powershell title="Edit an existing tag"
Set-RetentionPolicyTag "2 year move to archive" -RetentionEnabled $false
```

<small>This example disables the tag"</small>

```powershell title="Remove a retention tag"
Remove-RetentionPolicyTag "2 year move to archive"
```

### Messaging Records Management <small>(MRM)</small> Retention Policies { #mrm-retention-policies data-toc-label="MRM Retention Policies" }

#### Managing retention policies:

!!! info

    You can update an existing policy, including the default policy, which is simpler, or create a new policy to include your tag(s).

1. Sign in to the [Microsoft Purview compliance portal](https://purview.microsoft.com/).
2. Navigate to **Solutions** > **Data lifecycle management** > **Exchange <small>legacy</small>**, and select **MRM Retention policies**.
3. Select an existing policy and click **Edit**, or click on **+ New policy** to create new one.
4. Follow the wizard to add your tag(s).

#### Assigning retention policies to user mailboxes:

1. Sign in to the [Exchange admin center](https://admin.exchange.microsoft.com/).
2. Navigate to **Recipients** > **Mailboxes**, and click on a user.
3. In the details pane, under **Mailbox**, click on **Manage mailbox policies**

#### with PowerShell

Connect to Exchange Online PowerShell.

```powershell title="Edit an existing policy"
Set-RetentionPolicy "Default MRM Policy" -RetentionPolicyTagLinks "name of tag"
```

```powershell title="Create a new policy"
New-RetentionPolicy "Auto-Archiving Policy" -RetentionPolicyTagLinks "2 year move to archive", "additional tag..."
```

```powershell title="Remove a retention policy"
Remove-RetentionPolicy "Auto-Archiving Policy"
```

```powershell title="Assign a retention policy to a user mailbox"
Get-Mailbox -Identity jsmith@nep.com | Set-Mailbox -RetentionPolicy "Auto-Archiving Policy"
```

## References

:material-microsoft: [Create a retention policy for Exchange Online](https://learn.microsoft.com/en-us/exchange/security-and-compliance/messaging-records-management/create-a-retention-policy)<br>
:material-microsoft: [Add retention tags to or remove retention tags from a retention policy in Exchange Online](https://learn.microsoft.com/en-us/exchange/security-and-compliance/messaging-records-management/add-or-remove-retention-tags)<br>
:material-microsoft: [`New-RetentionPolicyTag`](https://learn.microsoft.com/en-us/powershell/module/exchange/new-retentionpolicytag?view=exchange-ps)<br>
:material-microsoft: [`Set-RetentionPolicyTag`](https://learn.microsoft.com/en-us/powershell/module/exchange/set-retentionpolicytag?view=exchange-ps)<br>
:material-microsoft: [`Remove-RetentionPolicyTag`](https://learn.microsoft.com/en-us/powershell/module/exchange/remove-retentionpolicytag?view=exchange-ps)<br>
:material-microsoft: [`New-RetentionPolicy`](https://learn.microsoft.com/en-us/powershell/module/exchange/new-retentionpolicy?view=exchange-ps)<br>
:material-microsoft: [`Set-RetentionPolicy`](https://learn.microsoft.com/en-us/powershell/module/exchange/set-retentionpolicy?view=exchange-ps)<br>
:material-microsoft: [`Remove-RetentionPolicy`](https://learn.microsoft.com/en-us/powershell/module/exchange/remove-retentionpolicy?view=exchange-ps)