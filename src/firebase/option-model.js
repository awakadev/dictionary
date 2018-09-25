export default {
  fromDatabaseMap(raw) {
    if (!raw) {
      return [];
    }

    return Object.keys(raw).map((id) => ({
      id,
      label: raw[id]
    }));
  },

  toDatabaseMap(list) {
    if (!list) {
      return {};
    }

    const object = {};

    list.forEach((item) => {
      object[item.id] = item.label;
    });

    return object;
  }
};
