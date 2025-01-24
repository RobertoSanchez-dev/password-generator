import React, { useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

const PasswordGenerator: React.FC = () => {
  const chars: { [key: string]: string } = {
    minus: "abcdefghijklmnopqrstuvwxyz",
    mayus: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    simbol: "!@#$%^&*()",
  };

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [savedPasswords, setSavedPasswords] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedCheckboxes((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value)
    );
  };

  const generatePassword = (len: number) => {
    let newPassword = "";
    const filteredChars = Object.entries(chars)
      .filter(([key]) => selectedCheckboxes.includes(key))
      .map(([_, value]) => value)
      .join("");

    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * filteredChars.length);
      newPassword += filteredChars[randomIndex];
    }
    setPassword(newPassword);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value, 10);
    setLength(newLength);
    generatePassword(newLength);
  };

  const savePassword = () => {
    if (savedPasswords.includes(password)) {
      return;
    }
    setSavedPasswords([...savedPasswords, password]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="Generate a random password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mt-2">Genera una contraseña segura</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card p-4">
              <div className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tu contraseña"
                    value={password}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => generatePassword(length)}
                  >
                    Cambiar
                  </button>
                </div>
              </div>
              <h3>Longitud de la contraseña</h3>
              <div className="d-flex align-items-center mb-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "60px" }}
                  value={length}
                  readOnly
                />
                <input
                  type="range"
                  className="form-range mx-3 flex-grow-1"
                  min="1"
                  max="50"
                  value={length}
                  onChange={handleSliderChange}
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="mayus"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Mayúsculas</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="minus"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Minúsculas</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="number"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Números</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="simbol"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Símbolos</label>
                </div>
              </div>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => generatePassword(length)}
                >
                  Generar contraseña
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={savePassword}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3>Contraseñas guardadas</h3>
            <ul className="list-group">
              {savedPasswords.map((pwd, index) => (
                <li className="list-group-item" key={index}>
                  {pwd}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
