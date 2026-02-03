---
name: logging-observability-standards
description: Logging and observability standards covering structured logging, distributed tracing, metrics, alerting, and log management
version: "1.0"
technologies: []
categories: [practices, operations]
scope: always
priority: medium
---

## Structured Logging

- Use structured logging (JSON format) rather than unstructured text logs for machine parseability
- Include consistent fields in every log entry: timestamp, log level, service name, correlation ID, and message
- Add contextual fields relevant to the operation: user ID, request path, entity IDs, duration
- Use appropriate log levels consistently: DEBUG for development detail, INFO for normal operations, WARN for potential issues, ERROR for failures
- Avoid excessive logging in hot paths — log at appropriate granularity to balance observability with performance

## Distributed Tracing

- Propagate trace context (trace ID, span ID) across all service boundaries using standard headers (W3C Trace Context)
- Create spans for significant operations: HTTP requests, database queries, external API calls, message processing
- Add meaningful attributes to spans: operation name, result status, duration, error details
- Keep span hierarchies shallow and meaningful; avoid creating spans for trivial internal method calls
- Use trace context to correlate logs, metrics, and traces for unified observability

## Metrics

- Track the four golden signals for every service: latency, traffic, errors, and saturation
- Use histograms for latency measurements rather than averages to capture distribution and percentile behavior
- Implement business metrics alongside technical metrics: conversion rates, processing throughput, queue depths
- Use consistent metric naming conventions across services following the platform's convention (dot-separated, underscore-separated)
- Keep metric cardinality manageable — avoid high-cardinality label values that cause metric storage explosion

## Alerting Strategy

- Alert on symptoms (elevated error rate, high latency) rather than causes (high CPU, full disk) to reduce alert noise
- Define alert thresholds based on service-level objectives (SLOs), not arbitrary static values
- Implement tiered alerting: page for critical user-facing issues, notify for degraded performance, log for informational anomalies
- Include runbook links in alerts with clear diagnostic and remediation steps
- Review and tune alerts regularly; suppress or remove alerts that fire frequently without indicating real issues

## Log Management

- Set retention policies based on regulatory requirements and operational needs; archive old logs rather than deleting immediately
- Route logs to centralized log aggregation systems for cross-service search and analysis
- Redact or mask sensitive data (PII, credentials, authentication tokens) before log ingestion
- Implement log sampling for high-volume services to manage storage costs while maintaining visibility
- Use log-based alerting for patterns that metrics cannot capture, such as specific error messages or unusual access patterns
