# Logging

## Show events <small>(CLI)</small> { data-toc-label="Show events" }

!!! info "The minimum role required to use these commands is `monitor`."

Syntax: `show events [a|b|both|error]`

=== "Parameters" 

    - `detail`: Optional. Shows additional information and recommended actions for displayed events.
    - `from <timestamp>`: Optional. Shows events that occurred on or after a timestamp specified with the format MMDDYYhhmmss.
    - `from-event <event-ID>`: Optional. Shows events including and after the specified event ID.
    - `last`: Optional. Shows the latest specified number of events. If this parameter is omitted, all events are shown.
    - `logs <yes|no>`
        - No: Lists events as described in the Output section, below. This is the default.
        - Yes: Shows events in tabular format, with columns for event ID, date and time, event code, severity, and message.
    - `to <timestamp>`: Optional. Shows events that occurred on or before a timestamp specified with the format MMDDYYhhmmss.
    - `to-event <event-ID>`: Optional. Shows events before and including the specified event ID.

=== "Filter parameters"

    - `a`: Shows events from controller A only.
        - Do not use with `from-event` or `to-event`.
    - `b`: Shows events from controller B only.
        - Do not use with `from-event` or `to-event`.
    - `both`: Shows events from both controllers.
        - Do not use with `from-event` or `to-event`.
    - `error`: Shows only warning, error, and critical events.

=== "Output"

    - Date and time when the event was logged.
    - Event code identifying the type of event to help diagnose problems. Example: `[3]`
    - Event ID prefixed by A or B, indicating which controller logged the event. For example: `#A123`
    - Model, serial number, and ID of the controller module that logged the event.
    - Severity. Possible values are:
        - `Critical`: A failure occurred that may cause a controller to shut down. Correct the problem *immediately*.
        - `Error`: A failure occurred that may affect data integrity or system stability. Correct the problem as soon as possible.
        - `Warning`: A problem occurred that may affect system stability but not data integrity. Evaluate the problem and correct it if necessary.
        - `Informational`: A configuration or state change occurred, or a problem occurred that the system corrected. No action is required.
        - `Resolved`: A condition that caused an event to be logged has been resolved.

!!! example annotate "Examples"

    - `show events last 2` (1)
    - `show events last 3 error` (2)
    - `show events from 043023235900 to 050223115900` (3)
    - `show events from-event a100 to-event a123` (4)
    - `show events from-event A2264 to-event A2264 detail` (5)

1. Show last two events
2. Show last three non-informational events
3. Show event from 4/30/2023 at 11:59:00 pm to 5/02/2023 at 11:59:00 am
4. Show a range of events logged by controller A
5. Show detailed output for a specific event

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4024/me4_series_cli_pub/show-events?guid=guid-9179f911-1376-4d04-bb13-4ff02101d79b&lang=en-us)

## Download system logs

1. In the PowerVault Manager, prepare to use FTP:
      1. Determine the network-port IP addresses of the system controllers. (Defaults: A-10.0.0.2/B-10.0.0.3, or whatever you configured)
      2. Verify that the FTP/SFTP service is enabled on the system. (Action > System Settings System Services tab)
      3. Verify that the user you plan to use has manage role permissions and FTP/SFTP interface permissions.
2. Open a Command Prompt (Windows) or a terminal window (UNIX) and go to the destination directory for the log file.
      - `ftp <controller-network-address>`
3. Log in as a user that has permission to use the FTP/SFTP interface.
4. Get the logs:
      - `get logs <filename.zip>` where *`<filename>`* is the file that contains the logs. 
5. Wait for `Operation Complete` to appear.
6. Quit FTP session. 

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/download-system-logs?guid=guid-35296596-b4c6-4e7e-9249-d178538b402d&lang=en-us)

## Configure remote syslog notifications

1. In either the Home topic of System topic, select **Action** > **System Settings**, then click **Notifications**.
2. Select the **Syslog** tab.
3. Configure teh Syslog options.
4. Save your settings by clicking **Apply**.
5. Click **OK** on the confirmation panel that appears.
6. Click **Test Syslog**. A test event is sent to the syslog server.
7. Verify that the test notification reach the syslog server.
8. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/configure-remote-syslog-notifications?guid=guid-6d66c817-8556-46fa-8bce-e9c38d1b5108&lang=en-us)
