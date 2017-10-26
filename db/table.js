const mysql =require('mysql2');
const config=require('../config.json');

const dbconfig={
    host:config.DB.host,
    database:config.DB.database,
    user:config.DB.user,
    password:config.DB.password
};

exports.addBook= function insertBook(obj,cb) {
    const conn = mysql.createConnection(dbconfig);
  conn.query(
       `insert into book values(?,?,?,?,?,?)`,
       [obj.isbn,obj.genre,obj.title,obj.price,obj.date,obj.quantity],
       (err) => {
       if (err) throw err;
         conn.query(
             `insert into isbncode values (?,?)`,
             [obj.country,obj.isbn],
             (err)=>{
                 if(err) throw err;
                 conn.query(
                     `insert into publisher values (?,?,?)`,
                     [obj.pub_name,obj.pub_address,obj.pub_phone],
                     (err)=>{
                         if(err) throw err;
                         conn.query(
                             `insert into published_in values (?,?)`,
                             [obj.pub_name,obj.country],
                             (err)=>{
                                 if(err) throw err;
                                 conn.query(
                                     `insert into author values (?,?,?)`,
                                     [obj.auth_name,obj.auth_address,obj.noOfBooks],
                                     (err)=>{
                                         if(err) throw err;
                                         conn.query(
                                             `insert into written_by values (?,?,?)`,
                                             [obj.isbn,obj.auth_name,obj.auth_address],
                                             (err)=>{
                                                 if(err) throw err;
                                                 cb();
                                             }

                                         )
                                     }
                                 )
                             }
                        )
                     }
                 )
             }
         )
       }
      )
};

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
        `delete from written_by where ISBN=?;`,
        [isbn],
        (err) =>{
            if(err) throw err;
            conn.query(
                `delete from published_in where country in (select country from isbncode where ISBN= ?);`,
                [isbn],
                (err)=>{
                    if (err) throw err;
                    conn.query(
                        `delete from isbncode where ISBN=?;`,
                        [isbn],
                        (err)=>{
                            if (err)throw  err;
                            conn.query(
                                `delete from popularity where quantity in ( select quantity from book where ISBN=?); `,
                                [isbn],
                                (err)=>{
                                    if(err) throw err;
                                    conn.query(
                                        `delete from book where ISBN=?;`,
                                        [isbn],
                                        (err)=>{
                                            if(err) throw err;
                                            cb();

                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        }
    )
};


