package com.searchforge.service;

import com.searchforge.dto.SearchResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Cache abstraction supporting Redis with in-memory ConcurrentHashMap TTL fallback.
 */
@Service
public class CacheService {

    private static final Logger log = LoggerFactory.getLogger(CacheService.class);
    private static final String CACHE_PREFIX = "searchforge:query:";
    private static final Duration TTL = Duration.ofMinutes(10);

    @Autowired(required = false)
    private RedisTemplate<String, Object> redisTemplate;

    private final Map<String, CacheEntry> localCache = new ConcurrentHashMap<>();

    private static class CacheEntry {
        final SearchResponseDTO data;
        final long expiresAt;

        CacheEntry(SearchResponseDTO data, long ttlMs) {
            this.data = data;
            this.expiresAt = System.currentTimeMillis() + ttlMs;
        }

        boolean isExpired() {
            return System.currentTimeMillis() > expiresAt;
        }
    }

    public SearchResponseDTO getCachedQuery(String cacheKey) {
        String key = CACHE_PREFIX + cacheKey;
        if (redisTemplate != null) {
            try {
                Object cached = redisTemplate.opsForValue().get(key);
                if (cached instanceof SearchResponseDTO dto) {
                    log.info("Redis cache HIT for key: {}", cacheKey);
                    return dto;
                }
            } catch (Exception e) {
                log.warn("Redis lookup failed, falling back to local memory: {}", e.getMessage());
            }
        }

        CacheEntry entry = localCache.get(key);
        if (entry != null) {
            if (!entry.isExpired()) {
                log.info("Local memory cache HIT for key: {}", cacheKey);
                return entry.data;
            } else {
                localCache.remove(key);
            }
        }

        return null;
    }

    public void cacheQuery(String cacheKey, SearchResponseDTO response) {
        String key = CACHE_PREFIX + cacheKey;
        if (redisTemplate != null) {
            try {
                redisTemplate.opsForValue().set(key, response, TTL);
                log.info("Cached query in Redis: {}", cacheKey);
                return;
            } catch (Exception e) {
                log.warn("Redis write failed, storing in local memory: {}", e.getMessage());
            }
        }

        localCache.put(key, new CacheEntry(response, TTL.toMillis()));
    }

    public void clearCache() {
        if (redisTemplate != null) {
            try {
                var keys = redisTemplate.keys(CACHE_PREFIX + "*");
                if (keys != null && !keys.isEmpty()) {
                    redisTemplate.delete(keys);
                }
            } catch (Exception e) {
                log.warn("Redis cache clear failed: {}", e.getMessage());
            }
        }
        localCache.clear();
    }
}
