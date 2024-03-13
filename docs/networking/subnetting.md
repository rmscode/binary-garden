# Subnetting

## Wilcard Mask

A wildcard mask is a mask of bits that indicates which parts of an IP address are available for examination and can be thought of as an inverted subnet mask. 

For example, a subnet mask of 255.255.255.0 (11111111.11111111.11111111.00000000) inverts to a wildcard mask of 0.0.0.255 (00000000.00000000.00000000.11111111).

A wildcard mask is a matching rule. The rules are as follows:

- 0 means the corresponding bit must match
- 1 means the corresponding bit doesn't matter (the wildcard)

!!! example

    The wildcard mask of 0.0.0.254 applied to the IP address 10.10.10.2 will match even numbered IP addresses 10.10.10.0, 10.10.10.2, 10.10.10.4 etc.