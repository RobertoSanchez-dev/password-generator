import Head from "next/head";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { log } from "console";

export default function Home() {
  let chars: { [key: string]: string } = {
    minus: "abcdefghijklmnopqrstuvwxyz",
    mayus: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    simbol: "!@#$%^&*()",
  };

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;

    setSelectedCheckboxes((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value)
    );
  };

  const generatePassword = (len: number) => {
    let newPassword = "";
    const filteredChars = Object.entries(chars) // Convertir el objeto a un array de pares [clave, valor]
      .filter(([key]) => selectedCheckboxes.includes(key)) // Filtrar las claves seleccionadas
      .map(([_, value]) => value) // Obtener solo los valores (cadenas de caracteres)
      .join(""); // Combinar todos los valores en una sola cadena

    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * filteredChars.length);
      newPassword += filteredChars[randomIndex];
    }
    console.log("Nueva contraseña generada:", newPassword);
    setPassword(newPassword);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value, 10);
    setLength(newLength);
    generatePassword(newLength);
  };

  return (
    <div className="d-flex justify-content-center vh-100">
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="Generate a random password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container" style={{ maxWidth: "700px" }}>
        <h1 className="text-center mt-5">
          Genera una contraseña aleatoria y segura
        </h1>
        <main className="d-flex flex-column">
          <div className="mb-3">
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                placeholder="Tu contraseña"
                aria-describedby="addon-wrapping"
                value={password}
                readOnly
              />
            </div>
          </div>
          <h3>Longitud de la contraseña</h3>
          <div className="d-flex justify-content-center">
            <div className="d-flex col-8 mb-3">
              <input type="text" className="col-2 m-auto" value={length} />
              <input
                type="range"
                className="form-range mx-3 align-self-center"
                min="1"
                max="50"
                id="customRange"
                value={length}
                onChange={handleSliderChange}
              />
            </div>
            <div className="d-flex flex-column col-4 justify-content-end">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="mayus"
                  id="MayusCheck"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="MayusCheck">
                  Mayusculas
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="minus"
                  id="MinusCheck"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="MinusCheck">
                  Minusculas
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="number"
                  id="numberCheck"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="numberCheck">
                  Números
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="simbol"
                  id="simbolCheck"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="simbolCheck">
                  Símbolos
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary mt-3 d-flex justify-content-center mx-auto"
              onClick={(event) => handleCheckboxChange(event)}
            >
              Generate Password
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
