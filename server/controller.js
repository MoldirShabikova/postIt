require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;
const moment = require("moment");

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
                values('Adam Sendler', 'sendler@gmail.com','123456', 'img.jpg', 'image.gpg'),
                ('Tom Cruz', 'tom@gmail.com', '123456', 'http://images4.fanpop.com/image/photos/16300000/Random-people-random-16382026-600-800.jpg', 'http://images4.fanpop.com/image/photos/16300000/Random-people-random-16382026-600-800.jpg'),
                ('Jessica', 'jess@gmail.com', '6788', 'https://img.freepik.com/premium-photo/adult-handsome-indian-businessman-solving-intelligence-challenge_621325-1913.jpg?w=360', 'https://img.freepik.com/premium-photo/relaxed-thinking-about-something-looking-copy-space_1187-275076.jpg?w=360');


                insert into posts( userid,content, image)
                values( 1,'Lello everyone', 'https://img.freepik.com/free-photo/shy-pretty-girl-with-shaggy-black-hair-dark-skin-wearing-stylish-eyeglasses_273609-13866.jpg?w=2000'),
                ( 2, 'Great day', 'https://img.freepik.com/premium-photo/relaxed-thinking-about-something-looking-copy-space_1187-275076.jpg?w=360'),
                (3,  'Dont be shy', 'https://img.freepik.com/free-photo/chek-it-out-intrigued-attractive-flirty-guy-playful-romantic-mood-holding-hand-beard-looking-right-smiling-with-pleased-curious-expression_176420-24540.jpg?auto=format&h=200'),
                (4, 'Everyone is amazing', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyx9MT0ZYe6uRGTdkjdAPhcK_KY4G8jDOtplrVt1ktRseDLEzh8951NNp_aiYuJy4smxg&usqp=CAU'),
                (5, 'Green tea', 'https://thumbs.dreamstime.com/b/young-arab-doctor-man-standing-over-isolated-background-waiving-saying-hello-happy-smiling-friendly-welcome-gesture-240697509.jpg');

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
                        SELECT p.*, userid as userId,username, image, profilePic FROM posts as p join users as u on (userid = p.userId);
                        `
                )
                .then((dbRes) => {
                    res.status(200).send(dbRes[0]);
                })
                .catch((err) => console.log(err));
          },
                createPost: (req, res) => {
                const { content, image, createdAt, userid } = req.body;
                const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
                sequelize
                .query(
                    `insert into posts ( content, image, createdAt, userid)
                        values ('${content}', '${image}', '${date}','${userid}');
                        `
                )
                    .then(() => {
                     console.log("Created new post successfully!");
                    res.sendStatus(200);
                })
                .catch((err) => console.log(err));
    },
    // updatePost: (req, res) => {
    //     const { content, image , userInfo} = req.body
    //     const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    //     sequelize.query(`
    //     update posts
    //     set content = '${content}',
    //     image = '${image}',
        
    //     `)
                    
                // },
            deletePost: (req, res) => {
                const { post_id } = req.params;
                sequelize.query(
                `
                    
                        `
                );
            },
            getComments: (req, res) => {
                const { post_id } = req.body;
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
            },
};
