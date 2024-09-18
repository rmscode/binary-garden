# HA . . . Failover

!!! note 

    Copy/paste from a txt file I had hanging out in my docs folder...
    Created: 10.20.2023 0949

**We'll have to plan for the failover of each inbound service. Some may be automatic while other may require manual intervention.** 

- **EXCHANGE**: "To avoid getting put on blacklists and other sending issues (ie remote smtp server refusing connections,) you should have your ISP create a reverse record (PTR) for your secondary IP. You also need to set up the PTR record for the failover IP."

- **EXCHANGE**: Primary and secondary MX records to each ISP. 

- **S2S VPN**: One for each ISP . . . Unless Zyxel supports a secondary host it can try if the primary disconnects. 
	- *Set secondary peer gateway address at the remote site and check the "Fallback to primary peer gateway..." box*

- **PORTAL/OTHER WEB STUFF**: Manual DNS failover. Set as low of a TTL value on the DNS record as possible. Most DNS server will round robin load balance, so about half of the outside users will experience an "outage" for a period of time. 

- BGP (Border Gateway Protocol) multihomes an inbound IP block on multiple ISPs. Thats probably overkill. Maybe comcast will do some BGP peering for us? 
	- We would need Comcast EDI and our own AS number (We need to actually own the block of IPs we have)

!!! abstract "FROM AN OLD SPICEWORKS POST:"

    OK, there are a few questions to answer in order to know the best solution. However I will cover both just in case someone with either situation reads this.

    The real issue is if you are dealing with inbound or outbound "new" session traffic.  If you are simply needing a redundant internet connection where users on your network (including servers) have outbound access to the internet and at NO TIME will anyone need to initiate a new connection from an external (outside your network) source then things are much easier.

    IF YOU are going to need to have something published. Say a mail server, web server or other device on your local network that will need to be reachable over the internet during the failover.  If that is the case then you need a full failover system. If all you need is internet access period then a standard redundant solution will work.

    Full Fail-over Solution: The issue here is addressing your public IP space. Typically your public IP addresses are routed through your upstream provider (ISP). In order to keep those same IP addresses so your servers are publicly reachable over the internet when your primary pipe goes down you have to employ some form of redundant dynamic routing. Typically in the internet world this is BGP. In an ideal situation you have your own IP space from ARINS (the people that allocate IP addresses) or you have a relationship with your ISP where they are willing to allocate you some space and perform some BGP peering with you. Either way you basically have a block of IPs that are yours! With this you then would setup a boarder firewall or router running BGP that contains both of your ISP connections (primary and fail-over) so it can advertise your little slice of the IP space to both. With this setup the moment your primary pipe went down the secondary pipe would pick up the pieces and your public IPs would then be advertised as available across that leg. This would keep the same public IPs reachable regardless.

    Poor mans way to do almost the same thing with DNS:  as an alternate choice you can setup your DNS server to point to BOTH public IP addresses for your published servers. For example you would setup your DNS record with IPs from ISP A (published to server 1) and ISP b (published to server 1) with a slightly higher value. This would provide the same level of fail over however both of your ISPs pipes would be utilized. Basically load balancing.

    ALL I NEED IS REDUNDANT INTERNET! - in this case if all you need is to keep the internet going any good firewall or router that supports fail over. In this case the firewall or router checks a public IP address on a regular basis. When it cannot reach that IP address the secondary gateway is made active and now you are routing out the fail over connection. This is very easy to do and not very complex at all.
	
