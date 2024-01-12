# Troubleshooting

## Operators Panel LEDs

The Ops panel on the front of the enclosure located on the left ear flange of the 2U chassis provides status information at a glance. More [here](../powervault-me4/me4-overview.md#operator-panel-leds). 

### LED colors

LED colors are used consistently throughout the enclosure and its components for indicating status:

- **Green**: Good or positive indication.
- **Blinking green/amber**: Non-critical condition.
- **Amber**: Critical fault.

## Alarm conditions

| Status                                         | Severity                              | Alarm
| ---------------------------------------------- | ------------------------------------- | -----
| PCM alert – loss of DC power from a single PCM | Fault – loss of redundancy            | S1
| PCM fan fail                                   | Fault – loss of redundancy            | S1
| SBB module detected PCM fault                  | Fault                                 | S1
| PCM removed                                    | Configuration error                   | None
| Enclosure configuration error (VPD)            | Fault – critical                      | S1
| Low warning temperature alert                  | Warning                               | S1
| High warning temperature alert                 | Warning                               | S1
| Over-temperature alarm                         | Fault – critical                      | S4
| I^2^C bus failure                              | Fault – loss of redundancy            | S1
| Ops panel communication error (I^2^C)          | Fault – critical                      | S1
| RAID error                                     | Fault – critical                      | S1
| SBB interface module fault                     | Fault – critical                      | S1
| SBB interface module removed                   | Warning                               | None
| Drive power control fault                      | Warning  – no loss of disk power      | S1
| Drive power control fault                      | Fault – critical -loss of disk power  | S1
| Drive removed                                  | Warning                               | None
| Insufficient power available                   | Warning                               | None