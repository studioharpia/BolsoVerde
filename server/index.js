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
app.use(cors());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/send-feedback', async (req, res) => {
    const { name, phone, email, message, screenshot } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'BolsoVerde <onboarding@resend.dev>', // Ou seu domínio verificado
            to: ['lukas@harpia.digital'],
            subject: `💰 BolsoVerde - Feedback #${Date.now()}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #22c55e;">Novo Feedback Recebido! 🚀</h1>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>WhatsApp:</strong> ${phone}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
            attachments: screenshot ? [
                {
                    filename: 'screenshot.jpg',
                    content: screenshot.split(',')[1], // Remove o prefixo data:image/jpeg;base64,
                }
            ] : []
        });

        res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
