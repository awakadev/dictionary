export default {
  mapCollection(collection, options = { keepDeleted: false, log: false }) {
    if (collection.empty) {
      return [];
    }

    const list = [];
    const idProperty = options.log ? 'logId' : 'id';

    collection.forEach((document) => {
      list.push(
        Object.assign({}, document.data(), {
          [idProperty]: document.id,
        }),
      );
    });

    if (options.keepDeleted) {
      return list;
    }

    return list.filter(item => !item.deletedAt);
  },

  mapDocument(document, options = { keepDeleted: false, log: false }) {
    if (!document.exists) {
      return null;
    }

    const idProperty = options.log ? 'logId' : 'id';
    const item = Object.assign({}, document.data(), {
      [idProperty]: document.id,
    });

    if (options.keepDeleted) {
      return item;
    }

    if (item.deletedAt) {
      return null;
    }

    return item;
  },
};
