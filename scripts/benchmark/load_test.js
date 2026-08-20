import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 Load Test Configuration for SearchForge Distributed Search Platform
export const options = {
  stages: [
    { duration: '10s', target: 20 },   // Warm-up ramp
    { duration: '30s', target: 100 },  // Sustained high concurrency
    { duration: '20s', target: 250 },  // Peak stress concurrency
    { duration: '10s', target: 0 },    // Cool-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<25', 'p(99)<60'], // Strict latency requirements
    http_req_failed: ['rate<0.01'],              // < 1% error rate
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080/api/v1';

const QUERIES = [
  'java virtual threads concurrency',
  'distributed systems raft paxos',
  'inverted index bm25 ranking',
  'postgresql redis caching',
  'flashattention vllm deepseek',
  'linux kernel ebpf tracing',
  'compilers llvm jit ast',
  'high throughput low latency',
  'lock free queues cas memory',
  'vector search hnsw embeddings'
];

export default function () {
  const randomQuery = QUERIES[Math.floor(Math.random() * QUERIES.length)];
  
  // 1. Test Distributed Search Endpoint
  const searchRes = http.get(`${BASE_URL}/search?q=${encodeURIComponent(randomQuery)}&algorithm=BM25`);
  check(searchRes, {
    'search status is 200': (r) => r.status === 200,
    'search response time < 50ms': (r) => r.timings.duration < 50,
  });

  // 2. Test Trie Autocomplete Endpoint
  const prefix = randomQuery.split(' ')[0];
  const autoRes = http.get(`${BASE_URL}/autocomplete?q=${encodeURIComponent(prefix)}&limit=5`);
  check(autoRes, {
    'autocomplete status is 200': (r) => r.status === 200,
    'autocomplete response time < 10ms': (r) => r.timings.duration < 10,
  });

  sleep(0.1);
}
