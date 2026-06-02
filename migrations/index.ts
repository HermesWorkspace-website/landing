import * as migration_20260602_205240 from './20260602_205240';
import * as migration_20260602_213541 from './20260602_213541';

export const migrations = [
  {
    up: migration_20260602_205240.up,
    down: migration_20260602_205240.down,
    name: '20260602_205240',
  },
  {
    up: migration_20260602_213541.up,
    down: migration_20260602_213541.down,
    name: '20260602_213541'
  },
];
