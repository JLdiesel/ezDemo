//  ?.
const info = {
  name: 'lyj',
  friend: {
    name: 'jl',
    girlFriend: {
      name: 'lyj',
    },
  },
};
info.friend = '';
console.log(
  info && info.friend && info.friend.girlFriend && info.friend.girlFriend.name
); //undefined

console.log(info.friend?.girlFriend?.name); //undefined
