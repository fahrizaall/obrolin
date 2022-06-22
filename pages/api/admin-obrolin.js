import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getQuestion(req, res);
    case 'POST':
      return addQuestion(req, res);
    case 'PUT':
      return updateQuestion(req, res);
    case 'DELETE':
      return deleteQuestion(req, res);
  }
}

async function getQuestion(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("question")

    const data = await db.collection("questions").find({}).toArray()

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({message: error.meesage})
  }
}

async function addQuestion(req, res) {
  let data = JSON.parse(req.body)

  try {
    const client = await clientPromise
    const db = client.db("question")

    await db.collection("questions").insertOne({pertanyaan: data.pertanyaan, kategori: data.kategori})

    res.status(201).json({message: "success adding data"})
  } catch (error) {
    res.status(409).json({ message: error.meesage })
    console.log(error)
  }
}

async function updateQuestion(req, res) {
  let data = JSON.parse(req.body)

  try {
    const client = await clientPromise
    const db = client.db("question")

    await db.collection("questions").updateOne(
      { _id: new ObjectId(data.id) },
      {
        $set: {
          pertanyaan: data.pertanyaan,
          kategori: data.kategori,
        }
      }
    )

    res.status(200).json({message: "success updating data"})
  } catch (error) {
    res.status(409).json({ message: error.meesage })
    console.log(error)
  }
}

async function deleteQuestion(req, res) {
  let data = JSON.parse(req.body)

  try {
    const client = await clientPromise
    const db = client.db("question")

    await db.collection("questions").deleteOne({ _id: new ObjectId(data) })

    res.status(200).json({message: "success deleting data"})
  } catch (error) {
    res.status(409).json({ message: error.meesage })
    console.log(error)
  }
}