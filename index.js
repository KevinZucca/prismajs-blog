const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const posts = require("./posts.json");

function createPosts() {
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

function readPost(slug) {
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

function getAllPosts() {
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

function getPublishedPosts() {
  prisma.post
    .findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        content: true,
        published: true,
      },
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    .then((posts) => {
      console.log("Tutti i post pubblicati: ", posts);
    })
    .catch((err) => console.error(err));
}

function getPostFromContent(content) {
  prisma.post
    .findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        content: true,
        published: true,
      },
      where: {
        content: {
          contains: content,
        },
      },
    })
    .then((posts) => {
      console.log(`Tutti i post contenenti '${content}' :`, posts);
    })
    .catch((err) => console.error(err));
}

function deletePost(id) {
  prisma.post
    .delete({
      where: {
        id: id,
      },
    })
    .then((post) => {
      console.log(`Il post ${post} è stato eliminato`);
    })
    .catch((err) => console.error(err));
}

// createPosts();
// readPost("intervista-sviluppatore-indie-game");
// getAllPosts();
// editPost(4);
// deletePost(10)
// getPublishedPosts();
getPostFromContent("un");
