+++
Title = "Certificate Transparency stats"
+++

*As of Feburary 17, 2022*

An "active log" is a log that contains unexpired certificates. Specifically, it includes current and future shards of annually sharded logs, and non-sharded logs that are not retired and have accepted new certificates for inclusion in the last 825 days[^br].

| | Count |
|-|-|
|Certificates in active logs|6,379,773,981|
|Certificates in non-retired logs|10,425,597,824|
|Certificates in Google logs|7,634,811,567|
|Certificates in active Google logs|4,767,725,831|


[^br]: A previous version of the Baseline Rules required that certificates be limited to a 825 day validity period. As of Sept. 1, 2020 this has been reduced but there are still unexpired certificates from before this change. On Dec. 6, 2022 this will change to 398 days as the last certificate with a 825 day lifespan expires.
