# Entra Security

## Security Defaults

Security defaults are pre-configured security settings enabled by default in Entra ID tenants created on or after October 22, 2019. They are designed to provide a basic level of security for all users and include:

- Requiring users to register for multi-factor authentication
- Requiring administrators to do multi-factor authentication
- Requiring users to do multi-factor authentication when necessary
- Blocking legacy authentication protocols
- Protecting privileged activities like access to the Azure portal

Microsoft recommends them for organizations that don't know where to start with security or those using the free tier of Entra ID licensing. Organizations with Entra ID P1 or P2 licensing that have complex security requirements should consider [Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common) instead.

### Enable or Disable

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Browse to **Identity** > **Overview** > **Properties**.
3. Select **Manage security defaults** at the bottom of the page.
4. Set **Security defaults** to **Enabled** or **Disabled**.
5. Select **Save**.

!!! warning "Legacy Protocols"

    When enabled, authentication requests made by an older protocol will be blocked. Security defaults also blocks Exchange Active Sync basic authentication. Before you enable security defaults, make sure your administrators aren't using older authentication protocols. For more information, see How to [move away from legacy authentication](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication).

!!! info "Revoking active tokens"

    After enabling, administrators should revoke all existing tokens to require all users to register for multi-factor authentication. This revocation event forces previously authenticated users to authenticate and register for multi-factor authentication. This task can be accomplished using the [`Revoke-AzureADUserAllRefreshToken`](https://learn.microsoft.com/en-us/powershell/module/azuread/revoke-azureaduserallrefreshtoken) PowerShell cmdlet.

!!! info "Per-User MFA"

    If your organization previously used per-user MFA, those users will continue to have MFA enabled or enforced. For all other users, disabling security defaults will remove the requirement for MFA.

## Conditional Access

Conditional Access is Microsoft's [Zero Trust policy engine](https://learn.microsoft.com/en-us/security/zero-trust/deploy/identity). It takes signals from various sources into account when enforcing policy decisions.

*Entra ID P1 licenses required. Customers with Microsoft 365 Business Premium licenses also have access to Conditional Access features.*

*Risk-based policies require access to [Microsoft Entra ID Protection](https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection), which requires P2 licenses.*

### Creating Policies

View and create Conditional Access policies in the Entra Admin Center under **Identity** > **Protection** > **Conditional Access**.

Policies are highly configurable and require careful planning to ensure that they do not inadvertently block legitimate access or create a poor user experience. It is recommended to test policies in a controlled manner before rolling them out broadly. Also, Microsoft has a small library of templates that you can create policies from. 

For example, follow these steps to create a policy to require MFA for all users:

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Browse to **Identity** > **Protection** > **Conditional Access** > **Overview**, select **Create new policy from templates**.
3. Under **Secure Foundation**, select **Require multi-factor authentication for all users**.
4. Select **Review + create**.
5. Review the information and then select **Create**.

## [Emergency Access Accounts](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)

!!! info 

	Emergency Access Accounts, also called "Break Glass" accounts, are vital to prevent being accidentally locked out of your Microsoft Entra organization. Microsoft suggests creating at least 2 Emergency Access Accounts. They do not need to be licensed.
	
	Also, emergency access accounts **should NOT be synchronized** from your on-prem directory. This is true for any account assigned a privileged role in Entra since a compromised Active Directory or Entra Connect server could lead to the takeover of a synchronized user account in Entra. Not only is this considered best practice within the IT/SysAdmin community, [Microsoft directly mentions it in their documentation](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices#9-use-cloud-native-accounts-for-microsoft-entra-roles).
	
	Good read: [Abuse of Microsoft Entra Connect Sync Service Account](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/main/AADCSyncServiceAccount.md)

1. Create new accounts with the Global Administrator role.
	- **NOTE**: We all know that security through obscurity is really no security at all, but naming these accounts "breakglass", or anything similar in that regard, just enables them to be enumerated instantly.
2. Select a passwordless authentication method that satisfies the [mandatory MFA requirements](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication?tabs=dotnet#accounts).
	- Passkey (FIDO2)
	- Certificate-based authentication.
3. Configure the account per the following requirements:
	- Not to be associated with any individual user in the organization.
	- [Creds are stored in a known secure location](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access#store-account-credentials-safely) and not connected with any employee-supplied devices.
	- Use strong authentication that doesn't use the same methods as your other admin accounts.
	- The device or credential must not expire or be in scope of automated cleanup due to lack of use.
	- Make the Global Administrator role assignment active permanent rather than eligible.
	- Access the accounts from designated secure workstations. See [deploying a privileged access solution](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-deployment).
4. Require [phishing-resistant MFA](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-admin-phish-resistant-mfa).
5. [Monitor sign-in and audit logs](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access#monitor-sign-in-and-audit-logs).
6. [Validate accounts regularly](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access#validate-accounts-regularly)