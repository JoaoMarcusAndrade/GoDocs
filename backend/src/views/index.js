async function authEmailBtn() {
    const emailTxt = document.getElementById('emailTxt').value;
    const phoneTxt = document.getElementById('phoneTxt').value;
    const passTxt = document.getElementById('passTxt').value;
    try {
        const response = await fetch('/sign-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email: emailTxt,
                phone: phoneTxt,
                senha: passTxt
             })
        })

        const data = await response.json()
        console.log("/sign-in res:", data)
    } catch (error) {
        console.log(error, "erro ao enviar email")
    }
}

async function FA2Verify() {
    const FA2num = document.getElementById('FA2num').value;
    const emailTxt = document.getElementById('emailTxt').value;

    try {
        const response = await fetch('/auth/2FA', {
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
        console.log("/auth/2FA res:", data)
    } catch (error) { 
        console.log(error, "erro ao enviar codigo 2FA")
    }
}