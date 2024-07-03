export const getShortName = (name: string) => {
  const [firstName, secondName] = name
    ? name.split(' ')
    : ['?', '?'];
  return `${secondName} ${firstName[0]}.`;
};
