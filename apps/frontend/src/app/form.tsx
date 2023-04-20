import { useState } from "react";
import { gql, useMutation } from '@apollo/client';


const mutation = gql`
  mutation Mutation($name: String!, $enabled: Boolean!) {
  createFeatureFlag(name: $name, enabled: $enabled) {
    enabled
    id
    name
  }
}
 `;

export function Form() {
  const [name, setName] = useState("")
  const [enabled, setEnabled] = useState(true)
  const [addFeatureFlag, { data }] = useMutation(mutation)
  console.log(data)
  async function handleSubmit(event: any) {
    event.preventDefault()
    addFeatureFlag({
      variables: {
        name,
        enabled
      }
    })
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
