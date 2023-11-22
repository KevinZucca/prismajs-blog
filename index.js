const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const posts = require("./posts.json");

function create() {
  prisma.post
    .createMany({
      data: posts.map((post) => {
        return post;
      }),
    })
    .then((result) => {
      console.log("creata nuova lista", result);
    })
    .catch((err) => console.error(err));
}

function read(slug) {
  prisma.post
    .findUnique({
      where: {
        slug: slug,
      },
    })
    .then((post) => {
      console.log("il post è: ", post);
    });
}

create();
read("intervista-sviluppatore-indie-game");
