# Screeps Colony Rebuild Plan

**Generated**: 2025-01-27  
**Analysis Type**: Deep colony review and rebuild roadmap  
**Target**: Screeps TypeScript colony optimization  

## Executive Summary

This plan addresses critical issues in the Screeps colony while preserving proven subsystems (job queue, monitor-logs, and logging infrastructure). The rebuild focuses on fixing immediate bugs, optimizing performance bottlenecks, and establishing a foundation for scalable colony management.

### Key Wins to Preserve
- ✅ **Job Queue System**: Strong abstraction with good enqueue/dequeue patterns
- ✅ **Monitor-Logs Infrastructure**: Comprehensive logging with room-level detail  
- ✅ **Test Suite**: Existing Jest tests (9 suites, 34 tests passing)
- ✅ **Room Planner Scaffolding**: Basic framework ready for enhancement

### Critical Issues Identified
1. **trimQueue Bug** (HIGH): Queue trimming writes to wrong memory location
2. **Movement Engine** (HIGH): Heavy CPU usage from repeated PathFinder computations  
3. **Memory Growth** (MEDIUM): Unbounded performance stats arrays
4. **I/O Bottlenecks** (MEDIUM): Synchronous file operations in monitor-logs

## Implementation Status

### Phase 0: Triage & Safety Fixes ✅ COMPLETED

#### PR#1: Fix trimQueue Bug ✅ COMPLETED
- **Issue**: `trimQueue()` wrote results to `Memory.batchQueue` instead of `Memory.jobQueue`
- **Fix**: Modified `src/core/kernel.ts` to write trimmed results to `Memory.jobQueue`
- **Test**: Added `src/core/__tests__/trimQueue.test.ts` with spawn job capping validation
- **Status**: ✅ Implemented and tested (35/35 tests passing)

#### PR#2: Bound Performance Metrics ✅ COMPLETED  
- **Issue**: `Memory.performanceStats.cpu` and `Memory.performanceStats.memory` growing unbounded
- **Fix**: Added sampling and 200-entry cap in `src/utils/memory.ts`
- **Implementation**: 
  ```typescript
  // Bound arrays to max 200 entries with optional sampling
  if (Memory.performanceStats.cpu.length > 200) {
      Memory.performanceStats.cpu.shift();
  }
  ```
- **Status**: ✅ Implemented and tested

#### PR#3: Batched Async Logging ✅ COMPLETED
- **Issue**: `scripts/monitor-logs.js` using synchronous file I/O per message
- **Fix**: Implemented in-memory buffer with 2-second async batch writes
- **Implementation**:
  ```javascript
  let logBuffer = [];
  setInterval(() => {
      fs.writeFile(LOG_FILE_PATH, logBuffer.join('\n'), { flag: 'a' }, () => {
          logBuffer = [];
      });
  }, 2000);
  ```
- **Status**: ✅ Implemented and tested

### Phase 1: Movement & Path Optimization 🔄 IN PROGRESS

#### PR#4: Guard Memory Writes (NEXT)
- **Issue**: Unnecessary Memory writes in `src/core/kernel.ts` seed functions
- **Plan**: Only write to `Memory.jobQueue` when value changes
- **Priority**: HIGH (immediate CPU/memory benefits)
- **Effort**: Small (1-2 hour implementation)

#### PR#5: Per-Room CostMatrix Cache (NEXT)
- **Issue**: Heavy CPU usage from repeated CostMatrix/PathFinder computations
- **Plan**: 
  1. Create `src/core/pathCache.ts` with in-memory per-tick cache
  2. Implement `getRoomCostMatrix(room)` API
  3. Update movement code to use cached matrices
  4. Add Jest tests for cache hit/miss behavior
- **Priority**: HIGH (major CPU optimization)
- **Effort**: Medium (4-6 hour implementation)

### Phase 2: Memory & Performance Hardening 📋 PLANNED

#### PR#6: Memory Management Overhaul
- **Scope**: 
  - Implement memory compression for large objects
  - Add memory usage monitoring and alerts
  - Establish cleanup routines for stale data
- **Priority**: MEDIUM
- **Effort**: Large (8-12 hours)

#### PR#7: Room Planning Enhancement  
- **Scope**:
  - Complete room planner implementation
  - Add building placement optimization
  - Implement expansion planning logic
- **Priority**: MEDIUM  
- **Effort**: Large (12-16 hours)

## Quality Gates & Acceptance Criteria

### Build & Test Requirements
- ✅ **Build**: `npm run build` must succeed (webpack compilation)
- ✅ **Tests**: All Jest tests must pass (currently 35/35 passing)
- ✅ **Lint**: TypeScript compilation without errors

### Performance Targets
- **CPU Usage**: ≤20ms/tick average under normal load
- **Memory Growth**: <0.5% growth per 10k ticks  
- **Queue Processing**: Support 100+ jobs per tick without saturation

### Operational Requirements
- **Monitoring**: All changes must maintain logging compatibility
- **Rollback**: Each PR must include rollback procedures  
- **Testing**: Unit tests required for all new functionality

## Next Actions

### Immediate (Next 1-2 days)
1. **Implement PR#4** (Guard Memory Writes)
   - Export `trimQueue` function if not already done
   - Add conditional writes to avoid unnecessary Memory operations
   - Add unit test for memory write optimization
   
2. **Begin PR#5** (CostMatrix Cache)  
   - Create `src/core/pathCache.ts` skeleton
   - Design cache key strategy (room name + tick)
   - Implement basic get/set operations

### Short-term (Next 1 week)  
3. **Complete PR#5** (CostMatrix Cache)
   - Integrate cache with existing movement code
   - Add comprehensive test coverage
   - Performance validation with CPU profiling

4. **Plan Phase 2** work
   - Design memory management architecture
   - Plan room planner enhancement scope
   - Establish performance monitoring baseline

## Risk Mitigation

### Technical Risks
- **Performance Regression**: Each change validated with CPU profiling
- **Memory Leaks**: Bounded collections and cleanup routines required
- **Queue Saturation**: Maintain job processing limits and failure handling

### Operational Risks  
- **Production Impact**: All changes tested in PTR/private shard first
- **Rollback Complexity**: Each PR includes specific rollback steps
- **Integration Issues**: Maintain backward compatibility with existing systems

## Success Metrics

### Immediate (Phase 0) ✅ ACHIEVED
- [x] Queue trimming bug eliminated
- [x] Performance stats bounded (memory growth controlled)
- [x] Log I/O optimized (batched async writes)
- [x] All tests passing (35/35)

### Short-term (Phase 1)
- [ ] CPU usage reduced by 30% through path caching
- [ ] Memory writes reduced by 50% through guard logic
- [ ] Zero queue saturation events under normal load

### Long-term (Phase 2)
- [ ] Colony capable of managing 5+ rooms efficiently  
- [ ] Memory usage stable over 100k+ ticks
- [ ] Automated room expansion with optimal building placement

## Implementation Notes

### Code Quality Standards
- TypeScript strict mode enforced
- 100% test coverage for new functionality  
- ESLint/Prettier formatting compliance
- Comprehensive inline documentation

### Deployment Strategy
- Staged rollout: PTR → private shard → main shard
- Canary room approach for testing new features
- Automated rollback triggers for performance degradation
- Comprehensive monitoring during deployment

---

**Plan Status**: Phase 0 complete, Phase 1 ready to begin  
**Next Review**: After PR#4 and PR#5 completion  
**Estimated Completion**: 2-3 weeks for full Phase 1+2 implementation