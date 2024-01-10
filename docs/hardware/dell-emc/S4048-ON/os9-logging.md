# Logging

Dell EMC Networking OS tracks changes in the system using event and error messages.

By default, these messages are logged:

- The internal buffer
- Console and terminal lines
- Any configured syslog servers

To display the internal logging buffer, use the `show logging` command. 

## Audit and security logging

Audit and security logging can be enabled to monitor configuration changes or to determine if these changes affect the operation of the system in the network. Audit and security events are logged to a system log server, using the `logging extended` command in CONFIGURATION mode.

This command is available with or without RBAC (Role Based Access Control) enabled. If RBAC is enabled, the command is available only to system administrators.

=== "Audit logs"

    - User logins to the switch.
    - System events for network issues or system issues.
    - Users making configuration changes. The switch logs who made the configuration changes and the date and time of the change. However, each specific change on the configuration is not logged. Only that the configuration was modified is logged with the user ID, date, and time of the change.
    - Uncontrolled shutdown.

=== "Security logs"

    - Establishment of secure traffic flows, such as SSH.
    - Violations on secure flows or certificate issues.
    - Adding and deleting of users.
    - User access and configuration changes to the security and crypto parameters (not the key information but the crypto configuration).

## Configuring a syslog server

!!! abstract "ToDo"

    The steps to configure a UNIX system as a syslog server needs to be documented. May be possible to send to ELK.

    Ubuntu and other debian based distros use rsyslog: The line `local7.debugging /var/log/ftos.log` can be added to `/etc/rsyslog.conf `.

    <https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/send-system-messages-to-a-syslog-server?guid=guid-946901e8-4982-4043-90a1-1ec72d1ec25c&lang=en-us>