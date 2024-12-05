# Exchange Migration

There are three types of email migrations that can be made from an Exchange Server, but the only one of them is suitable for Exchange Server 2019: Hybrid.

This type of migration will allow you to maintain both on-premises and online mailboxes for a gradual migration of your users to the could.

# Hybrid Migration

## Flavors

- **Full**: Best for large organizations with many thousands of mailboxes.
- **Minimal**: Best for medium-sized organizations that have a few hundred to a couple thousand mailboxes.
- **Express**: Best for small organizations that want to finish migration within a couple weeks. No advanced features are available. If you have a need to keep directory sync in place, this is not the option for you.

### Express

<https://techcommunity.microsoft.com/blog/exchange/new-exchange-online-migration-options/606109>

**Benefits**:

- Usernames/Password wil sync from on-prem.
- Users will not have to recreate Outlook profiles.
- Mail flow will continue to work between users before, during and after the migration.
- There is essentially no down time.