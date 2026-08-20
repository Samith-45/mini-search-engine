# ADR-009: Query Key Normalization & Invalidation Strategy

## Status
ACCEPTED

## Context
Preventing cache fragmentation caused by query casing, whitespace differences, and stale results after document updates.

## Decision
Compute cache keys by trimming, lowercasing, and MD5-hashing the query string. Invalidate or expire cache entries via 10-minute sliding TTL.
