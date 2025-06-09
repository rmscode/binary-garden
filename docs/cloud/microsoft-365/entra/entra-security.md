# Security Defaults & Conditional Access

## Security Defaults

Security defaults are preconfigured security settings enabled by default in Entra ID tenants created on or after October 22, 2019. They are designed to provide a basic level of security for all users and include:

- Requiring users to register for multifactor authentication
- Requiring administrators to do multifactor authentication
- Requiring users to do multifactor authentication when necessary
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

    After enabling, administrators should revoke all existing tokens to require all users to register for multifactor authentication. This revocation event forces previously authenticated users to authenticate and register for multifactor authentication. This task can be accomplished using the [`Revoke-AzureADUserAllRefreshToken`](https://learn.microsoft.com/en-us/powershell/module/azuread/revoke-azureaduserallrefreshtoken) PowerShell cmdlet.

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
3. Under **Secure Foundation**, select **Require multifactor authentication for all users**.
4. Select **Review + create**.
5. Review the information and then select **Create**.

