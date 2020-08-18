window.onload = () => {
    //set event listeners

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordrepeat = document.getElementById('passwordrepeat');

    document.getElementById('password').onkeyup = passwordCheck;
    document.getElementById('passwordrepeat').onkeyup = passwordCheck;


    document.getElementById('submitReg').onclick = () => {

        // const email = document.getElementById('email').value;
        // const password = document.getElementById('password').value;
        // const passwordrepeat = document.getElementById('passwordrepeat');
        
        if(password.value !== passwordrepeat.value) {
            return alert('Password inputs must match')
        }

        // if(missingInputs.length > 0) {
        //     missingMsg = missingInputs.map(key => {
        //         return `${key} is required`
        //     }).join('\n\n')

        //     return alert(missingMsg)
        // }

       


        const reqBody = {
            email: email.value,
            password: password.value
        };

        const endpoint = `${location.origin}/user`;

        const reqOptions = {
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify(reqBody)

        }
                fetch(endpoint, reqOptions)
                .then(rs => {
                    return rs.json()
                })
                .then( res => {
                        if(res.validation_error != undefined) {
                            let errMsg = '';
                            res.validation_error.foreach(error => {
                                errMsg += `Error With ${titleCase(error.key)}:\n${error.messaage}\n\n\n`
                            })

                             alert(errMsg)
                        }
    
                })

    }

    

    function passwordCheck() {

        const password = document.getElementById('password')
        const passwordRepeat = document.getElementById('passwordrepeat')
        const passMsg = document.getElementById('passMsg')

        passMsg.style.display = 'inline'

        if (password.value != passwordRepeat.value) {
            passMsg.style.color = 'red'
            passMsg.innerText = ' "Passwords Dont Match'
        } else {
            passMsg.style.color = 'green'
            passMsg.innerText = 'Passwords Match'


        }


    }
    

}

//xhr post for users



