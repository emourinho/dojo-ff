import { useState } from "react";
import { gql, useMutation } from '@apollo/client';

export function Form() {
  const [name, setName] = useState("")
  const [enabled, setEnabled] = useState(true)

  async function handleSubmit() {
    const mutation = gql`
      mutation cadastro {
        featureFlags {

        }
      }
`;
  }

  function handleChangeName(event: any) {
    setName(event.target.value)
  }

  function handleChangeEnabled(event: any) {
    setEnabled(event.target.checked)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input onChange={event => handleChangeName(event)} type="text" />
      </label>

      <label>
        Habilitado:
        <input onChange={event => handleChangeEnabled(event)} type="checkbox" />
      </label>

      <button onClick={handleSubmit} type="submit">Cadastrar</button>
    </form>
  );
}
