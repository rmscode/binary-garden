# Group Policy Preferences

Group policy preferences are comprised of initial configurations that can be changed by an end userr. For example, a GPO preference can create a shortcut on the user's desktop but allow the user to delete it if they want to. GPO preferences differ from policy settings because users cannot modify the policy settings.

GPO preferences are typically used for things like:

- Mapping network drives
- Installing helpful, but not required software
- Wallpaper/screen saver settings
- Desktop shortcuts

## Item-Level Targeting

GPO preferences include a filtering option called "Item-Level targeting". This gives you granular control over what objects (users or computers) the GPO applies to.

Examples:

- Tartget computers with a specific OS
- Target computers by IP
- Target a security group

## Create a GPO preference with Item-Level targeting

In this example, we'll create a new GPO preference that adds a desktop shortcut. We'll also use item-level targeting to apply the GPO to a security group.

1. Create and link a new GPO
2. Edit the GPO and browse to User Configuration > Preferences > Windows Settings
3. Right-Click "Shortcuts", select "New" and then "Shortcut"
4. Click on the "Common" tab and select "Item-level targeting"
5. Click on the "Targeting..." button
6. Select "New Item" > "Security group"
7. Select the group you want to target and click OK