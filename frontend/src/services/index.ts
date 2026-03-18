export async function authEmailBtn(): Promise<any> {

    const emailInput = document.getElementById('emailCad') as HTMLInputElement | null;
    const phoneInput = document.getElementById('phoneCad') as HTMLInputElement | null;
    const passInput = document.getElementById('passCad') as HTMLInputElement | null;

    if (!emailInput || !phoneInput || !passInput) return null;

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

        return data; // 👈 IMPORTANTE

    } catch (error) {
        console.log(error, "erro ao enviar email");
        return null;
    }
}

export async function createAccount(
    name: string,
    cpf: string,
    file: File,
    email: string
): Promise<{ success: boolean; user?: any }> {
    let base64Img: string | null = null;

    const reader = new FileReader();

    base64Img = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    try {
        const response = await fetch('http://localhost:3000/auth/endUsr', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                img: base64Img,
                name,
                CPF: cpf
            })
        });

        if (!response.ok) {
            console.error("Erro:", response.status);
            return {success: false};
        }

        const data = await response.json();
        console.log("Sucesso:", data);

        return {
            success: true,
            user: data.user
        }; //  sucesso

    } catch (error) {
        console.log("Erro ao enviar dados:", error);
        return {success: false}; //  erro
    }
}

export async function FA2Verify(code: string, email: string) {

    try {
        const response = await fetch("http://localhost:3000/auth/2FA", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FA2code: code,
                email: email
            })
        });

        const data = await response.json();
        console.log("/auth/2FA res:", data);

        return data;

    } catch (error) {
        console.log(error, "erro ao enviar codigo 2FA");
        return null;
    }
}


export async function loginBtn() {

    const emailInput = document.getElementById('emailLog') as HTMLInputElement | null;
    const passInput = document.getElementById('passLog') as HTMLInputElement | null;

    if (!emailInput || !passInput) return null;

    const emailTxt = emailInput.value;
    const passTxt = passInput.value;

    try {

        const response = await fetch("http://localhost:3000/auth/login", {
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

        return data;

    } catch (error) {
        console.log(error, "erro ao enviar email");
        return null;
    }
}