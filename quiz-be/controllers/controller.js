import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import AppState from "../models/appStateSchema.js";
import { questions, answers } from "../database/data.js";


function isAdmin(TOKEN_ADMIN) {
  if (process.env.TOKEN_ADMIN !== TOKEN_ADMIN) {
    return false;
  }
  return true;
}

/** App State */
export async function getQuizState(req, res) {
  try {
    const r = await AppState.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

export async function insertQuizState(req, res) {
  if (!isAdmin(req.body.TOKEN_ADMIN)) {
    res.status(401).json({ msg: "YOU ARE NOT ADMIN"});
    return;
  }

  try {
    await AppState.insertMany({ 
      turnOn: req.body.turnOn,
      turnOff: req.body.turnOff, //high priority
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    }).then(function () {
      res.json({ msg: "App state inserted"});
    })
  } catch (error) {
    res.json({ error });
  }
}


async function isStartApp() {
  try {
    const appState = await AppState.find();
    if (appState && appState.length > 0) {
      const {turnOff, turnOn, startDate, endDate} = appState[0];
      if (turnOff == true) {
        return false;
      }
      if (turnOn == true) {
        return true;
      }
      const currentDate = new Date();
      if (currentDate >= startDate && currentDate <= endDate) {
        return true;
      }
    }
  } catch (error) {
    res.json({ error });
  }
  return false;
}

/** QUESTIONS */
export async function getQuestions(req, res) {
  if(! await isStartApp()) {
    res.status(404).json({ msg: "TOO EARLY OR TOO LATE"});
    return;
  }
  try {
    const q = await Questions.find();
    if (q && q.length > 0) {
      const arrayQuestions = q[0]?.questions;

      // Custom shuffle function
      const shuffledQuestions = shuffleArray(arrayQuestions);

      // Return the first 20 elements of the shuffled array
      const limitedQuestions = shuffledQuestions.slice(0, 20);

      res.json(limitedQuestions);
    } else {
      res.json("No questions");
    }
  } catch (error) {
    res.json({ error });
  }
}

// Custom shuffle function (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export async function insertQuestions(req, res) {
  if (!isAdmin(req.body.TOKEN_ADMIN)) {
    res.status(401).json({ msg: "YOU ARE NOT ADMIN"});
    return;
  }
  try {
    await Questions.insertMany({ questions: questions, answers }).then(function () {
      res.json({ msg: "Questions inserted"});
    })
  } catch (error) {
    // res.json({ error });
    console.error("Error inserting questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteQuestions(req, res) {
  if (!isAdmin(req.body.TOKEN_ADMIN)) {
    res.status(401).json({ msg: "YOU ARE NOT ADMIN"});
    return;
  }
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions deleted"});
  } catch (error) {
    res.json({ error });
  }
}

/** RESULT */
export async function getResult(req, res) {
  try {
    const r = await Results.find({}, { result: 0 });
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

async function calculatePoint(answers, time) {
  let trueCount = 0;
  const q = await Questions.find();
  const arrayResult= q[0]?.answers;
  const systemAnswers = {};

  Object.keys(answers).forEach((questionId, index) => {
    const userAnswer = parseInt(answers[questionId], 10);
    const correctAnswer = arrayResult[questionId-1];

    if (userAnswer === correctAnswer) {
      trueCount++;
    }

    systemAnswers[questionId] = correctAnswer;
  })

  const points = trueCount ? (trueCount * 100 +  time ) : 0;
  return { points, systemAnswers };
}

async function calculateRank(points, time, username) {
  const userCount = await Results.countDocuments({
    $or: [
      { points: { $gt: points } },
      {
        $and: [
          { points: { $eq: points } },
          {
            $or: [
              { time: { $lt: time } },
              {
                $and: [
                  { time: { $eq: time } },
                  { username: { $lt: username } }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  return userCount + 1;
}

export async function storeResult(req, res) {
  if(! await isStartApp()) {
    res.status(404).json({ msg: "TOO EARLY OR TOO LATE"});
    return;
  }
  try {
    if (!req?.body?.username && !req?.body?.university && !req?.body?.answers) throw new Error('Data not valid ...');

    const { points, systemAnswers} = await calculatePoint(req.body.answers, req.body.time);

    const data = {
      username: req?.body?.username,
      university: req?.body?.university,
      result: [req.body.answers],
      attempts: 1,
      points: points,
      achieved: 'Good',
      time: req?.body?.time,
      systemAnswers: systemAnswers,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    Results.create(data).then( async function () {
      const rank = await calculateRank(data.points, data.time, data.username);
      res.json({ data, rank });
    })
  } catch (error) {
    res.json({ error });
  }
}

export async function deleteResult(req, res) {
  if (!isAdmin(req.body.TOKEN_ADMIN)) {
    res.status(401).json({ msg: "YOU ARE NOT ADMIN"});
    return;
  }
  try {
    await Results.deleteMany();
    res.json({ msg: "Results deleted"});
  } catch (error) {
    res.json({ error });
  }
}