# General UPS Information

An Uninterruptible Power Supply (UPS) is a device that provides backup power to electronic equipment in case of a power outage or voltage drop. It ensures that devices continue to operate without interruption, protecting against data loss and hardware damage.

## Types of UPS Systems

`Online Double Conversion`

:   In an Online Double Conversion UPS, incoming AC power is converted to DC power, which is then converted back to AC power to supply the connected load. This provides the highest level of protection and is ideal for sensitive equipment that requires a stable power supply. The UPS continuously filters and regulates power, isolating connected devices from power fluctuations and disturbances. It also provides backup power from its internal batteries in case of a power outage.

`Line Interactive`

:   A Line Interactive UPS provides power conditioning and battery backup to connected devices. It regulates voltage and filters power to protect against power fluctuations, like surges, spikes, and noise. Line interactive UPS systems rely on the battery to condition power so this type tends to drain its battery more frequently than online UPS systems that condition power through the double-conversion process. The UPS switches to battery power when the input voltage drops below a certain threshold or during a power outage. It offers a balance between protection and efficiency, making it suitable for most applications. These are usually less expensive than Online Double Conversion UPS systems.

`Offline`

:   An Offline (also called standby and battery backup) UPS provides basic power protection by switching to battery power when the input voltage drops below a certain threshold or during a power outage. It offers limited protection against power fluctuations and is suitable for non-critical applications. Standby UPS systems are typically less expensive than Line Interactive and Online Double Conversion UPS systems.

## Modes of Operation

`Line Mode`

:   In Line Mode (On line), the UPS provides power directly from the utility mains to the connected load while also regulating voltage and filtering power to protect against power fluctuations (like surges, spikes, and noise). The UPS charges its internal batteries during this mode. This is the default operating state when incoming utility power is within acceptable parameters (voltage and frequency are stable). It will remain in Line Mode as long as the power is normal.

`Bypass Mode`

:    In Bypass Mode, the UPS bypasses its inverter circuitry and provides unfiltered power directly from the utility to the load. This is typically used as a safety measure if there’s an internal fault in the UPS, an overload condition or during maintenance.

`Battery Mode`

:    In Battery Mode, the UPS disconnects from utility power and provides power to the connected load from its internal batteries, using its inverter to convert DC power to AC. When utility power fails or there’s a significant voltage drop or fluctuation beyond safe operating levels. Blackout, brownout or high voltage conditions can trigger battery mode.

## Correctly Sizing a UPS

There are three main factors to consider:

- Intended Load: The combined voltage and amperage (VA) of all connected electronics.
- Capacity of the UPS: The Maximum power output. Expressed in VA and Watts.
- Runtime: How long it can supply battery power for.

!!! note

    Necessary runtime depends on how long *you* want or need your connected electronics to continue to operate during a power outage.

Calculate the intended load to determine capacity:

1. List all devices that will be connected to the UPS.
2. Determine the voltage and amperage for each.
3. Calculate the VA (Volt-Ampere) rating for each device by multiplying the voltage by the amperage, then add up the total VA for all devices.
4. Add 10%-15% (or more) to provide a bit of headroom for future expansion.
    - Multiply by 1.10 for 10%, 1.15 for %15, etc.

Determine runtime:

1. Find the capacity of the UPS battery in ampere hours (Ah).
2. Find the input voltage of the UPS.
3. Determine the total load for the UPS in watts by adding up the watts used by all of the connected devices.<br />

    !!! note "FYI, in DC circuits, Watts and Volt-amps are equal."

4. Multiply the battery Ah by the input voltage, then divide that number by the total load.

[*Reference*](https://www.lifewire.com/size-an-uninterruptible-power-supply-5208486)

## Understanding Power, Crest and Surge Factors

*Summarized from Schneider Electric - Data Center Science Center* [*White Paper 17*](https://download.schneider-electric.com/files?p_Doc_Ref=SPD_SADE-5TNQYL_EN&p_enDocType=White+Paper&p_File_Name=SADE-5TNQYL_R1_EN.pdf)

### Power Factor

A measure of the delivery rate of energy and in DC circuits is expressed as the mathematical product of Volts and Amps (power = Volt x Amps). However, in AC power systems, some AC current (Amps) may flow into and back out of the load without delivery energy. This current, called reactive or harmonic current, is what gives rise to "apparent" power (Volt x Amps) which is larger than the actual power consumed. This difference between the apparent power and the actual power gives rise to the power factor. The power factor is equal to the ratio of the actual power to the apparent power. Therefor the true power in any AC system is the VA rating multiplied by the power factor.

For example, our CyberPower OL1500RTXL2U has a power capacity of 1500VA and a power rating of 1350W. The power factor is 0.9 (1350W / 1500VA = 0.9).

You want to make sure that your connected devices don't exceed the VA rating of the UPS, but you also want to make sure that the power factor of the UPS is sufficient to handle the load. If the power factor is too low, the UPS may not be able to handle the load, even if the VA rating is sufficient.

### Crest Factor 

In addition to a low power factor, some computer loads are also unusual in that they exhibit a high crest factor. Crest factor is the ratio between the instantaneous peak current required by the load and the RMS current (RMS stands for Root Mean Square, which is a type of average). Computers and IT equipment with Power Factor Corrected power supplies exhibit a crest factor of 1.4.

When a load exhibits a crest factor of more than 1.4, the source (UPS) must supply the peak current desired by the load. If the source does not supply the current, then the source 
voltage will become deformed (distorted) by the excess peak current. Therefore, if a UPS is not sized to supply the crest factor desired by the load, the output voltage waveform of the UPS will be distorted.

The fact that virtually all equipment installed in data centers today such as servers, routers, and storage devices are power factor corrected has virtually eliminated crest factor as a problem in the data center. Crest factor problems today are limited to call center or trading floor installations with a high density of personal computers.

### Surge Factor

This term is often mistakenly related to the surge suppression characteristic of a UPS or surge suppressor. The Surge Factor relates to the momentary overload capacity of the UPS and is a measure of the ability of the UPS to start-up loads which temporarily require extra power when first turned on.

For typical computer systems with hard disk drives, the Surge Factor required is approximately 1.15 time the steady-sate power consumption.