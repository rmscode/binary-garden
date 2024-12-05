# Exchange Migration

There are three types of email migrations that can be made from an Exchange Server; [Cutover](https://learn.microsoft.com/en-us/exchange/mailbox-migration/cutover-migration-to-office-365), [Staged](https://learn.microsoft.com/en-us/exchange/mailbox-migration/perform-a-staged-migration/perform-a-staged-migration), and [Hybrid](https://learn.microsoft.com/en-us/exchange/mail-migration-jump). The method that Microsoft recommends for Server 2016 with more than 150 mailboxes is Hybrid. 

!!! note

    I guess Microsoft couldn't be bothered to update their [documentation](https://learn.microsoft.com/en-us/exchange/mailbox-migration/decide-on-a-migration-path#how-do-i-decide-which-method-to-use) to include guidance for Exchange Server 2019, so we can only assume that the same guidance applies.

The Hybrid migration path seems to require, in some cases, that your on-prem server remains in place. This is because some attributes can only be managed from the on-prem server. However, it is possible to manage recipients using Windows PowerShell since Exchange 2019 CU12 as I'll explain later. The next alternative to a Hybrid migration is the Cutover migration. Microsoft only recommends Staged migration for Exchange 2003 or 2007.

## Hybrid Migration

### Full

Best for large organizations with many thousands of mailboxes and need complete integration between their on-prem Exchange organization and 365 (Busy/Free info, enhanced mail flow and more).

- Secure mail routing between on-prem and Exchange online organizations.
- Mail routing with shared domain namespace. For example, both on-prem and online orgs can use the @northeastprecast.com SMTP domain.
- A unified GAL.
- Free/Busy and calendar sharing between on=prem and online organizations.
- Centralized control of inbound and outbound mail flow.
- A single OWA URL for both on-prem and online organizations.
- The ability to move mailboxes back and forth between on-prem and online organizations.
- Centralized mailbox management using the on-prem EAC.
- Cloud-based message archiving for on-prem mailboxes.

[*Reference*](https://learn.microsoft.com/en-us/exchange/exchange-hybrid)

### Minimal

Best for medium-sized organizations that have a few hundred to a couple thousand mailboxes and want to move to the cloud quickly.

- Minimal is suited for customers that do require the following:
    - Cross-Premises Free/Busy.
    - TLS- secured mail flow between on-prem and online organizations.
    - Cross-premises eDiscovery.
    - Automatic OWA and ActiveSync redirection for migrated users.
    - Automatic retention for Archive Mailbox
- Allows for quickly moving to the cloud.

[*Reference*](https://techcommunity.microsoft.com/blog/exchange/new-exchange-online-migration-options/606109)

### Express

Best for small organizations that want to finish migration within a couple weeks. No advanced features are available. If you have a need to keep directory sync in place, this is not the option for you.

- One time directory synchronization of your users along with the Minimal Hybrid config to allow you to perform migrations.
- Mail flow will continue to work before, during and after the migration.
- There is essentially no down time for users.

[*Reference*](https://techcommunity.microsoft.com/blog/exchange/new-exchange-online-migration-options/606109)

### How and When to Decommission Your On-Prem Exchange Server in a Hybrid Deployment

When directory sync is enabled for a tenant and a user is synced from on-prem, you can't manage most attributes from Exchange Online. Instead, you must manage those attributes from on-prem. This requirement isn't due to the hybrid config, but it occurs because of directory synchronization. More information can be found [here](https://techcommunity.microsoft.com/t5/Exchange-Team-Blog/Decommissioning-your-Exchange-2010-servers-in-a-Hybrid/ba-p/597185).

!!! abstract

    That sounds pretty crappy at first, but you can use [Recipient Management Tools](https://learn.microsoft.com/en-us/exchange/manage-hybrid-exchange-recipients-with-management-tools) since Exchange 2019 CU12 *without* a running Exchange Sever. That said, it can be possible to shut down your last Exchange server and manage recipients using Windows PowerShell.

[*Reference: Microsoft*](https://learn.microsoft.com/en-us/exchange/decommission-on-premises-exchange)<br />
[*Reference: Blog Post, Andres Bohren*](https://blog.icewolf.ch/archive/2022/04/27/install-and-use-exchange-2019-cu12-recipient-management-powershell/)

## Cutover Migration

Recommended for small organizations with fewer than 150 mailboxes, but supports moving up to 2000. Cutover can be done over a weekend or a few days, but requires careful planning.

- After the migration is complete, each user who has an on-prem Exchange mailbox will also become a new user in M365, but you must still assign licenses to users whose mailboxes are migrated.
- Post-setup, admins/users must configure their desktop computers. (That was a very vague statement made by MS. I assume that they mean setting up a new Outlook profile.)

!!! note

    Microsoft notes that decommissioning Exchange can have "unintended consequences" and that you should contact Support before doing so.

    Mmkay...vague again.

[*Reference*](https://learn.microsoft.com/en-us/exchange/mailbox-migration/cutover-migration-to-office-365)