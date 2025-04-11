# iPerf 3

iPerf is an open-source benchmarking utility for measuring data transfer speeds and performance over a network.

## Initial Download and Setup

iPerf is available for various platforms. Most Linux distributions have it in their package manager. For Windows, you can download the binaries from the official website.

=== "For Windows"

    1. Visit the [iPerf3 download page](https://iperf.fr/iperf-download.php#windows).
    2. Choose one of the options to download a .zip file of the Windows binaries.
    3. Extract the contents of the .zip file to a folder of your choice.
        - Note: I usually extract utilities like this to a "tools" folder on my C drive and then add it to my PATH variable.
    4. Now you can navigate to the folder in a command prompt or PowerShell window and run the iperf3.exe.

=== "For Debian/Ubuntu"

    1. Run `sudo apt install iperf3`
    2. Now you can run the iperf3 command in a terminal.

## Usage

iPerf can be run in two modes: server and client. The server listens for incoming connections, while the client initiates a connection to the server.

### Start or Choose a Server

Start iPerf in server mode on the endpoint you want to test against:

```
iperf3 -s
```

Or choose a public server to test your internet connection against. You can find a list [here](https://iperf3serverlist.net/).

### Basic Throughput Test

!!! info

    TCP is the default protocol used by iPerf. You can use UDP by adding the `-u` option. Also, `TX` is the default direction of this test (from client to server). To test `RX`, use the `-R` option.

Start iPerf in client mode on the endpoint you want to test from.

```
iperf3 -c <server_address>
```

### Multiple Parallel Streams

Testing with multiple parallel streams can simulate realistic traffic patterns. Use the `-P` option to specify the number of parallel streams.

```
iperf3 -c <server_address> -P 5
```