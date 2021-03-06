const mysql =require('mysql2');


const dbconfig={
    host:'localhost',
    database:'bookstore',
    user:'root',
    password:'aastha08'
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

exports.buybook=function buybook(obj,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `insert into customer values(?,?,?)`,
        [obj.email, obj.name, obj.address],
        (err) => {
            if (err) throw err;
            conn.query(
                `insert into customer_phonenum values(?,?)`,
                [obj.email, obj.phone],
                (err) => {
                    if (err) throw err;
                    conn.query(
                        `insert into book_purchased values(?,?,?)`,
                        [obj.isbn, obj.email, obj.date],
                        (err) => {
                            if (err) throw err;
                            conn.query(
                                ` update popularity set  quantity=quantity-1 where quantity in (select quantity from book where ISBN=?);`,[obj.isbn],
                                (err)=>{
                                    if(err) throw err;
                                    conn.query(
                                        `update book set quantity=quantity-1 where ISBN=?`,[obj.isbn],
                                        (err)=> {
                                            if (err) throw err;
                                            cb()
                                        })
                                }
                            )
                        }
                    )
                }
            )
        }
    )
}
exports.showBooks=function select(cb) {
    const conn = mysql.createConnection(dbconfig);
     conn.query(
          `select * from ( select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN ) b natural join ( select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p;`,
            (err,rows) =>{
              if(err) throw err;
               cb(rows);
             }
        )
};
exports.findnames=function select(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `(select name from publisher) union (select name from author) union (select genre from book);`,
    (err,rows)=>{
        if(err) throw err;
        cb(rows);
    }
    )
};
exports.filterbyprice=function select(cb) {
    const conn=mysql.createConnection(dbconfig);
    conn.query(
        `select * from (select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN ) b natural join (select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p order by price;`,
        (err,rows)=>{
            if(err) throw err;
            cb(rows);
         }
    )
};
exports.filterbypopularity=function select(cb) {
    const conn=mysql.createConnection(dbconfig);
    conn.query(
        `select * from (select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN ) b natural join (select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p order by popularity_rate desc;`,
        (err,rows)=>{
            if(err) throw err;
            cb(rows);
        }
    )
};
exports.filterbystock=function select(cb) {
    const conn=mysql.createConnection(dbconfig);
    conn.query(
        `select * from (select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN ) b natural join (select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p order by quantity desc;`,
        (err,rows)=>{
            if(err) throw err;
            cb(rows);
        }
    )
};

exports.showBook=function select(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select * from ( select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN  ) b natural join ( select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p ;`,
        (err,rows) =>{
            if(err) throw err;
            cb(rows);
        }
    )
};

exports.findauthor=function findauthor(name,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select * from ( select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN ) b natural join ( select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p where author_name=?;`,[name],
        (err,rows)=>{
            if (err) throw err;
            cb(rows);
        }
    )
};
exports.findpublisher=function findauthor(name,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select * from ( select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN  ) b natural join ( select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p where publisher_name=?;`,[name],
        (err,rows)=>{
            if (err) throw err;
            cb(rows);
        }
    )
};
exports.findgenre=function findauthor(name,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select * from ( select book.*,popularity_rate from book join popularity on book.ISBN = popularity.ISBN  ) b natural join ( select ISBN, author_name from written_by) a natural join (select *  from published_in  natural join isbncode) p where genre=?;`,[name],
        (err,rows)=>{
            if (err) throw err;
            cb(rows);
        }
    )
}
exports.plusBook=function plusBook(isbn,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
       ` update popularity set  quantity=quantity+1 where quantity in (select quantity from book where ISBN=?);`,[isbn],
        (err)=>{
        if(err) throw err;
         conn.query(
             `update book set quantity=quantity+1 where ISBN=?`,[isbn],
               (err)=> {
                   if (err) throw err;
                   cb()
               })
        }
        )
}
exports.minusBook=function plusBook(isbn,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        ` update popularity set  quantity=quantity-1 where quantity in (select quantity from book where ISBN=?);`,[isbn],
        (err)=>{
            if(err) throw err;
            conn.query(
                `update book set quantity=quantity-1 where ISBN=?`,[isbn],
                (err)=> {
                    if (err) throw err;
                    cb()
                })
        }
    )
}
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
                                `delete from popularity where ISBN=?; `,
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
        };



