const User = require("../models/userMode")
exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({})
    res.status(200).json({
      success: true,
      message: "all products",
      user
    })
  } catch (error) {
    return res.status(404);
  }
}


exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).json({
    sucess: true,
    message: "user create",
    user
  })
}

exports.editUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "user not found"
    })
  }
  user = await User.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({
    sucess: true,
    message: "user update",
    user
  })
}


exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "user not found"
    })
  }
  await user.deleteOne();
  return res.status(201).json({
    sucess: true,
    message: "user delete"
  })
}
exports.addSubject = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "user not found"
    })
  }

  const { sub } = req.body;

  let Subject = user.Subject;
  Subject.push(sub)

  user = await User.findByIdAndUpdate(req.params.id, { Subject });

  return res.status(201).json({
    sucess: true,
    user
  })
}

exports.deletesubject = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "user not found"
    })
  }
  const { key } = req.body;
  let Subject = user.Subject;
  Subject.splice(key, 1);
  user = await User.findByIdAndUpdate(req.params.id, { Subject });
  return res.status(201).json({
    sucess: true,
    user
  })
}


exports.updateSubject = async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "user not found"
    })
  }
  const { key, sub } = req.body;
  let Subject = user.Subject;
  for (let i = 0; i < Subject.length; i++) {
    if (i == key) {
      Subject[i] = sub;
    }
  }
  user = await User.findByIdAndUpdate(req.params.id, { Subject });
  return res.status(201).json({
    sucess: true,
    user
  })
}