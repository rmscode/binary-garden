# Wi-Fi

## 802.11x Standards

Standard               | Year Published | Max Theoretical Speed | Max In Practice Speed | GHz         | Notes
---------------------- | -------------- | --------------------- | --------------------- | ----------- | -----
802.11-1997            | 1997           | 2 Mbps                | <1 Mbps               | 2.4 GHz     | Quickly became obsolete and was replaced by 802.11b
802.11a ("Wi-Fi 2")^1^ | 1999           | 54 Mbps               | ~20-25 Mbps           | 5 GHz       | Only for legacy support
802.11b ("Wi-Fi 1")^1^ | 1999           | 11 Mbps               | ~2-3 Mbps             | 2.4 GHz     | Only for legacy support
802.11g ("Wi-Fi 3")^1^ | 2003           | 54 Mbps               | ~20-25 Mbps           | 2.4 GHz     | Only for legacy support
802.11n ("Wi-Fi 4")    | 2009           | 600 Mbps              | ~50-60 Mbps           | 2.4/5 GHz   | Almost considered legacy. Few use cases exist today (older phones, IoT devices)
802.11ac ("Wi-Fi 5")   | 2013           | 1.3 Gbps              | ~100-300 Mbps^2^      | 5 GHz^3^    | Good choice for most modern devices (2020/2021) and networks.
802.11ax ("Wi-Fi 6")   | 2019           | 9.6 Gbps              | ~800-1,500 Mbps^2^    | 2.4/5/6 GHz | For best performance and future proofing.
802.11be ("Wi-Fi 7")   | 2024           | 40 Gbps^4^            |                       | 2.4/5/6 GHz | Not yet ready for mainstream use.
802.11bn ("Wi-Fi 8")   | TBD            | 100 Gbps^4^           |                       | 2.4/5/6 GHz |

^1^*The Wi-Fi Alliance never gave generations before Wi-Fi 4 an official name so these labels are unofficial.*<br>
^2^*Largely dependent on distance, channel width and number of spatial streams.*<br>
^3^*Since 802.11ac only operates on the 5Ghz band, Wi-Fi 5 access points will fallback to 802.11n in order to support the 2.4Ghz band if enabled.*<br>
^4^*Based on industry chatter.*

*[Reference: CBTnuggets](https://www.cbtnuggets.com/blog/technology/networking/when-to-use-802-11-a-b-g-b-nc-wifi-standards)*<br>
*[Reference: SpeedGuide](https://www.speedguide.net/faq/what-is-the-actual-real-life-speed-of-wireless-374)*<br>
*[Reference: CNET](https://www.cnet.com/home/internet/how-fast-is-wi-fi-6/)*

## MIMO

MIMO stands for "Multiple Input, Multiple Output" and basically refers to systems having more than one radio antenna for transmitting and receiving data. Multiple spatial streams are broadcast from each antenna to increase system capacity, throughput or coverage. Single antenna systems are known as "Single Input, Single Output" (SISO).

Spatial streaming or multiplexing (often called SM or SMX) is a transmission technique used in MIMO wireless communication to transmit independent and separately coded data signals from each of the multiple transmit antennas. This results in the space being reused, or multiplexed, more than one time.

There are two main flavors of MIMO: SU-MIMO (Single User) and MU-MIMO (Multi User). Both are used in the downlink direction from AP to client. In 802.11ax, MU-MIMO was improved to include multiple uplink streams as well.

### SU-MIMO

- All spatial streams of the antenna array are focused on a single client.
- Splits the Signal-to-interference-plus-noise-ratio (SINR) between multiple data layers towards a client simultaneously where each layer is separately beamformed. This increases peak throughput and overall capacity.
- Introduced to Wi-Fi in 2009 with the 802.11n standard.
- No inter-user interference.

### MU-MIMO

- Multiple spatial streams are focused on multiple users.
- Shares available Signal-to-interference-plus-noise-ratio (SINR) between multiple data layers towards multiple clients simultaneously where each layer is separately beamformed. This increases perceived throughput and overall capacity.
- Introduced to Wi-Fi in 2015 with the 802.11ac standard.
- Multiplexing gain.

!!! note

    In MU-MIMO, since available SINR is shared across multiple clients, the peak per-user throughput does not necessarily increase. However, because multiple users are being served simultaneously, the overall capacity of the network increases. Each user perceives an improvement in throughput because they are being served sooner compared to waiting in a queue.

*[Reference: RF Wireless World](https://www.rfwireless-world.com/Terminology/Difference-between-SU-MIMO-and-MU-MIMO.html)*<br>
*[Reference: Digital Air Wireless](https://www.rfwireless-world.com/Terminology/Difference-between-SU-MIMO-and-MU-MIMO.html)*

## Received Signal Strength Indicator <small>(RSSI)</small> { data-toc-label="Received Signal Strength Indicator" }

The Received Signal Strength Indicator (RSSI) is a measurement of the power level that a wireless device receives from an access point. It is typically measured in decibels relative to 1 milliwatt between 0dBm (strongest) and -120dBm (weakest). RSSI values are used to determine the quality of the wireless signal and can help in troubleshooting connectivity issues.

RSSI Value | Quality
---------- | -------
-30dBm     | Excellent. The maximum achievable signal strength.
-67dBm     | Good. The minimum signal strength for a reliable connection.
-70dBm     | Fair. The minimum signal strength for decent packet delivery.
-80dBm     | Poor. The minimum signal strength for basic connectivity. Packet delivery may be unreliable.
-90dBm     | Very Poor. The minimum signal strength for a connection. Packet delivery is unreliable. 

!!! tip "Tip: Minimum RSSI"

    Some access points allow you to configure a minimum RSSI value. This is the lowest RSSI value that a client must have in order to connect to the access point. If the client's RSSI drops below this value, the access point will disconnect the client. This can help to ensure that clients are only connected to access points with a strong signal.

*[Reference: TechGrid](https://techgrid.com/blog/wifi-signal-strength)*