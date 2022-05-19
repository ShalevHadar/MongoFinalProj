const { UserModel } = require("../users/model");
const { costModel } = require("./model");

const createItem = async (data) => {
  const item = new costModel({
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
  });

  await item.save();

  const user = await UserModel.findOneAndUpdate(
    { personal_id: data.personal_id },
    { $push: { items: item._id } }
  );

  if (!user) {
    throw new Error("no such user;");
  }

  
};

const deleteItem = async (data) => {
  await UserModel.updateOne(
    { personal_id: data.personal_id },
    { $pull: { items: data.id } }
  );

  await costModel.deleteOne({
    _id: data.id,
  });

};

module.exports = {
  createItem,
  deleteItem,
};
