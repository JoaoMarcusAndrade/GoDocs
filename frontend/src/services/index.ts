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

export async function createAccount(name: string, cpf: string, file: File, email: string): Promise<void> {
    let base64Img: string | null = null;

    const reader = new FileReader();

    // Lê a imagem e converte para base64
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
                email: email,  // Passando o email para o backend
                img: base64Img,
                name: name,
                CPF: cpf
            })
        });

        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            console.error("Erro na requisição. Status:", response.status, response.statusText);
            const errorText = await response.text();  // Se não for OK, leia como texto
            console.log("Erro do servidor:", errorText);
            return;
        }

        // Verifica se o tipo de conteúdo é JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType?.includes("application/json")) {
            console.error("Esperava JSON, mas o servidor retornou:", contentType);
            const text = await response.text();
            console.log("Conteúdo recebido:", text);
            return;
        }

        // Processa a resposta JSON
        const data = await response.json();
        console.log("/auth/endUsr res:", data);

    } catch (error) {
        console.log("Erro ao enviar dados:", error);
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