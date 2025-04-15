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

### Start or Choose a Test Host

```title="Start iPerf in server mode on the endpoint you want to test against:"
iperf3 -s
```

Optionally, you choose a public server to test your internet connection against.<br>You can find a list [here](https://iperf3serverlist.net/).

### TCP Throughput Test

```title="Start iPerf in client mode on the endpoint you want to test from:"
iperf3 -c <test_host>
```

!!! info

    - `TX` is the default direction (client > server) of all tests. To test `RX`, use the `-R` option.
    - If the server does not use the default port (5201), use the `-p` option to specify the port number.
    - To see packet loss and retry information, use `-i 1` to get a report every second.

### UDP Throughput Test

```title="The -u option specifies UDP:"
iperf3 -c <test_host> -u -b 200M -t 60
```

!!! info 

    - `-b 200M` is the target bandwidth (200Mbps). If not specified, the default of 1Mbps is used.
    - `-t 60` is the duration of the test in seconds. If not specified, the default of 10 seconds is used.


### Multiple Parallel Streams

Testing with multiple parallel streams can simulate realistic traffic patterns.

```title="Use -P to specify the number of parallel streams."
iperf3 -c <test_host> -P 5
```

### Binding to Specific Interfaces

This is useful for multi-homed systems multiple network interfaces.

```title="Use -B to bind to a specific interface:"
iperf3 -c <test_host> -B <interface_ip>
```

### Test to Multiple Interfaces at Once

```title="Use -T to label the streams:"
iperf3 -c <test_host_1> -T s1 &
iperf3 -c <test_host_2> -T s2
```

### Capture Packet Dumps

This is useful for analyzing the traffic in Wireshark.

```
iperf3 -c <test_host> -B dump.pcap
```

### Disk Testing

#### 1. Memory to Memory

```title="Client"
iperf3 -c <test_host>
```

#### 2. Disk to Memory

```title="Use -F to specify a file to read from the disk:"
iperf3 -c <test_host> -F <filename> -t 60
```

#### 3. Memory to Disk

```title="Use -F on the server side to read the file from memory:"
iperf -s -F <filename>
```

```
iperf3 -c <test_host> -t 60
```

#### Notes:

- The results of the slowest test will indicate the bottleneck. For example, if your memory to memory tests are faster than any of your disk tests, then the you are disk limited.
- If you run the test a second time with the same file, the results will be faster because the file is cached in memory.
- For disk write tests, you need to run a longer test (`-t`) to factor out network buffering issues.
