# Microsoft 365 MFA

## [The Scope of Microsoft's Enforcement](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication?tabs=dotnet#scope-of-enforcement)

Microsoft has or will be enforcing MFA for the following Apps/URLs:

- Phase 1 (February, October 2024):
    - Microsoft 365 Admin Center (Feb)
    - All Azure sign-in attempts (Oct)
    - Entra Admin Center (Oct)
    - InTune Admin Center (Oct)
- Phase 2 (July 1 2025):
    - Azure CLI
    - Azure PowerShell
    - Azure Mobile App
    - Infrastructure as Code tools
    - REST API endpoints

### Accounts

All users who sign into the applications listed above to perform any CRUD operation must complete MFA when the enforcement begins. Users aren't required to use MFA if they access other applications, websites, or services hosted on Azure. Each application, website, or service owner listed above controls the authentication requirements for users.

*Break glass or emergency access accounts are also required to sign in with MFA once enforcement begins.*

Workload identities, such as managed identities and service principals, aren't impacted by this MFA enforcement. User identities that are used to sign in as a service account to run automation need to sign in with MFA. User identities aren't recommended for automation. You should migrate those user identities to [workload identities](https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview).

Microsoft strongly recommends that you enforce MFA for your users via [security defaults](entra-security.md#security-defaults) or [Conditional Access](entra-security.md#conditional-access) policies in Entra ID, but its ultimately up to your company's policy. MFA can also be enabled or disabled on a [per-user basis](#per-user-mfa).

!!! info "Automatic enablement of security defaults"

    If your tenant was created on or after October 22, 2019, security defaults are already enabled.

## Authentication Methods

- Microsoft Authenticator app
- FIDO2 security keys
- Certificate-based authentication and Common Access Cards (CAC)
- Passkeys
- SMS or voice approval (not recommended)

To enable or disable the different authentication methods, browse to **Identity** > **Protection** > **Authentication methods**.

For more info, read "[*What authentication and verification methods are available in Microsoft Entra ID?*](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods)".

### Temporary Access Pass (TAP)

A TAP is a time-limited passcode that can be used to onboard passwordless authentication methods or **make recovery easier when a user loses or forgets a strong authentication method**.

!!! info

    TAPs can be created for any user, but only users included in the policy can sign-in with it.

**Configure TAP in the Authentication methods policy**:

1. Open the [Microsoft Entra ID Admin Center](https://entra.microsoft.com/).
2. In the left navigation pane, expand **Identity** > **Authentication methods** and select **Policies**.
3. Select **Temporary Access Pass** and enable.
4. Choose the users to include or exclude.
5. (Optional) Select **Configure** to adjust the TAP settings.
6. Save.

**Create a TAP**:

1. Browse to **Identity** > **Users**.
2. Select a user.
3. Select **Authentication methods** and select **Add authentication method**.
4. Select **Temporary Access Pass**.
5. Define a custom activation time or duration and select **Add**.

Users can use the TAP to update or register a method by visiting <https://aka.ms/mysecurityinfo>.

Users can also use their TAP to register Microsoft Authenticator with their account. By adding a work or school account and signing in with a TAP users can register both passkeys and passwordless phone sign-in directly from the Authenticator app.

## Enabling/Disabling MFA

MFA can be enabled and enforced via security defaults, Conditional Access policies or per-user MFA settings. [Registration campaigns](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-registration-campaign) can help nudge users to set up Microsoft Authenticator during sign-in.

MFA is enabled *and* enforced for *all* users when security defaults are turned on. To enable security defaults, see [here](entra-security.md#enable-or-disable). When security defaults are disabled, Conditional Access policies should be used. To create a policy that requires MFA, see [here](entra-security.md#creating-policies). 

### Per-User MFA

1. Open the [Microsoft Entra ID Admin Center](https://entra.microsoft.com/).
2. Browse to **Identity** > **Users** > **All users**.
3. Select **Per-User MFA** near the top of the page.
4. Select a user and perform one of the following actions:
    1. Enable MFA
    2. Disable MFA
    3. Enforce MFA

!!! info "Security defaults"

    The per-user settings supersede the MFA enforcement in security defaults. You may enable, enforce or disable MFA on a per-user basis regardless of whether the security defaults are being used or not.

## Reset User MFA

!!! info "[Temporary Access Pass](#temporary-access-pass-tap)"

    Creating a [TAP](#temporary-access-pass-tap) can make recovery easier when a user loses or forgets a strong authentication method. 

### Using Microsoft Entra ID Admin Center

1. Open the [Microsoft Entra ID Admin Center](https://entra.microsoft.com/).
2. In the left navigation pane, expand **Identity** > **Users** and click **All users**
3. Select a user from the list.
4. In the user details pane on the left, click **Authentication methods**.
5. Click **Require re-register multifactor authentication**.
6. Confirm the reset when prompted.

The next time the users signs in, they will notified that more information is required, allowing them to re-register their MFA methods.

### Using PowerShell

This is actually a bit more involved since you are required to individually remove each authentication method of the user.

```powershell title="Get authentication methods"
Get-MgUserAuthenticationMethod -UserId $userId
```

```powershell title="Remove authentication methods"
# Authenticator app
Remove-MgUserAuthenticationMethod -UserId $userId -MicrosoftAuthenticatorAuthenticationMethodId $methodId
# FIDO2
Remove-MgUserAuthenticationFido2Method -UserId $uid -Fido2AuthenticationMethodId $method.Id
# Email
Remove-MgUserAuthenticationEmailMethod -UserId $uid -EmailAuthenticationMethodId $method.Id
# Phone
Remove-MgUserAuthenticationPhoneMethod -UserId $uid -PhoneAuthenticationMethodId $method.Id
# Software OAuth
Remove-MgUserAuthenticationSoftwareOathMethod -UserId $uid -SoftwareOathAuthenticationMethodId $method.Id
# Temp Access Pass
Remove-MgUserAuthenticationTemporaryAccessPassMethod -UserId $uid -TemporaryAccessPassAuthenticationMethodId $method.Id
# Windows Hello
Remove-MgUserAuthenticationWindowsHelloForBusinessMethod -UserId $uid -WindowsHelloForBusinessAuthenticationMethodId $method.Id
```

!!! note

    The default method can only be removed when it is the last registered method, otherwise an error is displayed. `Get-MgUserAuthenticationMethod` does not identify the default method, but [@merrill](https://github.com/merill) shared a clever [script on GitHub](https://github.com/orgs/msgraph/discussions/55) that tracks when/if the error is thrown and then performs a final pass to remove the default method.

    Ruud Mens (LazyAdmin) [tweaked the script](https://github.com/ruudmens/LazyAdmin/blob/master/MsGraph/Reset-MgUserMFA.ps1) so the user ID can be passed as a parameter and to automatically connect to Microsoft Graph.

## Common Issues

=== "Not receiving verification codes"

    Microsoft might block verification codes if it detects unusual activity, excessive requests, or heavy compromised traffic coming from your location. When your account is flagged or locked for security reasons, codes will not go through until the issue is resolved.

    Make sure that your phone doesn't block texts from unknown numbers and choose **I don't have a code**. Microsoft will send another code.

    Check your junk email folder for a verification message from an @accountprotection.microsoft.com email address.

    Ensure that your phone number or email address is entered correctly.

    If your alternate email address end in @outlook.com, @hotmail.com, @live.com, or @msn.com, you're using one work or school account to verify another work or school account. This can make it tricky to keep track of which one you're signed in to. When you sign in to the second account (to get the code sent to that email), most browsers automatically sign you out of the first account (the one that's actually requesting the code). Using your browser's "Incognito" or "InPrivate" mode, sign in with the first account. This lets you stay signed in to both accounts at the same time.

=== ""Try another verification method""

    If you see this message, you may have encountered a temporary block due to unusual activity, excessive requests, or even violations of TOS.

    You can try another method, switching between Wi-Fi or cellular networks on your device, or wait. 

=== ""Lets keep your account secure""

    Seeing this usually means that your organization or Microsoft needs another way to verify your identity.

=== "Lost access to security info"

    If you know your password but have lost access to some, but not all, of your security info (like a phone or email):

    1. [Sign in](https://go.microsoft.com/fwlink/?linkid=2311958) to the **Advanced security options** page of your account.
    2. Select **Add a new way to sign in or verify**.
    3. Enter the code sent to your new number or email address and select **Next**.
    4. Select and expand the security info / verification option you have lost and select **Remove**.
    5. Select **Remove** again to confirm.

    !!! info "IMPORTANT"

    Don't change all of your security info at once or else Microsoft may restrict your account for 30 days.

=== "Unrequested verification codes"

    Someone could be trying to access you account or they accidentally entered the wrong phone/email when trying to sign in. The delivery of a previous code could have also been delayed.

    !!! info "IMPORTANT"

        Do not respond to verification codes you did not request. As long as the person trying to access your account doesn't have the code, your account is safe.

=== "Lost or stolen device"

    Sign in using a different method or ask your organization's admin to reset your MFA settings.

=== "Can't sign in after multiple attempts"

    If you've mistakenly made too many sign-in attempts, wait until you can try again, or use a different MFA method for sign-in. If you suspect someone else is trying to access your account, contact your IT administrator.