async function logout() {
    const result = await post({}, 'http://localhost:3000/api/auth/logout');
    console.log(result);

    if(result.code == 200){
        window.location.href = '../login';
    }
}