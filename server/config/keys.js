console.log('process.env.MONGO_USER.......', process.env.MONGO_USER);
module.exports = {
  mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.xbewr.mongodb.net/${process.env.MONGO_DB}?authSource=admin&replicaSet=atlas-dudx71-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
};
