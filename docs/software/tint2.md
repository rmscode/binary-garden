# Tint2

A simple panel/taskbar specifically made for Openbox, but also works well with other X window managers.

## Installation

Most distributions maintain a version in their repositories. For example, on Debian/Ubuntu, you can install it with:

```bash
sudo apt install tint2
```

## Starting tint2

Execute `tint2` from a terminal or if you're using Openbox, add `(sleep 2s && tint2) &` to `$HOME/.config/openbox/autostart` for it to start automatically when you log in.

## Configuration

The configuration file can be found in `$HOME/.config/tint2/tint2rc` and the command `killall -SIGUSR1 tint2` can be used to force reload the config after changes are made.

There are many options. The official docs are [here](https://gitlab.com/o9000/tint2/blob/master/doc/tint2.md).