const Sequelize = require("sequelize");
require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const moment =require('moment')
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
        drop table if exists users;
        drop table if exists posts;
            create table users (
            user_id serial primary key,
            username varchar(255),
            email varchar(155) not null,
            passhash  varchar(255) not null,
            coverPic varchar(255),
            profilePic varchar(255)
        );
           create table posts (
                post_id serial primary key,
                userId int not null references users(user_id) on delete cascade on update cascade, 
                content text,
                image text,
                createdAt TIMESTAMP
            );

            create table comments (
                comment_id serial primary key,
                 createdAt TIMESTAMP,
                comment_post_id int not null references posts(post_id) on delete cascade on update cascade,
                comment_user_id int not null references users(user_id) on delete cascade on update cascade,
                content text
            );
            

                insert into users(username, email, passhash, coverPic, profilePic)
                values('AdamSendler', 'sendler@gmail.com','123456', 'img.jpg', 'image.gpg'),
                ('TomCruz', 'tom@gmail.com', '123456', 'img.jpg', 'image.gpg'),
                ('Jessica', 'jess@gmail.com', '6788', 'img.jpg', 'image.gpg');


                insert into posts( userid,content, image)
                values( 1,'Lello everyone', 'img.jpg'),
                ( 2, 'Great day', 'img.jpg'),
                (3,  'Dont be shy', 'img.jpg'),
                (4, 'Everyone is amazing', 'img.jpg'),
                (5, 'Green tea', 'img.jpg');

                insert into comments(content, comment_post_id, comment_user_id)
                values('Thank you', 1, 2),
                ('My pleasure', 3, 2),
                ('Grate movie', 8, 4),
                ('I love this city', 5, 1):
                        `
      )
      .then(() => {
        console.log("DB seeded successfully!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  getAllPosts: (req, res) => {
    sequelize
      .query(
        `
            SELECT p.*, userid as userId,username, profilePic FROM posts as p join users as u on (userid = p.userId);
            `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
    },
    createPost: (req, res) => {
       const {  content, image, createdAt, userid} = req.body;
       const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        sequelize
          .query(
            `insert into posts ( content, image, createdAt, userid)
            values ('${content}', '${image}', '${date}','${userid}');
               `
          )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => console.log(err));
    },
    deletePost: (req, res) => {
        const {post_id} =req.params
        sequelize.query(
            `
          
            `
      )
    },
    getComments: (req, res) => {
        const {post_id} = req.body
    sequelize
      .query(
        `

               SELECT c.*, comment_user_id as userid,username, profilePic FROM comments as c join users as u on (comment_user_id = c.comment_user_id);
            

            `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log(err));
    }
};
