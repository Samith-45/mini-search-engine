# ADR-005: Primary-Replica Model with Hot-Standby Failover

## Status
ACCEPTED

## Context
High availability requirements: maintaining search cluster operational uptime when a primary shard crashes or experiences network degradation.

## Decision
Assign one hot-standby secondary replica per primary partition. Router automatically routes queries to the secondary replica if the primary node fails or times out.

## Benchmark Evidence
Under active 100-user concurrent load in the Reliability Lab, killing primary shard 1 resulted in **100% data availability and 0% request failure rate** due to automatic sub-3ms failover routing.
