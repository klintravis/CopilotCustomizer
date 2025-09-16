# Colony Rebuild Implementation Guide

**Companion to**: colony-rebuild-plan.md  
**Purpose**: Step-by-step implementation instructions for Screeps colony optimization

## Pre-Implementation Checklist

### Environment Setup
- [ ] Backup current colony codebase
- [ ] Ensure Jest test environment is working (`npm test`)
- [ ] Verify build process (`npm run build`)
- [ ] Set up PTR/private shard for testing

### Current Status Validation
- [ ] Confirm Phase 0 PRs are implemented:
  - [ ] trimQueue fix in `src/core/kernel.ts`
  - [ ] Performance stats bounds in `src/utils/memory.ts`  
  - [ ] Batched logging in `scripts/monitor-logs.js`
- [ ] All tests passing (should be 35/35)
- [ ] No build errors

## Phase 1 Implementation: Movement & Path Optimization

### PR#4: Guard Memory Writes

#### Files to Modify
- `src/core/kernel.ts`

#### Implementation Steps
1. **Identify Memory Write Points**
   ```bash
   # Search for Memory.jobQueue writes
   grep -r "Memory\.jobQueue" src/core/
   ```

2. **Add Conditional Logic**
   ```typescript
   // In kernel.ts seed functions
   function seedJobs() {
       const newQueue = generateJobQueue();
       // Only write if changed
       if (JSON.stringify(Memory.jobQueue) !== JSON.stringify(newQueue)) {
           Memory.jobQueue = newQueue;
       }
   }
   ```

3. **Create Test**
   ```typescript
   // src/core/__tests__/guardWrites.test.ts
   describe('Memory Guard Writes', () => {
       it('should not write unchanged jobQueue', () => {
           // Test logic here
       });
   });
   ```

#### Validation
- [ ] Memory writes reduced (monitor via console logs)
- [ ] All existing tests still pass
- [ ] New test validates guard logic

### PR#5: Per-Room CostMatrix Cache

#### Files to Create/Modify
- **New**: `src/core/pathCache.ts`
- **Modify**: `src/utils/movement.ts` (or equivalent movement file)

#### Implementation Steps

1. **Create Cache Module** (`src/core/pathCache.ts`)
   ```typescript
   interface CacheEntry {
       matrix: CostMatrix;
       tick: number;
       room: string;
   }

   class PathCache {
       private cache: Map<string, CacheEntry> = new Map();
       
       getRoomCostMatrix(roomName: string): CostMatrix | null {
           const key = `${roomName}_${Game.time}`;
           const entry = this.cache.get(key);
           
           if (entry && entry.tick === Game.time) {
               return entry.matrix;
           }
           return null;
       }
       
       setRoomCostMatrix(roomName: string, matrix: CostMatrix): void {
           const key = `${roomName}_${Game.time}`;
           this.cache.set(key, {
               matrix,
               tick: Game.time,
               room: roomName
           });
           
           // Cleanup old entries
           this.cleanup();
       }
       
       private cleanup(): void {
           const currentTick = Game.time;
           for (const [key, entry] of this.cache.entries()) {
               if (currentTick - entry.tick > 5) { // Keep for 5 ticks
                   this.cache.delete(key);
               }
           }
       }
   }

   export const pathCache = new PathCache();
   ```

2. **Update Movement Code**
   ```typescript
   // In movement utility file
   import { pathCache } from './pathCache';

   function getMovementMatrix(roomName: string): CostMatrix {
       // Try cache first
       let matrix = pathCache.getRoomCostMatrix(roomName);
       
       if (!matrix) {
           // Generate new matrix
           matrix = generateCostMatrix(roomName);
           pathCache.setRoomCostMatrix(roomName, matrix);
       }
       
       return matrix;
   }
   ```

3. **Create Tests**
   ```typescript
   // src/core/__tests__/pathCache.test.ts
   describe('PathCache', () => {
       it('should cache and retrieve matrices', () => {
           // Test cache hit/miss behavior
       });
       
       it('should cleanup old entries', () => {
           // Test cleanup logic
       });
   });
   ```

#### Validation
- [ ] CPU usage reduction (monitor via Game.cpu.getUsed())
- [ ] Cache hit rate >80% for active rooms
- [ ] Memory usage stable (no cache leaks)
- [ ] All movement functions still work correctly

## Phase 2 Implementation: Memory & Performance Hardening

### PR#6: Memory Management Overhaul

#### Scope & Planning
1. **Memory Audit**
   ```bash
   # Add memory monitoring to identify large objects
   console.log('Memory usage by key:', JSON.stringify(
       Object.keys(Memory).map(key => ({
           key,
           size: JSON.stringify(Memory[key]).length
       }))
   ));
   ```

2. **Implement Compression**
   - Identify repetitive data patterns
   - Create compression utilities
   - Add decompression logic

3. **Add Cleanup Routines**
   - Remove stale creep memory
   - Archive old performance data
   - Clean unused room data

### PR#7: Room Planning Enhancement

#### Architecture Design
1. **Building Placement Algorithm**
   - Terrain analysis
   - Distance optimization
   - Upgrade path planning

2. **Expansion Logic**  
   - Room scoring system
   - Resource evaluation
   - Threat assessment

## Execution Timeline

### Week 1: Foundation
- Days 1-2: PR#4 (Guard Memory Writes)
- Days 3-5: PR#5 (CostMatrix Cache) - Basic implementation
- Days 6-7: Testing and validation

### Week 2: Optimization  
- Days 1-3: PR#5 completion and fine-tuning
- Days 4-7: Begin PR#6 planning and initial implementation

### Week 3: Advanced Features
- Days 1-4: Complete PR#6 (Memory Management)
- Days 5-7: Begin PR#7 (Room Planning)

### Week 4: Integration & Testing
- Days 1-3: Complete PR#7
- Days 4-5: End-to-end testing
- Days 6-7: Production deployment

## Performance Monitoring

### Metrics to Track
```typescript
// Add to main loop
const startCPU = Game.cpu.getUsed();

// ... colony logic ...

const endCPU = Game.cpu.getUsed();
console.log(`Tick ${Game.time}: CPU ${endCPU - startCPU}ms`);

// Memory tracking
console.log(`Memory: ${JSON.stringify(Memory).length} chars`);
```

### Performance Targets
- **CPU**: <20ms average per tick
- **Memory**: <2MB total usage
- **Cache Hit Rate**: >80% for path cache
- **Queue Processing**: 100+ jobs/tick capacity

## Rollback Procedures

### Per-PR Rollback
1. **PR#4**: Remove conditional logic, restore direct writes
2. **PR#5**: Remove cache imports, restore direct matrix generation
3. **PR#6**: Restore original memory structures
4. **PR#7**: Disable room planning, use manual expansion

### Emergency Rollback
```bash
# Full codebase rollback
git revert <commit-hash>
npm run build
npm run deploy
```

## Success Validation

### Automated Checks
- All Jest tests passing
- Build successful without warnings
- TypeScript compilation clean
- No lint errors

### Performance Validation  
- CPU usage within targets
- Memory growth controlled
- No queue saturation
- Stable operation over 1000+ ticks

### Production Readiness
- PTR testing successful
- Private shard validation complete
- Monitoring dashboards functional
- Rollback procedures tested

---

**Implementation Status**: Ready to begin Phase 1  
**Next Action**: Execute PR#4 (Guard Memory Writes)  
**Owner**: Development team  
**Review Cadence**: After each PR completion