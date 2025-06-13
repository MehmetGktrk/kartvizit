async function post(data, url){
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

  
  
    const result = await response.json(); 
    return result; 
}



async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  const result = await response.json();
  return result;
}






function showNotification(message, httpCode) {
  var type = 'success';

  if(httpCode == 200){
      type = 'success';
  }else{
      type = 'error';
  }

  notification.textContent = message;
  notification.className = `notification ${type} show`;
  
  setTimeout(() => {
      notification.classList.remove('show');
  }, 3000);
}