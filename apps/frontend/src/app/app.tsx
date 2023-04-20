import { DivContainer } from './styles';
import { useQuery, useMutation, gql } from '@apollo/client';

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
      {data.featureFlags.map((x: any) => x.name).join()}
    </DivContainer>
  );
}

export default App;
