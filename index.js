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
    .findUniqueOrThrow({
      where: {
        slug: slug,
      },
    })
    .then((post) => {
      console.log("il post è: ", post);
    });
}

function allPosts() {
  prisma.post
    .findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    .then((posts) => {
      console.log("Tutti i post: ", posts);
    })
    .catch((err) => console.error(err));
}

function editPost(id) {
  prisma.post
    .update({
      where: {
        id: id,
      },
      data: {
        content: "Articolo attualmente senza contenuto",
      },
    })
    .then((post) => {
      console.log("post aggiornato: ", post);
    })
    .catch((err) => console.error(err));
}

// create();
// read("intervista-sviluppatore-indie-game");
// allPosts();
editPost(4);
