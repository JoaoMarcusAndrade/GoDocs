async function authEmailBtn() {
    const emailTxt = document.getElementById('emailCad').value;
    const phoneTxt = document.getElementById('phoneCad').value;
    const passTxt = document.getElementById('passCad').value.trim();
    try {
        const response = await fetch('/auth/sign-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailTxt,
                phone: phoneTxt,
                pass: passTxt
            })
        })

        const data = await response.json()
        console.log("/auth/sign-in res:", data)
    } catch (error) {
        console.log(error, "erro ao enviar email")
    }
}

async function createAccount() {
    const emailTxt = document.getElementById('emailCad').value;
    const imgCad = document.getElementById('imgCad');
    const nameCad = document.getElementById('nameCad').value;
    const CPFCad = document.getElementById('CPFCad').value;

    let base64Img = null;
    
    
    const file = imgCad.files[0];
    if(!file) {
        return console.log("ta faltando foto")
    }

    if (!file.type.startsWith("image/")) {
        return res.status(400).json({ error: "arquivo inválido" });
    }

    const reader = new FileReader();
    
    base64Img = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
    
    try {
        const response = await fetch('/auth/endUsr', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailTxt,
                img: base64Img,
                name: nameCad,
                CPF: CPFCad
            })
        })

        const data = await response.json()
        console.log("/auth/sign-in res:", data)
    } catch (error) {
        console.log(error, "erro ao enviar email")
    }
}

async function FA2Verify() {
    const FA2num = document.getElementById('FA2num').value;
    const emailTxt = document.getElementById('emailCad').value;

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

async function loginBtn() {
    const emailTxt = document.getElementById('emailTxt').value;
    const passTxt = document.getElementById('passTxt').value;
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailTxt,
                pass: passTxt,
            })
        })

        const data = await response.json()
        console.log("/auth/login res:", data)
    } catch (error) {
        console.log(error, "erro ao enviar email")
    }
}