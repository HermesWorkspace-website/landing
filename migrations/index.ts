import * as migration_20260602_205240 from './20260602_205240';

export const migrations = [
  {
    up: migration_20260602_205240.up,
    down: migration_20260602_205240.down,
    name: '20260602_205240'
  },
];
