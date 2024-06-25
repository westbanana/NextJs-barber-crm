// export const convertObjectToIds = <T>(object:T) => {
//   const idsObject: any = {};
//   for (const key in object) {
//     if (Array.isArray(object[key])) {
//       idsObject[key] = (object[key] as any[]).map((el) => el.id || el);
//     } else if (typeof object[key] === 'object') {
//       idsObject[key] = (object[key] as any).id;
//     } else {
//       idsObject[key] = object[key];
//     }
//   }
//   return idsObject;
// };
export const convertObjectToIds = <T extends Record<string, any>>(object: T) => {
  const idsObject: any = {}; // Using `any` here for simplicity, you can replace it with a more specific type if needed
  Object.keys(object).forEach((key: keyof T) => {
    if (key === 'id' && object[key] === '') {
      idsObject[key] = `${Date.now()}`;
    } else if (Array.isArray(object[key])) {
      idsObject[key] = (object[key] as any[]).map((el) => el.id || el);
    } else if (typeof object[key] === 'object' && object[key] !== null) {
      idsObject[key] = (object[key] as any).id; // Assuming objects have an `id` property
    } else {
      idsObject[key] = object[key];
    }
  });
  return idsObject;
};
