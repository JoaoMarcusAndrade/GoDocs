import { CabecalhoGodocsBack } from '../../components/CabecalhoGoDocsBack/CabecalhoGodocs'
import styles from './InfoLegais.module.css'

const InfoLegais = () => {
    return (
        <>
            <CabecalhoGodocsBack cabecalhoGodocsLink="/home/conta"></CabecalhoGodocsBack>
            <div className={styles.container}>
                <h1 className={styles.title}>Informações legais</h1>

                <h2 className={styles.subtitle}>Ajuda</h2>

                <p className={styles.text}>
                    A GoDocs foi criada para tornar o envio de documentos e encomendas mais rápido, seguro e simples. Caso você tenha qualquer dúvida sobre o funcionamento da plataforma, nossa equipe de suporte está pronta para ajudar.
                </p>

                <p className={styles.text}>
                    Na nossa central de ajuda você pode encontrar orientações sobre como solicitar uma entrega, acompanhar pedidos, entender prazos, formas de pagamento e outras funcionalidades da plataforma. Nosso objetivo é garantir que sua experiência seja sempre fácil e eficiente.
                </p>

                <p className={styles.text}>
                    Se você estiver enfrentando algum problema ou precisar de assistência, entre em contato com nossa equipe de suporte. Respondemos todas as solicitações o mais rápido possível.
                </p>

                <div className={styles.contact}>
                    <p>Contato de suporte</p>
                    <p>Email: suporte@godocs.com</p>
                    <p>Telefone: +55 (11) 4002-8922</p>
                    <p>Estamos sempre disponíveis para ajudar você a utilizar a GoDocs da melhor forma possível.</p>
                </div>

                <hr className={styles.divider} />


                <h2 className={styles.subtitle}>Termos e Condições</h2>

                <p className={styles.text}>
                    Ao acessar e utilizar a plataforma GoDocs, o usuário concorda com os termos e condições descritos nesta página. Estes termos têm como objetivo estabelecer as regras de utilização do serviço, garantindo transparência e segurança para todos os usuários.
                    A GoDocs oferece um serviço de intermediação para solicitações de entrega de documentos e encomendas. Ao utilizar a plataforma, o usuário se compromete a fornecer informações corretas e completas durante o processo de solicitação de serviços.
                    O usuário também concorda em utilizar a plataforma de maneira responsável, respeitando as leis vigentes e não utilizando o serviço para transporte de materiais ilegais, perigosos ou proibidos.
                    A GoDocs se reserva o direito de atualizar ou modificar estes termos a qualquer momento, visando melhorar os serviços oferecidos e acompanhar mudanças legais ou operacionais. Recomendamos que os usuários revisem esta página periodicamente.
                    O uso contínuo da plataforma após alterações nos termos será considerado como aceitação das novas condições.

                </p>


                <hr className={styles.divider} />

                <h2 className={styles.subtitle}>Política de Privacidade</h2>

                <p className={styles.text}>
                    A GoDocs respeita a privacidade de seus usuários e está comprometida em proteger todas as informações fornecidas durante o uso da plataforma.
                    Ao utilizar nossos serviços, algumas informações podem ser coletadas, como nome, email, telefone e dados necessários para realizar solicitações de entrega. Essas informações são utilizadas exclusivamente para garantir o funcionamento adequado da plataforma e melhorar a experiência do usuário.
                    Os dados coletados são armazenados com segurança e não são vendidos ou compartilhados com terceiros para fins comerciais sem autorização do usuário.
                    A GoDocs utiliza medidas de segurança técnicas e administrativas para proteger as informações contra acessos não autorizados, perda ou alteração indevida.
                    Os usuários podem solicitar a atualização ou exclusão de seus dados entrando em contato com nossa equipe de suporte.
                    Ao continuar utilizando a plataforma GoDocs, você concorda com as práticas descritas nesta política de privacidade.


                </p>
                <hr className={styles.divider} />
                <h2 className={styles.subtitle}>Direitos Autorais</h2>

                <p className={styles.text}>
                    Todo o conteúdo disponível neste site, incluindo textos, imagens, logotipos, ícones, elementos visuais, design e estrutura da plataforma, é de propriedade da GoDocs ou utilizado com as devidas autorizações legais.
                    Esse conteúdo é protegido por leis de direitos autorais e propriedade intelectual. A reprodução, distribuição, modificação ou utilização de qualquer material presente neste site sem autorização prévia é proibida.
                    Os usuários podem utilizar o site apenas para fins pessoais e relacionados ao uso dos serviços oferecidos pela GoDocs.
                    Qualquer uso indevido do conteúdo poderá resultar em medidas legais conforme a legislação vigente.
                    A GoDocs se reserva o direito de atualizar, modificar ou remover conteúdos do site a qualquer momento, sem aviso prévio.



                </p>
                <hr className={styles.divider} />




            </div>
        </>
    )
}

export { InfoLegais }