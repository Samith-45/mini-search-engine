package com.searchforge.core.concurrency;

import com.searchforge.dto.ConcurrencyComparisonResultDTO;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Concurrency & JVM Execution Laboratory.
 * Empirically compares Platform OS Threads, Fixed Thread Pool (50), and Java 21 Virtual Threads (Loom)
 * across scalable concurrency loads (10 to 1000 concurrent operations).
 */
@Component
public class ConcurrencyComparisonRunner {

    public List<ConcurrencyComparisonResultDTO> runComparison(int concurrencyLevel, int totalOperations) {
        List<ConcurrencyComparisonResultDTO> results = new ArrayList<>();

        // 1. Fixed Platform Thread Pool (50 workers)
        ExecutorService fixedPool = Executors.newFixedThreadPool(Math.min(50, concurrencyLevel));
        results.add(benchmarkExecutor(
                "Fixed Platform Thread Pool (50)",
                fixedPool,
                concurrencyLevel,
                totalOperations,
                50,
                "Constrained worker pool leads to request queueing under high concurrency."
        ));

        // 2. Unbounded Platform OS Threads
        ExecutorService cachedPool = Executors.newCachedThreadPool();
        results.add(benchmarkExecutor(
                "Platform OS Threads (1:1 Kernel)",
                cachedPool,
                concurrencyLevel,
                totalOperations,
                Math.min(concurrencyLevel, 500),
                "Each platform thread allocates ~1MB stack memory; context-switch overhead increases with thread count."
        ));

        // 3. Java 21 Virtual Threads (Project Loom)
        ExecutorService virtualExecutor = Executors.newVirtualThreadPerTaskExecutor();
        results.add(benchmarkExecutor(
                "Java 21 Virtual Threads (Project Loom)",
                virtualExecutor,
                concurrencyLevel,
                totalOperations,
                Runtime.getRuntime().availableProcessors(), // Carrier thread count
                "Lightweight M:N user-mode scheduling over ForkJoinPool carrier threads with minimal heap overhead."
        ));

        return results;
    }

    private ConcurrencyComparisonResultDTO benchmarkExecutor(
            String name,
            ExecutorService executor,
            int concurrency,
            int totalOps,
            int activeThreads,
            String notes
    ) {
        List<Long> latenciesNanos = new CopyOnWriteArrayList<>();
        AtomicInteger errorCount = new AtomicInteger(0);
        CountDownLatch latch = new CountDownLatch(totalOps);

        long startBenchmark = System.nanoTime();

        for (int i = 0; i < totalOps; i++) {
            executor.submit(() -> {
                long taskStart = System.nanoTime();
                try {
                    // Simulate search scatter-gather CPU + lightweight I/O wait
                    long sum = 0;
                    for (int k = 0; k < 5000; k++) {
                        sum += (k * 31);
                    }
                    Thread.sleep(2); // Simulated 2ms I/O or network hop
                    long duration = System.nanoTime() - taskStart;
                    latenciesNanos.add(duration);
                } catch (Exception e) {
                    errorCount.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        try {
            latch.await(30, TimeUnit.SECONDS);
        } catch (InterruptedException ignored) {
            Thread.currentThread().interrupt();
        } finally {
            executor.shutdown();
        }

        long elapsedNanos = System.nanoTime() - startBenchmark;
        double elapsedSec = Math.max(0.001, elapsedNanos / 1_000_000_000.0);
        double opsPerSec = latenciesNanos.size() / elapsedSec;

        List<Long> sorted = new ArrayList<>(latenciesNanos);
        Collections.sort(sorted);

        double p50 = getPercentile(sorted, 0.50);
        double p95 = getPercentile(sorted, 0.95);
        double p99 = getPercentile(sorted, 0.99);

        Runtime runtime = Runtime.getRuntime();
        double memUsedMb = (runtime.totalMemory() - runtime.freeMemory()) / (1024.0 * 1024.0);

        return new ConcurrencyComparisonResultDTO(
                name,
                concurrency,
                totalOps,
                Math.round(opsPerSec * 10.0) / 10.0,
                Math.round(p50 * 100.0) / 100.0,
                Math.round(p95 * 100.0) / 100.0,
                Math.round(p99 * 100.0) / 100.0,
                Math.round(memUsedMb * 10.0) / 10.0,
                activeThreads,
                errorCount.get(),
                notes
        );
    }

    private double getPercentile(List<Long> list, double percentile) {
        if (list.isEmpty()) return 0.0;
        int idx = (int) Math.ceil(percentile * list.size()) - 1;
        idx = Math.max(0, Math.min(idx, list.size() - 1));
        return list.get(idx) / 1_000_000.0;
    }
}
