import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuração para aceitar JSONs maiores (devido ao print da tela em base64)
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/send-feedback', async (req, res) => {
    const { name, phone, email, message, screenshot } = req.body;
    console.log(`[${new Date().toISOString()}] Recebendo feedback de: ${name} (${email}) | Screenshot: ${screenshot ? 'SIM (' + Math.round(screenshot.length / 1024) + 'KB)' : 'NÃO'}`);

    try {
        // Validar e preparar o screenshot
        let attachments = [];
        if (screenshot) {
            // Remove o prefixo data:image/jpeg;base64, se existir
            const base64Content = screenshot.includes(',') ? screenshot.split(',')[1] : screenshot;

            if (base64Content) {
                console.log(`[${new Date().toISOString()}] Processando screenshot: ${base64Content.substring(0, 50)}... (Total: ${base64Content.length} chars)`);
                attachments.push({
                    filename: 'screenshot.jpg',
                    content: base64Content,
                    content_id: 'screenshot',
                    disposition: 'inline'
                });
            } else {
                console.warn(`[${new Date().toISOString()}] Screenshot recebido mas formato inválido`);
            }
        }

        const { data, error } = await resend.emails.send({
            from: 'BolsoVerde <noreply@harpia.digital>',
            to: ['lukas@harpia.digital'],
            subject: `💰 BolsoVerde - Feedback #${Date.now()}`,
            html: `
        <div style="background-color: #fbfbfd; padding: 40px 20px; font-family: sans-serif; color: #020617;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                <!-- Header -->
                <div style="background-color: #10b981; padding: 40px; text-align: center;">
                    <div style="display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 100px; color: #ffffff; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">
                        Feedback Recebido 🚀
                    </div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">BolsoVerde</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px;">
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px;">Remetente</p>
                        <div style="background: #f1f5f9; padding: 20px; border-radius: 16px;">
                            <p style="margin: 0; font-weight: 700; font-size: 16px;">${name}</p>
                            <p style="margin: 4px 0 0; color: #71717a; font-size: 13px;">${email} • ${phone}</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px;">Mensagem</p>
                        <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 24px; border-radius: 0 16px 16px 0; font-style: italic; color: #1e293b; line-height: 1.6; font-size: 16px;">
                            "${message}"
                        </div>
                    </div>

                    ${screenshot ? `
                    <div style="margin-top: 40px; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden;">
                        <p style="background: #f8fafc; padding: 12px 20px; margin: 0; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #71717a; border-bottom: 1px solid #e2e8f0;">Print da Tela</p>
                        <img src="cid:screenshot" style="width: 100%; display: block;" />
                    </div>
                    ` : ''}
                </div>
                
                <!-- Footer -->
                <div style="padding: 40px; border-top: 1px solid #f1f5f9; text-align: center;">
                    <p style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
                        © 2026 BolsoVerde • Harpia.digital
                    </p>
                </div>
            </div>
        </div>
      `,
            attachments: attachments
        });

        if (error) {
            console.error(`[${new Date().toISOString()}] Erro retornado pelo Resend:`, error);
            return res.status(400).json({ success: false, error: error.message });
        }

        console.log(`[${new Date().toISOString()}] E-mail enviado com sucesso! ID: ${data?.id}`);
        res.status(200).json({ success: true, id: data?.id });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro crítico no Servidor:`, error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
