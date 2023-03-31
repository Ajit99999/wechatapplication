export function checkOnlineStatus(onlineUsersList, userId) {
  
  
  let status = false;
  onlineUsersList?.forEach((user) => {
    if (user.userId === userId) {
      status = true;
    }
  });
  
  return status;
}
