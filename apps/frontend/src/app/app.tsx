import { DivContainer } from './styles';
import { useLazyQuery, gql } from '@apollo/client';

const query = gql`
  query XUXU {
    featureFlags {
      name
    }
  }
`;

export function App() {
  const [loadFeaturesFlags, { data, loading }] = useLazyQuery(query);

  if (loading) {
    return <DivContainer>Carregando</DivContainer>;
  }
  return <DivContainer>{data.map((x: any) => x.id).join()}</DivContainer>;
}

export default App;
