import { DivContainer } from './styles';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Form } from './form';

const query = gql`
  query XUXU {
    featureFlags {
      id
      name
      enabled
    }
  }
`;

export function App() {
  const { data, loading } = useQuery(query);
  if (loading) {
    return <DivContainer>Carregando</DivContainer>;
  }
  return (
    <DivContainer>
      <div>
        <Form />
      </div>
      <div>
        {data.featureFlags.map((x: any) => x.name).join()}
      </div>
    </DivContainer>
  );
}

export default App;
