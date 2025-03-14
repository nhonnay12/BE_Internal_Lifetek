import dotenv from 'dotenv';

dotenv.config();
const getVerificationEmailTemplate = (link) => {
    return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Xác minh tài khoản</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; }
                .header { background: #007bff; color: #ffffff; padding: 15px; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; font-size: 16px; color: #333; }
                .btn { display: inline-block; margin-top: 20px; padding: 12px 25px; font-size: 16px; color: #ffffff; background: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; }
                .footer { margin-top: 20px; font-size: 14px; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Xác minh tài khoản của bạn</div>
                <div class="content">
                    <p>Xin chào,</p>
                    <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấn vào nút bên dưới để xác minh tài khoản của bạn:</p>
                    <a href="${link}" class="btn">Xác minh tài khoản</a>
                    <p>Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này.</p>
                </div>
                <div class="footer">© 2024 Công ty của bạn. Mọi quyền được bảo lưu.</div>
            </div>
        </body>
        </html>
    `;
};

const getResetPasswordEmailTemplate = (newPassword) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
        <div style="text-align: center;">
            <h2 style="color: #333;">🔒 Yêu cầu đặt lại mật khẩu</h2>
            <p style="font-size: 16px; color: #555;">Chào bạn,</p>
        </div>

        <p style="font-size: 16px; color: #555;">
            Hệ thống đã nhận được yêu cầu đặt lại mật khẩu của bạn. Dưới đây là mật khẩu mới của bạn:
        </p>

        <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 18px; font-weight: bold; background: #e3f2fd; padding: 10px 20px; border-radius: 5px; display: inline-block; color: #007bff;">
                ${newPassword}
            </span>
        </div>

        <p style="font-size: 16px; color: #555;">
            Vui lòng đăng nhập và đổi mật khẩu ngay để bảo mật tài khoản của bạn.
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.CLIENT_URL}/change-password" 
                style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Đổi mật khẩu ngay
            </a>
        </div>

        <p style="font-size: 14px; color: #777; margin-top: 30px;">
            Nếu bạn không yêu cầu thay đổi này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;">
        <p style="font-size: 14px; color: #999; text-align: center;">
            Trân trọng,<br>Đội ngũ hỗ trợ ${process.env.APP_NAME}
        </p>
    </div>
    `;
}

export { getVerificationEmailTemplate, getResetPasswordEmailTemplate };