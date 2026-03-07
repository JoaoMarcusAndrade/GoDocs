async function authEmailBtn() {
    const emailTxt = document.getElementById('emailTxt').value;

    try {
        const response = await fetch('/mail/auth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailTxt })
        })

        const data = await response.json()
        console.log("/mail/auth res:", data)
    } catch (error) {
        console.log(error, "erro ao enviar email")
    }
}

async function FA2Verify() {
    const FA2num = document.getElementById('FA2num').value;
    const emailTxt = document.getElementById('emailTxt').value;

    try {
        const response = await fetch('/2FA-verify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                FA2code: FA2num,
                email: emailTxt
            })
        })

        const data = await response.json()
        console.log("/2FA-verify res:", data)
    } catch (error) { 
        console.log(error, "erro ao enviar codigo 2FA")
    }
}