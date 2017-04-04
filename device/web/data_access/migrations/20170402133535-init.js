'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('sessions', {
    id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
    sessionDate: 'timestamp'
  })
  .then(
    function(result) {
      db.createTable('probes', {
        id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
        name: 'string'
      });
    },
    function(err) {
      return;
    }
  )
  .then(
    function(result) {
      db.createTable('probereadings', {
        id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
        temperature: 'decimal',
        probeId: {
                    type: 'int',
                    unsigned: true,
                    foreignKey: {
                        name: 'probeIdForeignKey',
                        table: 'probes',
                        rules: {
                            onDelete: 'RESTRICT'
                        },
                        mapping: 'id'
                    }
                  },
        sessionId: {
                    type: 'int',
                    unsigned: true,
                    foreignKey: {
                        name: 'sessionIdForeignKey',
                        table: 'sessions',
                        rules: {
                            onDelete: 'RESTRICT'
                        },
                        mapping: 'id'
                    }
                  }
      });
    },
    function(err) {
      return;
    }
  );
};

exports.down = function(db) {
  return db.dropTable('probereadings')
    .then(
      function(result) {
        db.dropTable('probes');
      },
      function(err) {
        return;
      }
    ).then(
      function(result) {
        db.dropTable('sessions');
      },
      function(err) {
        return;
      }
    );
};

exports._meta = {
  "version": 1
};