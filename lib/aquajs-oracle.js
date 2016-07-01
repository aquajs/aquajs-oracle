"use strict";
var strongOracleSettings = {};
var aquajsOracleDriver = require('strong-oracle')(strongOracleSettings);
var oracle_pool = require('generic-pool');
var VError = require('verror');
var dbConfig = {};
var jsonSafeStringify = require('json-stringify-safe');
var queryExecTimeOut =  3000 ;

/**
 * AquaJsOracle validate the configuration parameters
 * @api public
 * @return {Error List of AquaJsOracle}
 */
function validateConfig(config) {
    var hostname  = config.hostname || config.host,
        user  = config.user,
        password  = config.password,
        port  = config.port,
        database  = config.database,
        errList = [];
    if (hostname === undefined || hostname === null || hostname === "") {
        errList.push("provide mandatory field value hostName");
    }
    if (user === undefined || user === null || user === "") {
        errList.push("provide mandatory field value user");
    }
    if (password === undefined || password === null || password === "") {
        errList.push("provide mandatory field value password");
    }
    if (port === undefined || port === null || port === "") {
        errList.push("provide mandatory field value port");
    }
    if (database === undefined || database === null || database === "") {
        errList.push("provide mandatory field value database");
    }
    return errList;
}

/**
 * AquaJsOracle get individual databse settings to connect to database
 * @api public
 * @return {DB Configuration for each Database}
 */
function getEachDBSettings(settings) {
    var eachDbConfig = {};
    if (settings.tns === undefined ||  settings.tns === null || settings.tns === "") {
        eachDbConfig.hostname = settings.hostname || settings.host;
        eachDbConfig.port = settings.port;
        eachDbConfig.database = settings.database;
    } else {
        eachDbConfig.tns = settings.tns;
    }
    eachDbConfig.user = settings.user || settings.username;
    eachDbConfig.password = settings.password;
    return eachDbConfig;
}

/**
 * AquaJsOracle constructur takes the below parameters as config arguments
 * @return {Object of AquaJsOracle}
 * @api public
 config attributes :

 name : name of pool (string, optional)
 create : function that returns a new resource
 should call callback() with the created resource
 destroy : function that accepts a resource and destroys it
 max : maximum number of resources to create at any given time
 optional (default=1)
 min : minimum number of resources to keep in pool at any given time
 if this is set > max, the pool will silently set the min
 to factory.max - 1
 optional (default=0)
 idleTimeoutMillis : max milliseconds a resource can go unused before it should be destroyed
 (default 30000)
 reapIntervalMillis : frequency to check for idle resources (default 1000),
 priorityRange : int between 1 and x - if set, borrowers can specify their
 relative priority in the queue if no resources are available.
 see example.  (default 1)
 log : true/false or function -
 If a log is a function, it will be called with two parameters:
 - log string
 - log level ('verbose', 'info', 'warn', 'error')
 Else if log is true, verbose log info will be sent to console.log()
 Else internal log messages be ignored (this is the default)
 */

var AquaJsOracle = function (config) {
    if (!(this instanceof AquaJsOracle)) {
        return new AquaJsOracle(config);
    }
    var errList = validateConfig(config);
    if (errList.length > 0) {
        throw new VError('Error while initializing the aquajs oracle  pool cause :->"%s"', jsonSafeStringify(errList));
    } else {
        this.name = config.name;
        this.max = config.max || 10;
        this.min = config.min || 0;
        this.idleTimeoutMillis = config.idleTimeoutMillis || 0;
        this.reapInterval = config.reapInterval;
        this.priorityRange = config.priorityRange;
        this.autoCommit = config.autoCommit;
        dbConfig[this.name] = getEachDBSettings(config);
        //initialize the connection pooling
        this.initConnPool();
        this.driver = aquajsOracleDriver
    }
};

/**
 * AquaJsOracle init connection pooling configuration
 * @api public
 */

AquaJsOracle.prototype.initConnPool = function () {
    if (this.pool === undefined || this.pool === null) {
        var aquaJsPool = oracle_pool.Pool({
            name : this.name,
            max : this.max,
            min : this.min,
            idleTimeoutMillis : this.idleTimeoutMillis,
            log : this.log,
            create   : function (callback) {
                try {
                    aquajsOracleDriver.connect(dbConfig[this.name], function (err, connection) {
                        callback(err, connection);
                    });
                } catch (err) {
                    var conError = new   VError(err, 'while initialize connection pool , Conenction Settings:->"%s"', dbConfig[this.name]);
                    console.error(conError);
                    callback(conError, null);
                }
            },
            destroy  : function (client) {
                try
                {
                    client.close();
                    $logger.info("Destroyed the connection...");
                }
                catch (err)
                {
                    $logger.error("Error while destroying  the used connection , more info" + err);
                }
            }
        });
        this.pool = aquaJsPool;
    }
};


AquaJsOracle.prototype.getConnection = function (name, connectionCallback){
  $logger.info("[DB Connection Pool Status --> Total: " + this.pool.getPoolSize() + ", Unused / Available: " + this.pool.availableObjectsCount() + ", Client's Waiting: " + this.pool.waitingClientsCount() + "]");
  var commit = this.autoCommit;
  this.pool.acquire(function (err, connection) {
    if (err) {
      var connAcqError = new   VError(err, ':-> error occurred while getting the connection' );
      $logger.error("Error occurred while getting connection : "+ connAcqError);
      return connectionCallback(connAcqError, null);
    }
    connection && connection.setAutoCommit(commit);
    connectionCallback(null, connection);
  });
};

AquaJsOracle.prototype.oracleErrorKey = function(err) {
  var errorDetails = err.message && err.message.split(":") ; //Generated Error Key
  switch (errorDetails[0]) {
    case 'ORA-00001':
      return "ORA_UNIQUE_KEY_VIOLATED"
      break;
    case 'ORA-00051':
      return "ORA_RESOURCE_WAITING_TIME_OUT"
      break;
    case 'ORA-00100':
      return "ORA_NO_DATA_FOUND"
      break;
    case 'ORA-03113':
      return "ORA_END_FILE_CHANNEL"
      break;
    case 'ORA-00604':
    return "ORA_RECURSIVE_SQL"
    break;
    case 'ORA-00936':
      return "ORA_MISSING_EXPRESSION"
      break;
    case 'ORA-01555':
      return "ORA_OLD_SNAP_SHOT"
      break;
    case 'ORA-27101':
      return "ORA_SHARED_MEMORY_REALM"
      break;
    case 'ORA-00911':
      return "ORA_INVALID_CHARACTER"
      break;
    case 'ORA-00933':
      return "ORA_SQL_NOT_PROPERLY_ENDED"
      break;
    case 'ORA-01422':
      return "ORA_FETCH_MORE_RECORD"
      break;
    case 'ORA-04030':
      return "ORA_OUT_OF_PROCESS_MEMORY"
      break;
    case 'ORA-00932':
      return "ORA_INCONSISTANT_DATA_TYPE"
      break;
    case 'ORA-01031':
      return "ORA_INSUFFICIENT_PRIVILEGES"
      break;
    case 'ORA-01008':
      return "ORA_NOT_ALL_VARIABLES_BOUND"
      break;
    case 'ORA-00907':
      return "ORA_MISSING_RIGHT_PARENTHESIS"
      break;
    case 'ORA-03135':
      return "ORA_CONNECTION_LOST_CONTACT"
      break;
    case 'ORA-01034':
      return "ORA_ORACLE_NOT_AVAILABLE"
      break;
    case 'ORA-00918':
      return "ORA_COLUMN_AMBIGUITY"
      break;
    case 'ORA-00600':
      return "ORA_INTERNAL_ERROR_CODE"
      break;
    default :
      return "ORA_DEFAULT"
      break;
  }
};

AquaJsOracle.prototype.releaseConnection = function (connection) {
    this.pool.release(connection);
};


AquaJsOracle.prototype.getPool = function () {
    return this.pool;
};

AquaJsOracle.prototype.getName = function () {
    return this.pool.getName();
};

AquaJsOracle.prototype.getSettings = function () {
    return this.settings;
};
AquaJsOracle.prototype.getPoolSize = function () {
    return this.pool.getPoolSize();
};

AquaJsOracle.prototype.getAvailableObjectsCount = function () {
    return this.pool.availableObjectsCount();
};

AquaJsOracle.prototype.getWaitingClientsCount = function () {
    return this.pool.waitingClientsCount();
};
// acquire connection - no priority - will go at end of line
AquaJsOracle.prototype.releasePool = function (db) {
    try
    {
        return this.pool.release(db);
    }
    catch (err)
    {
        $logger.error("Error while releasing the connection to pool , more info" + err);
    }

};

AquaJsOracle.prototype.drain = function () {
    try
    {
        this.pool.destroyAllNow();
    }
    catch (err)
    {
        $logger.error("Error while draing all the connections , more info" + err);
    }

};

module.exports = AquaJsOracle;
