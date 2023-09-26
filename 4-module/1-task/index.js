function makeFriendsList(friends) {
  let list = document.createElement('ul');

  friends.forEach(friend => {
    let listItem = document.createElement('li');
    listItem.textContent = (Object.values(friend)).join(' ');
    list.append(listItem);
  });

  return list;
}
