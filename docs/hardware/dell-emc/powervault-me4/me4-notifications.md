# System Notifications (Optional)

Optional, but considered best practice.

## Email Notifications

1. In the Welcome panel, select **System Settings**, and then click the **Notifications** tab. (Also found in **Action > System Settings** in Home, System or Footer)
2. Select the **Email** tab and ensure that the SMTP Server and SMTP Domain options are set.
3. To enable email notifications, select the **Enable Email Notifications** check box.
4. Select the minimum severity for which the system should send email notifications:
      1. **Critical** (only); **Error** (and Critical); **Warning** (and Error and Critical); **Resolved** (and Error, Critical, and Warning); **Informational** (all).
5. In one or more of the Email Address fields enter an email address to which the system should send notifications. Each email address can have a maximum of 320 bytes.
6. To save your settings and close the panel, click **Apply and Close**.
7. Click **OK** to save your changes.

## SNMP Trap Hosts

1. In the Welcome panel, select **System Settings**, and then click the Notifications tab. (Also found in **Action > System Settings** in Home, System or Footer)
2. Select the **SNMP** tab. If a message near the top of the panel informs you that the SNMP service is disabled, enable the service.
3. Select the minimum severity for which the system should send email notifications:
      1. **Critical** (only); **Error** (and Critical); **Warning** (and Error and Critical); **Informational/Resolved** (all); or **none**.
4. In the **Read community** field, enter the SNMP read password for your network. This password is included in traps that are sent. This string must differ from the write-community string. The value is case-sensitive and can have a maximum of 31 bytes. It can include any character except for the following: `" < >`. The default is public.
5. In the **Write community** field, enter the SNMP write password for your network. This string must differ from the read-community string. The value is case-sensitive and can have a maximum of 31 bytes. It can include any character except for the following:  `" < >`. The default is private.
6. In the **Trap Host Address** fields, enter the network addresses of hosts that are configured to receive SNMP traps. The values can be IPv4 addresses, IPv6 addresses, or FQDNs.
7. To save your settings and close the panel, click **Apply and Close**.
8. Click **OK** to save your changes.

!!! Tip "Test SNMP notification settings

    1. Configure three SNMP trap hosts to receive notifications of system events.
    2. Click Test SNMP. A test notification is sent to each configured trap host.
    3. Verify that the test notification reached the intended location.
    4. Click OK.

    If there was an error in sending a test notification, event 611 is displayed in the confirmation.