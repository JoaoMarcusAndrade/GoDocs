export async function authEmailBtn(): Promise<void> {
    const emailInput = document.getElementById('emailCad') as HTMLInputElement | null;
    const phoneInput = document.getElementById('phoneCad') as HTMLInputElement | null;
    const passInput = document.getElementById('passCad') as HTMLInputElement | null;

    if (!emailInput || !phoneInput || !passInput) return;

    const emailTxt = emailInput.value;
    const phoneTxt = phoneInput.value;
    const passTxt = passInput.value.trim();

    try {
        const response = await fetch('http://localhost:3000/auth/sign-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailTxt,
                phone: phoneTxt,
                pass: passTxt
            })
        });

        const data = await response.json();
        console.log("/auth/sign-in res:", data);

    } catch (error) {
        console.log(error, "erro ao enviar email");
    }
}


export async function createAccount(): Promise<void> {
    const emailInput = document.getElementById('emailCad') as HTMLInputElement | null;
    const imgCad = document.getElementById('imgCad') as HTMLInputElement | null;
    const nameInput = document.getElementById('nameCad') as HTMLInputElement | null;
    const cpfInput = document.getElementById('CPFCad') as HTMLInputElement | null;

    if (!emailInput || !imgCad || !nameInput || !cpfInput) return;

    const emailTxt = emailInput.value;
    const nameCad = nameInput.value;
    const CPFCad = cpfInput.value;

    let base64Img: string | null = null;

    const file = imgCad.files?.[0];

    if (!file) {
        console.log("ta faltando foto");
        return;
    }

    if (!file.type.startsWith("image/")) {
        console.log("arquivo inválido");
        return;
    }

    const reader = new FileReader();

    base64Img = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

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
        });

        const data = await response.json();
        console.log("/auth/endUsr res:", data);

    } catch (error) {
        console.log(error, "erro ao enviar email");
    }
}


export async function FA2Verify(): Promise<void> {
    const codeInput = document.getElementById('FA2num') as HTMLInputElement | null;
    const emailInput = document.getElementById('emailCad') as HTMLInputElement | null;

    if (!codeInput || !emailInput) return;

    const FA2num = codeInput.value;
    const emailTxt = emailInput.value;

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
        });

        const data = await response.json();
        console.log("/auth/2FA res:", data);

    } catch (error) {
        console.log(error, "erro ao enviar codigo 2FA");
    }
}


export async function loginBtn(): Promise<void> {
    const emailInput = document.getElementById('emailLog') as HTMLInputElement | null;
    const passInput = document.getElementById('passLog') as HTMLInputElement | null;

    if (!emailInput || !passInput) return;

    const emailTxt = emailInput.value;
    const passTxt = passInput.value;

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
        });

        const data = await response.json();
        console.log("/auth/login res:", data);

    } catch (error) {
        console.log(error, "erro ao enviar email");
    }
}