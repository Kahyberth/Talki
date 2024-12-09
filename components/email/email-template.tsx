import * as React from "react";

interface EmailTemplateProps {
  email: string;
  token: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  email,
  token,
}) => {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
  const imageSrc = "/image/banner.jpg";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Contenedor Principal */}
      <table
        align="center"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width="600"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
        }}
      >
        {/* Encabezado con Logo */}
        <tr>
          <td
            align="center"
            style={{
              padding: "20px 0",
              backgroundColor: "#4CAF50",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <img
              src={imageSrc}
              alt="Logo de Talki"
              width="200"
              style={{ display: "block" }}
            />
          </td>
        </tr>
        {/* Contenido del Correo */}
        <tr>
          <td
            style={{
              padding: "20px",
              color: "#333333",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "24px" }}>
              ¡Confirma tu correo electrónico!
            </h1>
            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
              Hola, <br />
              <br />
              ¡Gracias por registrarte en <strong>Talki</strong>! Para empezar a
              hablar en tiempo real y realizar videollamadas con amigos y
              colegas, necesitamos confirmar tu dirección de correo electrónico.
            </p>
            {/* Botón de Confirmación */}
            <a
              href={verifyUrl}
              style={{
                display: "inline-block",
                padding: "12px 25px",
                fontSize: "16px",
                color: "#ffffff",
                backgroundColor: "#4CAF50",
                textDecoration: "none",
                borderRadius: "5px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Confirmar Correo Electrónico
            </a>
          </td>
        </tr>
        {/* Mensaje Final */}
        <tr>
          <td
            style={{
              padding: "10px 20px",
              textAlign: "center",
              fontSize: "12px",
              color: "#777777",
            }}
          >
            <p style={{ margin: 0 }}>
              Si no solicitaste esta verificación, puedes ignorar este mensaje.
            </p>
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} Talki. Todos los derechos
              reservados.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
