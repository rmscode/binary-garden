# Cybersecurity Part 1: Making Sense of the Noise

## Who is Cybersecurity for?

You don't need to be directly involved in cybersecurity, or have any knowledge of it to know that its a pretty big deal. We see the headlines almost everyday. How much of that is hype? How can hackers be stopped? What if it happens to me? To answer that last question, it will happen to you. *Everyone* will get hacked in some way eventually. Its just a matter of when. 

Executives, team leaders, managers, developers . . . *anyone* working with or affected by IT systems should have a basic understanding of cybersecurity.

## How does hacking and defending work?

The best way to understand how attackers and defenders think is to understand and use the "OODA loop" - Observe, Orient, Decide, Act.

The OODA loop is a decision making process developed by John Boyd, a US Air Force colonel. He was tasked with finding out why US Airfoce pilots were losing dog fights even though they possessed superior technology and training. He found that the pilots who won were the ones who could make decisions faster than their opponents. Defending against cyber attacks is no different. The Center for Internet Security has a comprehensive [slideshow](https://csrc.nist.gov/CSRC/media/Presentations/The-Cyber-OODA-Loop-How-Your-Attacker-Should-Help/images-media/day3_security-automation_930-1020.pdf) on what they call the "Cyber OODA loop". 

Take the following scenario: A large online retailer comes under attack by thousands of computers around the world sending requests to their webserver. Their infrastructure was designed to handle large amounts of traffic, but the requests are so numerous that the server is unable to deal with the load. Their website keeps crashing. No website means no sales. The company loses money.

- **Observe**: Too many web requests are coming in?
- **Orient**: Is there a clear pattern to these requests?
- **Decide**: What happens if we block these requests?
- **Act**: Test by blocking the requests.

The OODA loop is a cycle. Once you act, you observe the results, orient yourself to the new situation, decide what to do next, and act again. The faster you can iterate through the loop, the better you can defend against an attack.

Another clear example of the effectiveness of the OODA loop in cybersecurity, among other things, can be found in comparing the breaches of Equifax in 2017 and Quroa in 2018. Equifax took 76 days to detect the breach, while Quora took a weekend. Quora was quick to detect what was happening, analyze the situation, come up with a plan and then act on it. The result? Minimal damage and a quick recovery. Both breaches are well documented and are worth reading more about.

## The three factors of Cybersecurity.

The questions below are important. Too often, cybersecurity strategies focus on technology solutions, becuase it seems easier to buy a solution to a problem than investigate the root causes. Understanding what your business has that is valuable to others and who might want to attack you to steal that information is often overlooked.

- **What assets do we have?** What valuables do we have that we want to protect? Customer data? Source code? Confidential business data?
    - Source code
    - Client data
    - Intellectual property
    - Finances
- **Who would want to attack us?** Who would want to steal our assets? Why would they want to take them, and what would they do with them?
    - Disgruntled ex-employees (Revenge, sabotage, theft of data)
    - Competitors (Theft of data, disrupt operations)
    - Criminals (Identity theft, fraud, theft of monies, ransomware)
- **What defenses do we have?** Is our current endpoint AV enough? Are our firewalls filters/policies/abilities robust enough? Do we have the ability to detect a breach in a reasonable amount of time? Do we need dedicated security personnel? Are our passwords unique enough and should we have some form of password management?
    - Firewall(s)
    - Network segmentation
    - VPN for remote connections
    - OS/Software Patching schedules
    - Secure code development practices
    - Strong passwords

## Objectives of a Cybersecurity strategy

Having a Cybersecurity strategy tells everyone "This is what we're doing to protect our assets"; it defines a direction of travel toward your goal of *better* security. For example, a policy to patch vulnerable systems are driven by your strategy and help you get to your goal of better security.

Cybersecurity people love their acronyms, which is part of why the entire field can seem complex and difficult to undertand. Two of the main acronyms the industry uses when talking about strategy are:

- **PPT**: People, Process, Technology. Often called the three pillars of cybersecurity. First, train your people. Second, look at and fix your processes. Third, invest in suitable technology.
- **CIA Triad**: Confidentiality, Integrity, Availability. These are the three main objectives of cybersecurity.

Both approaches are great, but they assume you have complete knowledge of who would attack you, what they would steal, and how they could attack you. Both should be used, but they don't help if you're starting from scratch.

Core concepts of building a strategy from the ground up. The *risk-based strategy*:

- **Relevant**: Any strategy needs to be relevant to your organization, your needs, and the threats you face. If you’re a 200-person software house, trying to use a strategy designed for a global bank will fail. There is no one-size-fits-all.
- **Proprtional**: The defenses you build and the technologies you use to protect your organization need to be proportional to the size of your organization and the threat you face. A 200-person software house will have a hard time spending tens of millions on a security system designed to defeat a hostile nation’s spies. Equally, the NSA won’t be using freeware antivirus software on their laptops!
- **Sustainable**: Sustainability is the key factor for ensuring that your strategy actually gets implemented. If you’re planning to plug in solutions that need four times your existing head count to manage and that cost your entire budget, your organization won’t be able to sustain them. Also, if you're planning to implement a strategy that disrupts the way your organization and its people work, you will fail. People are the most important part of any strategy. If they don’t understand it, or it makes their jobs harder, they will find ways to bypass it.

## Fostering a culture security

Security is everyone problem. Every employee has a role to play in keeping the company safe.

Training your people is great, but your approach to that training could be the difference between success and failure of your strategy. Forcing everyone to watch an hour long PowerPoint presentation once a year isn't going to cut it. In reality, it's just a great excuse for employees to zone out while avoiding doing real work. It does absolutely nothing to build awreness. 

Your strategy has to be understood and used by everyone in your organization. Thats why it is said that Cybersecurity isn’t a technology problem; it’s a people problem. A workable strategy, supported by workable policies, will build a culture of security within your organization. A strategy that is complex or technical becomes an acronym soup that’s only understood by your security team. No one will follow the policies or pay attention to security requirements if they feel the strategy isn’t relevant to them and their job. What's worse, they could potentially develop a negative attitude or distrust towards the security team.



## Conclusion