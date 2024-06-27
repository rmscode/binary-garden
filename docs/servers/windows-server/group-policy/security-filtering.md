# Group Policy Security Filtering

Group policy security filtering allows you to control what users and computers a GPO is applied to. Each GPO has a security filtering section in the "Scope" tab and by default, all authenticated users have the right to apply the GPO.

## Exclude users from a GPO using security filtering

1. Select a GPO and click the "Delegation" tab on the right.
2. Click the "Advanced..." button in the lower right of the window.
3. Click the "Add..." button and add your security group.
4. Under permissions, select "Deny" for "apply group policy"

## Apply a GPO to specific Users or Computers with security filtering

1. Create a security group for the users or computers
2. Go to the desired GPO and then Security Filtering (Remember, bottom pane of the "Scope" tab when you click on the GPO)
3. Click "Add..." and select your group
4. Now click on the "Delegation" tab and then the "Advanced..." button
5. For “Authenticated Users” uncheck “Apply group policy”. But make sure “read” is still checked.