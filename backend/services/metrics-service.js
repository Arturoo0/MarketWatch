const Heap = require('heap');
const logger = require('../utils/logger');

class MetricsService {
    constructor() {
        this.latencies = [];
        this.maxLatency = 0;
        this.requestsProcessed = 0;
        this.highLatencyAlerts = 0;
        this.LATENCY_WINDOW_SIZE = 10000;
        this.LATENCY_ALERT_THRESHOLD = 1500;
    }

    getLatencyPercentile(percentile) {
        if (this.latencies.length === 0) {
            return 0;
        }
        const n = Math.max(this.latencies.length - Math.ceil((percentile / 100) * this.latencies.length), 1);
        return Heap.nlargest(this.latencies, n)[n - 1];
    }

    recordLatency(latency) {
        latency = Number(latency);
        if (latency >= this.LATENCY_ALERT_THRESHOLD) {
            logger.warn(`⚠️  High latency alert: ${latency} ms ⚠️`);
            this.highLatencyAlerts++;
        }
        this.latencies.push(latency);
        if (this.latencies.length > this.LATENCY_WINDOW_SIZE) {
            this.latencies.shift();
        }
        this.requestsProcessed++;
        this.maxLatency = Math.max(this.maxLatency, latency);
    }

    getMetricsSummary() {
        const { maxLatency, highLatencyAlerts, requestsProcessed } = this;
        return {
            maxLatency,
            highLatencyAlerts,
            requestsProcessed,
            p99: this.getLatencyPercentile(99),
            p95: this.getLatencyPercentile(95),
        }
    }
}

module.exports = new MetricsService();
