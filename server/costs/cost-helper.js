const { UserModel } = require("../users/model");
const { costModel } = require("./model");

const createItem = async (data) => {
  const item = new costModel({
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    createdBy: data.personal_id
  });

  const user = await UserModel.updateOne(
    { personal_id: data.personal_id },
    {$push: { items: item._id }, $inc: {sum: item.price}}
  );

  if (!user) {
    throw new Error("no such user");
  }

  await item.save();
  
};

const deleteItem = async (data) => {
  const item = await costModel.findOneAndDelete({
    _id: data.id,
  });

  if (!item) {
    throw new Error("no such item");
  }
  
  const user = await UserModel.findOneAndUpdate(
    { personal_id: data.personal_id },
    { $pull: { items: data.id }, $inc: {sum: item.price*-1} }
  );

  const items = await getAllItems(data.personal_id);

  return {items, user, item};
  
};

const getAllItems = async (id) => {
  const items = await costModel.find({
    createdBy: id
  });
  return items;
}

module.exports = {
  createItem,
  deleteItem,
  getAllItems
};
