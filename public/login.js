
window.onload = () => {


    document.getElementById('submitLogin').onclick = () => {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const reqBody = {
            email: email,
            password: password
        };

        const endpoint = `${location.origin}/user`;

        const reqOptions = {
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json'
            },

            method: 'PUT',
            body: JSON.stringify(reqBody)

        }
                fetch(endpoint, reqOptions)
                .then(rs => {
                    return rs.json()
                })
                .then( res => {

                    const token = res.token

                    if(token === undefined){
                        alert('login failed')
                    } else {

                        document.cookie = `token=${token}`
                       // localStorage.setItem('loginToken', token);
                        location = location.origin;
                    }
                })

    }

}