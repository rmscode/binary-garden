# OS9 CLI Fundamentals

## Exit a Mode or Sub-Mode

To exit a mode or its sub-mode and return to the previous mode, use the `exit` command.

## Return to EXEC PRivilege Mode

To return to the EXEC Privilege mode from *any* mode, use the `end` command.

## The `do` Command

You can enter an EXEC mode command from any CONFIGURATION mode (CONFIGURATION, INTERFACE, SPANNING TREE, and so on.) without having to return to EXEC mode by preceding the EXEC mode command with the `do` command. This is useful for running `show` commands or saving the configuration without exiting the CONFIGURE mode.

```shell
DellEMC(conf)# do show system brief
```

## Undoing Commands

When you enter a command, the command line is added to the running configuration file (running-config).

To disable a command and remove it from the running-config, enter the `no` command, then the original command. For example, to delete an IP address configured on an interface, use the `no ip address` command.

```shell
DellEMC(conf)# interface tengigabitethernet 1/17
DellEMC(conf-if-te-1/17)# ip address 192.168.10.1/24
DellEMC(conf-if-te-1/17)# show config
!
    interface TenGigabitEthernet 1/17
    ip address 192.168.10.1/24
no shutdown
DellEMC(conf-if-te-1/17)# no ip address
DellEMC(conf-if-te-1/17)# show config
!
interface TenGigabitEthernet 1/17
    no ip address
    no shutdown
```
## Obtaining Help

Obtain a list of keywords and a brief functional description of those keywords at any CLI mode using the `?` or `help` command:

- To list the keywords available in the current mode, enter `?` at the prompt or after a keyword.
- Enter `?` after a command prompt to list all of the available keywords. The output of this command is the same as the help command.
- Enter `?` after a partial keyword to list all of the keywords that begin with the specified letters.
- Enter `[space]``?` after a keyword lists all of the keywords that can follow the specified keyword.

## Entering and Editing Commands

- The CLI is **not** case-sensitive.
- You can enter partial keywords.
- The TAB key auto-completes keywords.
- The UP and DOWN arrow keys scroll through the command history.

??? tip "Short-Cut Key Action Combinations"

    - `CTRL + A` moves the cursor to the beginning of the command line.
    - `CTRL + B` Moves the cursor back one character.
    - `CTRL + D` Deletes character at cursor.
    - `CTRL + E` Moves the cursor to the end of the command line.
    - `CTRL + F` Moves the cursor forward one character.
    - `CTRL + I` Completes a keyword.
    - `CTRL + K` Deletes all characters from the cursor to the end of the command line.
    - `CTRL + N` Return to more recent commands in the history buffer after recalling commands with CTRL-P or the UP arrow key.
    - `CTRL + P` Recalls commands, beginning with the last command.
    - `CTRL + R` Re-enters the previous command.
    - `CTRL + U` Deletes the line.
    - `CTRL + W` Deletes the previous word.
    - `CTRL + X` Deletes the line.
    - `CTRL + Z` Ends continuous scrolling of a command outputs.
    - `ESC + B` Moves the cursor back one word.
    - `ESC + F` Moves the cursor forward one word.
    - `ESC + D` Deletes all characters from the cursor to the end of the word.

## Filtering `show` Command Output

Filter the outpout of a `show` command to display specific information by piping (`|`) `except`, `find`, `grep`, `no-more`, or `save` + *`specified_text`* after the command.

The variable `specified_text` is the text for which you are filtering and it **IS** case sensitive unless you use the `ignore-case` sub-option.

!!! info 

    Dell EMC Networking OS accepts a space or no space before and after the pipe. To filter a phrase with spaces, underscores, or ranges, enclose the phrase with double quotation marks.

- `grep` Displays only the lines containing specified text.
- `except` Displays text that does not match the specified text.
- `find` Displays the output of the `show` command beginning from the first occurrence of specified text.
- `display` Displays additional configuration information.
- `no-more` Dsiplays the output all at once rather than one screen at a time. This is similar to the `terminal length` command except that the `no-more` option affects the output of the specified command only.
- `save` Copies the output to a file for future reference.

!!! info 

    You can filter a single command output multiple times. The save option must be the last option entered. For example:
    `command | grep regular-expression | except regular-expression | grep other-regular-expression | find regular-expression | save`

## View Command History

The `command-history` trace feature captures all commands entered by all users of the system with a time stamp and writes these messages to a dedicated trace log buffer. To view the `command-history` trace, use the `show command-history` command.