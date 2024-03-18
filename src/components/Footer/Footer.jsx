import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#232D35",
        color: "#fff",
        padding: "20px",
        marginBottom: "0",
        // marginTop: "20px",
      }}
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Col style={{ width: "40vw", display: "flex", flexDirection: "row" }}>
          <div
            className="logo-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              style={{ maxHeight: "60px", marginRight: "1.1rem" }}
              src="https://bama.es/wp-content/uploads/2023/05/logo-semi-white.png"
            />
            <span style={{ fontSize: "18px" }}>&copy; COPYRIGHT 2024</span>
          </div>
        </Col>
        <Col style={{ width: "40vw", textAlign: "right" }}>
          <span>Aviso Legal | Política de Privacidad</span>
        </Col>
      </Row>
    </footer>
  );
}
