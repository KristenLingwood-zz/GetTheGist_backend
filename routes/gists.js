const express = require('express');
const router = express.Router();
const db = require('../db/index');
const APIError = require('../APIError');
const { validate } = require('jsonschema');
const gistPostSchema = require('../schemas/gistPostSchema');

// GET /gists
router.get('/', async (req, res, next) => {
  try {
    let data;
    data = await db.query('SELECT * FROM gists');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

// POST /gists

router.post('/', async (req, res, next) => {
  try {
    let validation = validate(req.body, gistPostSchema);
    if (!validation.valid) {
      return next(
        new APIError(
          400,
          'Bad Request, gist format not valid',
          validation.errors.map(e => e.stack).join('. ')
        )
      );
    }
    let newGist = await db.query(
      `INSERT INTO gists (filename, description, extension, content) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        req.body.filename,
        req.body.description,
        req.body.extension,
        req.body.content
      ]
    );
    return res.json(newGist.rows[0]);
  } catch (err) {
    return next(err);
  }
});

// GET /gists/:gistID
router.get('/:gistID', async (req, res, next) => {
  try {
    let foundGist = await db.query(
      `SELECT filename, description, content FROM gists WHERE id=$1`,
      [req.params.gistID]
    );
    return res.json(foundGist.rows[0]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
