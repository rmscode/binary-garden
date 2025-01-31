# Subnetting

## Wildcard Mask


!!! Quote "I really like this quick definition and analogy from [CBTnuggets](https://www.cbtnuggets.com/blog/technology/networking/networking-basics-what-are-wildcard-masks-and-how-do-they-work)"

    A wildcard mask allows or denies all the traffic from a network IP address. It tells the router which bits in the IP address need to match the access list and which do not.

    Let's say you want to get your car washed. You pull into the car wash, go up to the counter, and ask for the deluxe car wash. You don't realize it, but it comes with an air freshener. The car wash clerk asks, "What type of air freshener would you like?" and you say, "One that freshens the air." The clerk says, "No, what scent would you like?" Because you weren't planning that far ahead, you say, "I don't care. Any of them." 
    
    Alternately, when the clerk asked you, "Which one do you want?" You could have responded, "None of them." In either case, you either don't care or care strongly enough to make a choice. That's exactly how a wildcard mask works.

A wildcard mask is a mask of bits that indicates which parts of an IP address are available for examination and can be thought of as an inverted subnet mask. 

For example, a subnet mask of 255.255.255.0 (11111111.11111111.11111111.00000000) inverts to a wildcard mask of 0.0.0.255 (00000000.00000000.00000000.11111111).

A wildcard mask is a matching rule. The rules are as follows:

- 0 means the corresponding bit must match
- 1 means the corresponding bit doesn't matter (the wildcard)

!!! example

    The wildcard mask of 0.0.0.255 applied to the IP address 172.16.56.0 will match all IP addresses of that subnet. Here's an example of an ACL to deny all traffic from that subnet on a Dell OS9 switch:

    ```shell
    DellEMC(conf)# ip access-list standard Deny-56-Subnet
    DellEMC(conf-std-nacl)# deny 172.16.56.0 0.0.0.255 any
    ```


