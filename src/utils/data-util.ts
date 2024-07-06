export interface MongoItem {
  _id: { toString: () => string };
  [key: string]: any;
}

export const replaceMongoIdInArray = (array: MongoItem[]) => {
  const mappedArray = array
    .map((item: MongoItem) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj: MongoItem) => {
  if (obj) {
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj;
  }
};
