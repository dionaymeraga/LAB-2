import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(200).json({ ...post, isSaved: false });
        }
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    console.log("Request body:", body);
    console.log("User ID from token:", tokenUserId);

    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        address: body.address,
        price: body.price,
        bedroom: body.bedroom,
        bathroom: body.bathroom,
        city: body.city,
        latitude: body.latitude.toString(), // Ensure latitude is a string
        longitude: body.longitude.toString(), // Ensure longitude is a string
        type: body.type, // Ensure type is included
        property: body.property, // Ensure property is included
        userId: tokenUserId,
        postDetail: {
          create: {
            size: body.size,
            utilities: body.utilities,
            pet: body.pet,
            income: body.income,
            school: body.school,
            bus: body.bus,
            restaurant: body.restaurant,
            desc: body.content, // Ensure desc is included
          },
        },
        images:
          body.images && body.images.length > 0
            ? { create: body.images.map((image) => ({ url: image.url })) }
            : undefined, // Handle empty images array
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        address: body.address,
        price: body.price,
        bedroom: body.bedroom,
        bathroom: body.bathroom,
        city: body.city,
        latitude: body.latitude.toString(), // Ensure latitude is a string
        longitude: body.longitude.toString(), // Ensure longitude is a string
        type: body.type, // Ensure type is included
        property: body.property, // Ensure property is included
        postDetail: {
          update: {
            size: body.size,
            utilities: body.utilities,
            pet: body.pet,
            income: body.income,
            school: body.school,
            bus: body.bus,
            restaurant: body.restaurant,
            desc: body.content, // Ensure desc is included
          },
        },
        images: {
          deleteMany: {},
          create:
            body.images && body.images.length > 0
              ? body.images.map((image) => ({ url: image.url }))
              : [], // Handle empty images array
        },
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
