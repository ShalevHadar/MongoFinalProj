const { UserModel } = require("./model");

const createUser = async (data) => {
  const user = new UserModel({
    personal_id: data.personal_id,
    first_name: data.first_name,
    last_name: data.last_name,
    birthday: data.birthday,
    marital_status: data.marital_status,
  });
  
  await user.save();
}


module.exports = {
  createUser,
  };
