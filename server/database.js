const moment = require('moment');
moment.locale('zh-cn');

var low = require('lowdb');
const db = low('db.json', { storage: require('lowdb/lib/file-async'), writeOnChange: false });


db.defaults({'records':[]}).value();
(async () => {await db.write();})();

db.save_record = function (data)  {
    db.get('records').push( 
      {name: data.name,
        time: moment(data.time).format("YYYY-MM-DD HH:mm:ss"),
        content: decodeURI(data.data)
      }).value();
    return db.write();
};

module.exports = db;

