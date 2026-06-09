import * as migration_20260602_205240 from './20260602_205240';
import * as migration_20260602_213541 from './20260602_213541';
import * as migration_20260608_152557_drop_content_column from './20260608_152557_drop_content_column';

export const migrations = [
  {
    up: migration_20260602_205240.up,
    down: migration_20260602_205240.down,
    name: '20260602_205240',
  },
  {
    up: migration_20260602_213541.up,
    down: migration_20260602_213541.down,
    name: '20260602_213541',
  },
  {
    up: migration_20260608_152557_drop_content_column.up,
    down: migration_20260608_152557_drop_content_column.down,
    name: '20260608_152557_drop_content_column'
  },
];
