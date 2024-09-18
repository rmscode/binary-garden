# Server Research 2023

## Intel/AMD CPU Naming Conventions

Intel Xeon Scalable:

- First digit represents the product series (3-8/9 for Bronze-Platinum)
- Second digit represents the generation (1st-4th)
- Third and fourth digit represents the SKU (larger is typically the "better" CPU)

AMD EPYC:

- First digit represents the product series (3-embedded, 7-server)
- Second digit represents number of cores
      - 1: 4
      - 2: 8 - 16
      - 3: 12 (EPYC embedded series); 16 - 24 (EPYC processors)
      - 4: 16 (EPYC embedded series); 24 - 32 (EPYC processors)
      - 5: 32 - 48
      - 6: 48 - 64
      - 7: 64
      - F: 8 - 24 cores with high per-core performance
      - H: 64
- Third digit represents performance identifier (0-8, F, H)
- Fourth digit represents the generation (1st-3rd)
- P = single CPU only

## Memory Population Guidelines

> A handful of the CPUs listed in my Excel spreadsheet only support full memory transfer rates in one DIMM per channel configurations (1DPC). As far as I know, the only ones that support full speed in a 2DPC config are the 1st and 3rd gen Xeon Scalable CPUs.

Dell has written a [white paper](https://www.delltechnologies.com/asset/en-us/products/servers/industry-market/whitepaper-memory-population-rules-for-3rd-generation-intel-xeon-scalable-processors-on-poweredge-servers.pdf) on memory population rules for 3rd gen Intel Xeon CPUs shipped with Dell R650 servers. [Similar guidelines](https://www.delltechnologies.com/asset/en-us/products/servers/industry-market/whitepaper-memory-population-rules-for-3rd-generation-amd-epyc-processors-for-poweredge-servers.pdf) exist for AMD EPYC CPUs shipped with Dell R6525 servers.

According to the white papers, there are three ways to populate the memory: Balanced, near balanced and unbalanced. Memory that has been incorrectly populated is referred to as an *unbalanced configuration*. From a functionality standpoint, an unbalanced configuration will operate adequately, but introduces significant additional overhead that will slow down data transfer speeds. Similarly, a *near balanced* configuration does not yield fully optimized data transfer speeds but it is only suboptimal to that of a balanced configuration. Conversely, memory that has been correctly populated is referred to as a *balanced configuration* and will secure optimal functionality and data transfer speeds.

Optimal memory configurations for a 3rd gen Xeon would be half or all DIMM slots populated. For AMD, the most performant "balanced" configuration would be to populate half of the DIMM slots.

> Note: Say we initially configure the servers with 16 x 16GB DIMMs (256GB) of RAM and later decide to upgrade to 512GB. Considering the information above, a 3rd Gen Intel system's memory would continue to operate at full transfer speeds, whereas an AMD system would cut the transfer speeds from 3200 MT/s to 2933 MT/s once all 32 DIMM slots are populated. I don't know what kind of impact, if any, that would have on the system's performance with our workload.

## Nickel and Dime

It's definitely cheaper to purchase RAM (at least) separately. For example, 256GB of DDR4-3200 RDIMM RAM from xByte is $1,104 and the same from memory.net is $608...*almost half*.

The TDP of the AMD EPYC CPUs are lower than Intel's. Less power. Less heat. Less overall operational costs. Theoretically, its only a potential savings of ~$15 per year per server. I don't think anyone is going to pat us on the back for that.

## Comparing the most likely candidates' PassMark scores

- Xeon 6246R CPUMark score = 30468
- Xeon 6346 CPUMark score = 37722
- EPYC 7313 CPUMark score = 40075

## Making a case for AMD EPYC CPUs

A Dell 6526 with an EPYC 7313 is ~$3K-$5K CHEAPER than a Dell R640 or R650 with a comparable Xeon CPU. CPU Mark scores are higher for the EPYC and TDP is lower wich results in a lower overall TOC. Intel is usually known for having better single core performance than AMD, but the EPYC 7313 actually squeaks by each of the Xeons above by about 1-6%. Multi-thread performance is the metric you should be concerned with when considering VM workloads anyway . . . and according to [this report](https://www.anandtech.com/show/16529/amd-epyc-milan-review/6), 3rd gen EPYCs beat 2nd gen Xeons in multi-threaded performance. Take this quick and dirty analysis with a grain of salt . . . I haven't spent much time comparing the other CPUs in the list. Probably overanalyzing things anyway.

A handful of top dogs have spent a fair amount of time benchmarking the AMD EPYC platform. Microsoft [wrote a report](https://techcommunity.microsoft.com/t5/azure-compute-blog/performance-amp-scalability-of-hbv3-vms-with-milan-x-cpus/ba-p/2939814) on the performance and scalability of Milan-X (3rd gen EPYC). They have also [just rolled](https://techcommunity.microsoft.com/t5/azure-compute-blog/public-preview-new-amd-based-vms-with-increased-performance/ba-p/3981351) out new AMD-based VMs in Azure. SuperMicro [set a TPCx-HCI world record](https://www.supermicro.com/en/pressreleases/supermicro-announces-worlds-first-tpcx-hci-benchmark-result) with 3rd gen AMD EPYC CPUs. I think its safe to say that AMD handles virtualized workloads in comparison to Intel just fine.

## Dell R64x or R65x?

- No EOL announced for the 640, 650 or 6525 that I could find, but the R640 can be configured with a Xeon 61xx CPUs which reached EOL in Dec 2023.
- The R640 launched over 5 years ago now in 2017. Typically, Dell supports their servers for 5-7 years.
- The R640 is outside of Dell's default warranty period, a 3 year Dell recertified warranty can be added to the R640 for $1K-$1700K depending on the warranty level.
- The R650 and R6525 come with a Dell Recertified warranty by default.

## Some thoughts on our current cluster's allocation of resources and future VM expansion

!!! note "Edit"

      Ran this last part by Matt and he reminded me that assigning vCPUs to a VM is not a 1:1 operation. You're alloting time, not cores. Ah, thats right...I remember. I kept getting hung up on the idea that you shouldn't assign more vCPUs than you have cores, but that's not the case. You shouldn't assign more vCPUs than you have *logical processors*. We have 192 logical processors across the cluster...plenty. 

~~Our current cluster nodes each have dual 16 core CPUs and 192GB of RAM. According to the `NEP-Server-Details_New` spreadsheet, 69 of the 96 cores and 254GB of the 576GB of RAM have been allocated to various VMs across the entire cluster. Moving the workloads of Linc1 and Linc2 to the cluster would potentially add an additional 15 cores and 70GB of RAM . . . New total allocations of 85/96 cores and 324GB/576GB. Now, lets reserve 2 cores per node for the host OS - 91/96 cores. 5 "free" cores across the cluster, for what? 1-2 more VMs?~~

~~Considering the above, going with dual 18 core CPUs (at least) would leave us with an additional 17 "free" cores across the cluster instead of 5 . . . Room 12-16ish more VMs. I don't think RAM is an issue. We'll have plenty of that.~~

~~> Note: I know that I listed 3 different 16 core CPUs as being likely candidates for the new servers. That was before I dove into the numbers above. I guess they are still viable options as long as we don't plan on adding more VMs to the cluster. My math could be wrong...the data in the spreadsheet could be outdated...I didn't think things would be that tight.~~
