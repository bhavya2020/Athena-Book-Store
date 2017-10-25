const mysql =require('mysql2');
const config=require('../config.json');

const dbconfig={
    host:config.DB.host,
    database:config.DB.database,
    user:config.DB.user,
    password:config.DB.password
};

// exports.addBook= function insertBook(task,cb) {
//     const conn = mysql.createConnection(dbconfig);
//   conn.query(
//       `insert into book(od,task,done) values (1,?,false);`,
//        [task],
//        (err) => {
//        if (err) throw err;
//        cb();
//        }
//       )
// };
exports.showBooks=function select(cb) {
    const conn = mysql.createConnection(dbconfig);
     conn.query(
          `select * from ( select * from book  natural join popularity ) b natural join ( select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p ;`,
            (err,rows) =>{
              if(err) throw err;
               cb(rows);
             }
        )
};



exports.deleteBook=function deleteBook(isbn,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `delete from book where ISBN=?;`,
        [isbn],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};


