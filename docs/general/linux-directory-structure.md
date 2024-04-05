# The Linux Directory Structure Explained

``` mermaid
flowchart TD
    A["/"] --> B[bin/]
    A --> C[dev/]
    A --> D[etc/]
    A --> E[usr/]
    A --> F[home/]
    A --> G[lib/]
    A --> H[sbin/]
    A --> I[tmp/]
    A --> J[var/]
    E ---> K[bin/]
    E ---> L[man/]
    E ---> M[lib/]
    E ---> N[local/]
    E ---> O[share/]
    J ---> P[log/]
    J ---> Q[lock/]
    J ---> R[tmp/]
```

``` mermaid
flowchart TD
    A["/"] --> B[bin/]
    A --> 
    A --> C[dev/]
    A --> D[etc/]
    A --> E[usr/]
    A --> F[home/]
    A --> G[lib/]
    A --> H[sbin/]
    A --> I[tmp/]
    A --> J[var/]
    E ---> K[bin/]
    E ---> L[man/]
    E ---> M[lib/]
    E ---> N[local/]
    E ---> O[share/]
    J ---> P[log/]
    J ---> Q[lock/]
    J ---> R[tmp/]
```