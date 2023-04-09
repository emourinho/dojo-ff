import { FeatureFlag } from '@dojo-ff/domain';
import { DivContainer } from './styles';

export function App() {
  const ff = new FeatureFlag('Hello World');

  return (
    <DivContainer>
      <h1>{ff.name}</h1>
    </DivContainer>
  );
}

export default App;
